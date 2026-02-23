import json
import time
import requests

def fetch_and_save_top_anime(client_id):
    all_anime = []
    # On boucle pour récupérer 10000 animés par paquets de 500
    for offset in range(0, 10000, 500):
        url = "https://api.myanimelist.net/v2/anime/ranking"
        params = {
            'ranking_type': 'all',
            'limit': 500, #
            'offset': offset, #
            'fields': 'mean,num_list_users,genres,studios,start_season' #
        }
        headers = {'X-MAL-CLIENT-ID': client_id} #
        
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            all_anime.extend(response.json().get('data', []))
    
    # Enregistrement dans le fichier data/anime_cache.json
    with open('app/data/anime_cache.json', 'w') as f:
        json.dump(all_anime, f)