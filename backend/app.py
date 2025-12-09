"""
FastAPI application for AquaVeritas fish disease detection backend.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
from dotenv import load_dotenv
from routers import auth, prediction, disease
from models.loader import load_model

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AquaVeritas API",
    description="Backend API for fish disease detection using AI",
    version="1.0.0"
)

# CORS configuration (temporary - allow all origins)
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*")
if allowed_origins == "*":
    origins = ["*"]
else:
    origins = allowed_origins.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(prediction.router)
app.include_router(disease.router)


@app.on_event("startup")
async def startup_event():
    """
    Load TensorFlow model on application startup.
    This ensures the model is ready before handling requests.
    """
    logger.info("Starting AquaVeritas API...")
    try:
        load_model()
        logger.info("✓ Model loaded successfully")
        logger.info("✓ API ready to accept requests")
    except Exception as e:
        logger.error(f"✗ Error loading model: {str(e)}")
        logger.warning("⚠ API will start but predictions will fail until model is available")


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "AquaVeritas Fish Disease Detection API",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/auth/register, /auth/login",
            "prediction": "/predict",
            "diseases": "/diseases, /diseases/{id}"
        },
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    from models.loader import get_model_info
    
    model_info = get_model_info()
    
    return {
        "status": "healthy",
        "model_loaded": model_info["loaded"]
    }

