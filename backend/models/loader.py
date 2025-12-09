"""
TensorFlow model loader for fish disease classification.
Loads the MobileNetV2 model on startup and provides prediction functionality.
"""
import os
import numpy as np
import keras
from PIL import Image
import io
from typing import Tuple, Optional, Any
from dotenv import load_dotenv

load_dotenv()

# Model configuration
MODEL_PATH = os.getenv("MODEL_PATH", "models/fish_disease_model.h5")
IMAGE_SIZE = (224, 224)  # MobileNetV2 input size

# Disease class names (7 classes)
DISEASE_CLASSES = [
    "Bacterial Gill Disease",
    "Aeromoniasis",
    "Parasitic",
    "Viral White tail",
    "Fungal Saprolegniasis",
    "Bacterial Red Disease",
    "Healthy Fish"
]

# Global model variable
_model: Optional[Any] = None


def load_model() -> Any:
    """
    Load the TensorFlow model from file.
    This should be called once on application startup.
    
    Returns:
        Loaded Keras model
    """
    global _model
    
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model file not found at {MODEL_PATH}. "
                "Please ensure the model file exists or set MODEL_PATH in .env"
            )
        
        print(f"Loading model from {MODEL_PATH}...")
        _model = keras.models.load_model(MODEL_PATH)
        print("Model loaded successfully!")
    
    return _model


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Preprocess image for model input.
    
    Args:
        image_bytes: Raw image bytes
    
    Returns:
        Preprocessed image array ready for model prediction
    """
    # Load image from bytes
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if necessary
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    # Resize to model input size
    image = image.resize(IMAGE_SIZE)
    
    # Convert to array and normalize
    img_array = np.array(image) / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array


def predict_disease(image_bytes: bytes) -> Tuple[str, float]:
    """
    Predict fish disease from image.
    
    Args:
        image_bytes: Raw image bytes
    
    Returns:
        Tuple of (disease_name, confidence_score)
    """
    global _model
    
    if _model is None:
        _model = load_model()
    
    # Preprocess image
    processed_image = preprocess_image(image_bytes)
    
    # Make prediction
    predictions = _model.predict(processed_image, verbose=0)
    
    # Get predicted class index
    predicted_index = np.argmax(predictions[0])
    
    # Get confidence score
    confidence = float(predictions[0][predicted_index])
    
    # Get disease name
    disease_name = DISEASE_CLASSES[predicted_index]
    
    return disease_name, confidence


def get_model_info() -> dict:
    """
    Get information about the loaded model.
    
    Returns:
        Dictionary with model information
    """
    global _model
    
    if _model is None:
        return {"loaded": False, "path": MODEL_PATH}
    
    return {
        "loaded": True,
        "path": MODEL_PATH,
        "input_shape": _model.input_shape,
        "output_shape": _model.output_shape,
        "classes": DISEASE_CLASSES,
        "num_classes": len(DISEASE_CLASSES)
    }

