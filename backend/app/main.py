import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from apscheduler.schedulers.background import BackgroundScheduler
from app.services.mal_scraper import fetch_and_save_top_anime
from app.api.router import router as api_router

# 1. Configuration de l'application
app = FastAPI(title="Anime Insights API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En prod, remplace "*" par l'URL de ton app Angular
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix="/api")
load_dotenv()

scheduler = BackgroundScheduler()
CLIENT_ID = os.getenv("MAL_CLIENT_ID", "default_id_if_missing") # Récupéré sur https://myanimelist.net/apiconfig

@app.on_event("startup")
def init_data_task():
    # Lance une première récupération au démarrage
    fetch_and_save_top_anime(CLIENT_ID)
    
    # Planifie une mise à jour toutes les 15 minutes
    scheduler.add_job(
        func=fetch_and_save_top_anime, 
        trigger="interval", 
        minutes=15, 
        args=[CLIENT_ID]
    )
    scheduler.start()

@app.get("/")
def read_root():
    return {"status": "Backend is running", "data_source": "MyAnimeList API v2"}

if __name__ == "__main__":
    # Lancement du serveur sur le port 8000
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)