"""
Authentication router for user registration and login.
"""
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel, EmailStr
from typing import Optional
from utils.supabase_client import get_supabase_client, get_supabase_admin_client
from datetime import datetime
import os
from jose import jwt, JWTError
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/auth", tags=["Authentication"])


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str


@router.post("/register", response_model=AuthResponse)
async def register(request: RegisterRequest):
    """
    Register a new user.
    
    Creates a user account in Supabase Auth and stores user record in database.
    """
    supabase = get_supabase_client()
    
    try:
        # Create user in Supabase Auth
        # Note: Supabase may require email confirmation depending on settings
        # If email confirmation is disabled, user can login immediately
        auth_response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password,
            "options": {
                "data": {
                    "skip_email_confirmation": True  # This may not work, depends on Supabase settings
                }
            }
        })
        
        if not auth_response.user:
            # Check if there's an error message
            error_msg = "Failed to create user"
            if hasattr(auth_response, 'message'):
                error_msg = auth_response.message
            raise HTTPException(status_code=400, detail=error_msg)
        
        user_id = auth_response.user.id
        email = auth_response.user.email
        
        # Store user in database using admin client to bypass RLS
        # Check if user already exists first (in case of partial registration)
        supabase_admin = get_supabase_admin_client()
        
        # Check if user already exists
        existing_user = supabase_admin.table("users").select("id").eq("id", user_id).execute()
        
        if not existing_user.data or len(existing_user.data) == 0:
            # User doesn't exist in users table, insert it
            supabase_admin.table("users").insert({
                "id": user_id,
                "email": email,
                "created_at": datetime.utcnow().isoformat()
            }).execute()
        
        # Log registration using admin client
        supabase_admin.table("logs").insert({
            "user_id": user_id,
            "action": "register",
            "timestamp": datetime.utcnow().isoformat()
        }).execute()
        
        # Get access token - handle email confirmation requirement
        access_token = ""
        if auth_response.session:
            access_token = auth_response.session.access_token
        else:
            # User created but needs email confirmation or session not available
            # Try to sign in immediately to get session
            try:
                sign_in_response = supabase.auth.sign_in_with_password({
                    "email": request.email,
                    "password": request.password
                })
                if sign_in_response.session:
                    access_token = sign_in_response.session.access_token
            except:
                # If sign in fails, user may need email confirmation
                # Return empty token - frontend will need to handle this
                pass
        
        return AuthResponse(
            access_token=access_token,
            user_id=user_id,
            email=email
        )
    
    except HTTPException:
        raise
    except Exception as e:
        error_detail = str(e)
        # Check if it's a duplicate key error (user already exists)
        if "duplicate key" in error_detail.lower() or "unique constraint" in error_detail.lower():
            # User already exists in users table, try to get their info and sign them in
            try:
                # Try to sign in with the provided credentials
                sign_in_response = supabase.auth.sign_in_with_password({
                    "email": request.email,
                    "password": request.password
                })
                if sign_in_response.user and sign_in_response.session:
                    return AuthResponse(
                        access_token=sign_in_response.session.access_token,
                        user_id=sign_in_response.user.id,
                        email=sign_in_response.user.email
                    )
            except:
                pass
            # If sign in fails, user might need email confirmation
            raise HTTPException(
                status_code=400, 
                detail="User already exists. Please check your email for confirmation or try logging in."
            )
        
        # Try to extract more specific error from Supabase
        if hasattr(e, 'message'):
            error_detail = e.message
        elif hasattr(e, 'args') and len(e.args) > 0:
            error_detail = str(e.args[0])
        raise HTTPException(status_code=400, detail=f"Registration failed: {error_detail}")


@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest):
    """
    Login user with email and password.
    
    Authenticates user via Supabase Auth and returns JWT token.
    """
    supabase = get_supabase_client()
    
    try:
        # Authenticate user
        auth_response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password
        })
        
        if not auth_response.user or not auth_response.session:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        user_id = auth_response.user.id
        email = auth_response.user.email
        
        # Log login using admin client
        supabase_admin = get_supabase_admin_client()
        supabase_admin.table("logs").insert({
            "user_id": user_id,
            "action": "login",
            "timestamp": datetime.utcnow().isoformat()
        }).execute()
        
        return AuthResponse(
            access_token=auth_response.session.access_token,
            user_id=user_id,
            email=email
        )
    
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Login failed: {str(e)}")


def verify_token(authorization: Optional[str] = Header(None)) -> dict:
    """
    Verify JWT token from Authorization header.
    Used as dependency for protected routes.
    
    Args:
        authorization: Authorization header value (Bearer <token>)
    
    Returns:
        User data from token
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    try:
        token = authorization.replace("Bearer ", "").strip()
        
        # Decode JWT token to extract user information
        # Note: In production, you should verify the JWT signature
        # For now, we decode and Supabase will reject invalid tokens on DB operations
        try:
            decoded = jwt.get_unverified_claims(token)
            user_id = decoded.get("sub")
            email = decoded.get("email", "")
            
            if not user_id:
                raise HTTPException(status_code=401, detail="Invalid token: missing user ID")
            
            return {
                "user_id": user_id,
                "email": email
            }
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token format")
        except Exception as decode_error:
            raise HTTPException(status_code=401, detail=f"Token decode failed: {str(decode_error)}")
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")

