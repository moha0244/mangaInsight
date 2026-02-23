from fastapi import APIRouter
from app.logic.data_processor import get_correlation_logic, get_genres_logic, get_studios_logic, get_seasonal_logic, get_anime_list_logic

router = APIRouter()

@router.get("/correlation")
async def get_correlation():
    """Retourne les données pour le nuage de points (Score vs Popularité)"""
    return get_correlation_logic()

@router.get("/genres")
async def get_genres():
    """Retourne les données pour le Donut Chart (Répartition des genres)"""
    return get_genres_logic()


@router.get("/studios")
async def get_studios():
    """Données pour le Bar Chart des Studios (min. 3 titres)"""
    return get_studios_logic()

@router.get("/seasonal")
async def get_seasonal():
    """Données pour l'Area Chart (Moyennes + Écart-type par saison)"""
    return get_seasonal_logic()


@router.get("/anime-list")
async def get_anime_list():
  
    data = get_anime_list_logic()
    return data


