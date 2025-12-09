"""
Prediction router for fish disease detection.
"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional
from models.loader import predict_disease, load_model
from utils.supabase_client import get_supabase_client, get_supabase_admin_client, upload_image_to_storage
from datetime import datetime
import uuid
import logging
import os
import re
import asyncio
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Set up logger
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/predict", tags=["Prediction"])

# Gemini API configuration
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize Google Generative AI
GEMINI_MODEL = None
if GOOGLE_API_KEY:
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        # List available models to find one that works
        try:
            available_models = [m.name for m in genai.list_models()]
            logger.info(f"Found {len(available_models)} available models")
            
            # Try newer models first, then fallback to older ones
            model_priority = [
                'gemini-2.5-flash',      # Latest fast model
                'gemini-2.5-pro',       # Latest quality model
                'gemini-2.0-flash',     # Previous version
                'gemini-1.5-flash',     # Older but stable
                'gemini-1.5-pro',       # Older but stable
                'gemini-pro'            # Legacy (may not be available)
            ]
            
            # Try to find a working model
            for model_name in model_priority:
                # Check if model name appears in any available model
                matching_models = [m for m in available_models if model_name in m]
                if matching_models:
                    try:
                        # Use the full model name from the list
                        full_model_name = matching_models[0].replace('models/', '')
                        GEMINI_MODEL = genai.GenerativeModel(full_model_name)
                        logger.info(f"Successfully initialized {full_model_name} model")
                        break
                    except Exception as e:
                        logger.warning(f"Failed to initialize {model_name}: {e}")
                        continue
            
            # If no priority model worked, try the first available model
            if not GEMINI_MODEL and available_models:
                for model_name in available_models:
                    if 'gemini' in model_name.lower() and 'generateContent' in str(genai.get_model(model_name).supported_generation_methods):
                        try:
                            full_model_name = model_name.replace('models/', '')
                            GEMINI_MODEL = genai.GenerativeModel(full_model_name)
                            logger.info(f"Using first available Gemini model: {full_model_name}")
                            break
                        except:
                            continue
                            
        except Exception as e:
            logger.warning(f"Could not list models: {e}, trying direct initialization")
            # Fallback: try direct initialization with newer models
            for model_name in ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']:
                try:
                    GEMINI_MODEL = genai.GenerativeModel(model_name)
                    logger.info(f"Using {model_name} model (direct init)")
                    break
                except:
                    continue
        
        if not GEMINI_MODEL:
            logger.warning("No Gemini model could be initialized. API may not be enabled or key may be invalid.")
            logger.warning("See backend/GEMINI_SETUP.md for setup instructions.")
        else:
            logger.info("Gemini API initialized successfully!")
    except Exception as e:
        logger.error(f"Error configuring Gemini: {e}")
else:
    logger.warning("GOOGLE_API_KEY not set in environment variables")

# Log API key status on import
if GOOGLE_API_KEY:
    logger.info(f"Gemini API key loaded (length: {len(GOOGLE_API_KEY)})")
else:
    logger.warning("GOOGLE_API_KEY not found in environment variables")

# Disclaimer text
DISCLAIMER = "Disclaimer: This is AI-generated information and not a medical diagnosis. Consult a certified aquaculture veterinarian."


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    description: str
    recommended: str
    disclaimer: str = DISCLAIMER


async def get_gemini_response(disease_name: str) -> tuple[str, str]:
    """
    Call Gemini API to get disease description and recommended treatments.
    
    Args:
        disease_name: The predicted disease name
        
    Returns:
        Tuple of (description, recommended) strings
        
    Raises:
        Exception: If API call fails
    """
    if not GEMINI_MODEL or not GOOGLE_API_KEY:
        logger.warning("GOOGLE_API_KEY not set or model not initialized, using fallback")
        raise ValueError("GOOGLE_API_KEY not configured")
    
    prompt = f"""Give a short medically accurate description and recommended treatments for {disease_name} in farmed freshwater fish. Be specific and dosage based. 

IMPORTANT: Do NOT use any markdown formatting like asterisks (*), bold (**), or italic. Use plain text only.

Format exactly like:

Description: <text>

