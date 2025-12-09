"""
Disease router for retrieving disease information and treatments.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from utils.supabase_client import get_supabase_client

router = APIRouter(prefix="/diseases", tags=["Diseases"])


class DiseaseResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    common_treatment: Optional[str] = None
    medicine_suggestion: Optional[str] = None


class DiseaseDetailResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    common_treatment: str
    medicine_suggestion: str


@router.get("", response_model=List[DiseaseResponse])
async def get_all_diseases():
    """
    Get list of all diseases with basic information.
    
    Returns all diseases stored in the database.
    """
    supabase = get_supabase_client()
    
    try:
        response = supabase.table("diseases").select("*").execute()
        
        if not response.data:
            return []
        
        return [DiseaseResponse(**disease) for disease in response.data]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch diseases: {str(e)}")


@router.get("/{disease_id}", response_model=DiseaseDetailResponse)
async def get_disease_by_id(disease_id: str):
    """
    Get detailed information about a specific disease.
    
    Returns medicine suggestions and treatment recommendations.
    """
    supabase = get_supabase_client()
    
    try:
        response = supabase.table("diseases").select("*").eq("id", disease_id).execute()
        
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=404, detail="Disease not found")
        
        disease = response.data[0]
        
        return DiseaseDetailResponse(
            id=disease["id"],
            name=disease["name"],
            description=disease.get("description"),
            common_treatment=disease.get("common_treatment", "No treatment information available"),
            medicine_suggestion=disease.get("medicine_suggestion", "No medicine suggestion available")
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch disease: {str(e)}")


@router.get("/name/{disease_name}", response_model=DiseaseDetailResponse)
async def get_disease_by_name(disease_name: str):
    """
    Get detailed information about a disease by name.
    
    Useful for looking up treatment after prediction.
    """
    supabase = get_supabase_client()
    
    try:
        response = supabase.table("diseases").select("*").eq("name", disease_name).execute()
        
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=404, detail="Disease not found")
        
        disease = response.data[0]
        
        return DiseaseDetailResponse(
            id=disease["id"],
            name=disease["name"],
            description=disease.get("description"),
            common_treatment=disease.get("common_treatment", "No treatment information available"),
            medicine_suggestion=disease.get("medicine_suggestion", "No medicine suggestion available")
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch disease: {str(e)}")

