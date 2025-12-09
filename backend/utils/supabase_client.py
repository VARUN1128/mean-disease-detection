"""
Supabase client utility for database and storage operations.
"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase_service_key = os.getenv("SUPABASE_SERVICE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in .env file")

# Regular client (with RLS)
supabase: Client = create_client(supabase_url, supabase_key)

# Service role client (bypasses RLS) - for admin operations
supabase_admin: Client | None = None
if supabase_service_key:
    supabase_admin = create_client(supabase_url, supabase_service_key)

# Export supabase_url for token verification
__all__ = ["supabase", "get_supabase_client", "get_supabase_admin_client", "upload_image_to_storage", "supabase_url"]


def get_supabase_client() -> Client:
    """Get the Supabase client instance (with RLS)."""
    return supabase


def get_supabase_admin_client() -> Client:
    """Get the Supabase admin client (bypasses RLS)."""
    if not supabase_admin:
        raise ValueError("SUPABASE_SERVICE_KEY must be set in .env file for admin operations")
    return supabase_admin


def upload_image_to_storage(file_content: bytes, filename: str, content_type: str) -> Optional[str]:
    """
    Upload image to Supabase Storage bucket.
    Uses admin client to bypass RLS.
    
    Args:
        file_content: Image file bytes
        filename: Name of the file
        content_type: MIME type of the file (e.g., 'image/jpeg')
    
    Returns:
        Public URL of the uploaded image, or None if upload fails
    """
    bucket_name = "fish-uploads"
    
    # Use admin client to bypass RLS for storage uploads
    try:
        admin_client = get_supabase_admin_client()
        # Upload file to storage using admin client
        response = admin_client.storage.from_(bucket_name).upload(
            path=filename,
            file=file_content,
            file_options={"content-type": content_type, "upsert": "true"}
        )
        
        # Get public URL
        public_url = admin_client.storage.from_(bucket_name).get_public_url(filename)
        
        return public_url
    except Exception as e:
        # If storage fails, return None (prediction still works without storage)
        # This is non-critical - predictions work fine without storing images
        print(f"Warning: Storage upload failed (non-critical): {str(e)}")
        return None