Recommended Medicines: <text>"""
    
    try:
        logger.info(f"Calling Gemini API for disease: {disease_name}")
        
        # Use the Google Generative AI SDK (handles API endpoints automatically)
        response = await asyncio.to_thread(
            GEMINI_MODEL.generate_content,
            prompt
        )
        
        if not response or not response.text:
            logger.error("Gemini API returned empty response")
            raise Exception("Empty response from Gemini API")
        
        gemini_text = response.text
        logger.info(f"Gemini text length: {len(gemini_text)}")
        logger.info(f"Gemini text preview: {gemini_text[:200]}...")
        
        # Clean up markdown formatting
        def clean_text(text: str) -> str:
            """Remove markdown formatting and clean up text for display"""
            if not text:
                return ""
            
            # Remove ALL asterisks - be aggressive
            # First remove markdown bold/italic patterns
            text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)  # Remove **bold**
            text = re.sub(r'\*([^*\n]+)\*', r'\1', text)    # Remove *italic* (not across newlines)
            text = re.sub(r'\*+', '', text)                 # Remove ALL remaining asterisks
            
            # Remove markdown links [text](url) -> text
            text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
            
            # Remove other markdown artifacts
            text = re.sub(r'#{1,6}\s+', '', text)  # Remove markdown headers
            text = re.sub(r'`([^`]+)`', r'\1', text)  # Remove inline code
            text = re.sub(r'```[\s\S]*?```', '', text)  # Remove code blocks
            
            # Clean up multiple spaces and newlines
            text = re.sub(r'\n{3,}', '\n\n', text)  # Max 2 consecutive newlines
            text = re.sub(r' {2,}', ' ', text)      # Multiple spaces to single
            
            # Remove leading/trailing whitespace from each line
            lines = []
            for line in text.split('\n'):
                cleaned_line = line.strip()
                # Remove any remaining asterisks from each line
                cleaned_line = cleaned_line.replace('*', '')
                if cleaned_line:  # Only add non-empty lines
                    lines.append(cleaned_line)
            
            text = '\n'.join(lines)
            
            # Final cleanup - remove any remaining asterisks
            text = text.replace('*', '')
            
            # Remove empty lines at start/end
            text = text.strip()
            
            return text
        
        # Parse the response
        description_match = re.search(r"Description:\s*(.+?)(?=Recommended|$)", gemini_text, re.DOTALL | re.IGNORECASE)
        recommended_match = re.search(r"Recommended Medicines:\s*(.+?)$", gemini_text, re.DOTALL | re.IGNORECASE)
        
        description = description_match.group(1).strip() if description_match else ""
        recommended = recommended_match.group(1).strip() if recommended_match else ""
        
        if not description or not recommended:
            # Fallback: use the entire text if parsing fails
            logger.warning("Could not parse Gemini response, using full text")
            if "Description:" in gemini_text:
                parts = gemini_text.split("Description:", 1)
                if len(parts) > 1:
                    remaining = parts[1]
                    if "Recommended" in remaining:
                        desc_part, rec_part = remaining.split("Recommended", 1)
                        description = desc_part.strip()
                        recommended = rec_part.replace("Medicines:", "").strip()
                    else:
                        description = remaining.strip()
                        recommended = "See description above"
            else:
                description = gemini_text.strip()
                recommended = "Please consult a veterinarian for specific treatment recommendations"
        
        # Clean both description and recommended text
        description = clean_text(description)
        recommended = clean_text(recommended)
        
        return description, recommended
            
    except Exception as e:
        logger.error(f"Gemini API error: {str(e)}", exc_info=True)
        raise Exception(f"Gemini API error: {str(e)}")


@router.post("", response_model=PredictionResponse)
async def predict_disease_from_image(
    file: UploadFile = File(...),
):
    """
    Predict fish disease from uploaded image.
    
    Processes image with TensorFlow model, then uses Gemini API to generate
    description and recommended treatments.
    
    Note: Authentication is currently disabled for easier testing.
    """
    logger.info(f"Received prediction request: filename={file.filename}, content_type={file.content_type}")
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith("image/"):
        logger.warning(f"Invalid file type: {file.content_type}")
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read image bytes
        logger.info("Reading image file...")
        image_bytes = await file.read()
        logger.info(f"Read {len(image_bytes)} bytes from image")
        
        if len(image_bytes) == 0:
            logger.warning("Empty file received")
            raise HTTPException(status_code=400, detail="Empty file")
        
        # Make prediction using CNN model
        logger.info("Running model prediction...")
        disease_name, confidence = predict_disease(image_bytes)
        logger.info(f"Prediction result: {disease_name} (confidence: {confidence:.2%})")
        
        # Upload image to Supabase Storage (optional - skip if it fails)
        # Storage is non-critical - predictions work without it
        image_url = None
        try:
            filename = f"{uuid.uuid4()}_{file.filename}"
            image_url = upload_image_to_storage(
                file_content=image_bytes,
                filename=filename,
                content_type=file.content_type
            )
            # If upload returns None or empty string, set to None
            if not image_url:
                image_url = None
        except Exception as storage_error:
            # Storage upload failed, but prediction still works
            logger.warning(f"Storage upload failed (non-critical): {str(storage_error)}")
            image_url = None
        
        # Get description and recommended treatments from Gemini API
        logger.info(f"Calling Gemini API for disease: {disease_name}")
        try:
            description, recommended = await get_gemini_response(disease_name)
            logger.info("Successfully received Gemini response")
        except Exception as gemini_error:
            # Fallback if Gemini API fails
            logger.warning(f"Gemini API failed: {str(gemini_error)}, using fallback")
            description = "Description not available. Please contact a qualified aquaculture expert."
            recommended = "Treatment recommendations not available. Please consult a certified aquaculture veterinarian."
        
        logger.info("Prediction completed successfully")
        return PredictionResponse(
            prediction=disease_name,
            confidence=confidence,
            description=description,
            recommended=recommended,
            disclaimer=DISCLAIMER
        )
    
    except HTTPException:
        # Re-raise HTTP exceptions (they already have proper status codes)
        raise
    except Exception as e:
        # Log the full error for debugging
        logger.error(f"Prediction failed with error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.get("/health")
async def health_check():
    """
    Health check endpoint to verify model is loaded.
    """
    from models.loader import get_model_info
    
    model_info = get_model_info()
    
    if not model_info["loaded"]:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "status": "healthy",
        "model": model_info
    }
