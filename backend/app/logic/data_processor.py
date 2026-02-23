import json
import numpy as np
import statistics 
from collections import Counter, defaultdict

def load_cached_data():
    try:
        with open('app/data/anime_cache.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Erreur de lecture : {e}")
        return []




def get_correlation_logic():
    data = load_cached_data()
    x_vals = []
    y_vals = []
    points = []
    
    for item in data:
        node = item.get('node', {})
        if 'mean' in node and 'num_list_users' in node:
            x = node['num_list_users']
            y = node['mean']
            points.append({'x': x, 'y': y})
            x_vals.append(x)
            y_vals.append(y)
    
    # Calcul du coefficient de corrélation (r)
    correlation_matrix = np.corrcoef(x_vals, y_vals)
    r_value = correlation_matrix[0, 1]


    
    return {
        "points": points,
        "stats": {
            "rValue": f"r = {r_value:.3f}",
            "count": len(points)
        }
    }


def get_genres_logic():
    data = load_cached_data()
    genre_counts = Counter()
    
    # On limite l'analyse aux 100 premiers pour le "Top 100"
    top_100 = data[:100]
    
    for item in top_100:
        genres = item.get('node', {}).get('genres', []) #
        for g in genres:
            genre_counts[g['name']] += 1
            
    # On trie pour avoir les plus fréquents en premier
    sorted_genres = genre_counts.most_common(15)
    
    return {
        "series": [count for _, count in sorted_genres],
        "labels": [name for name, _ in sorted_genres]
    }


def get_studios_logic():
    data = load_cached_data()
    studio_map = defaultdict(list)
    
    for item in data:
        node = item.get('node', {})
        studios = node.get('studios', [])
        score = node.get('mean')
        
        if score and studios:
            for s in studios:
                studio_map[s['name']].append(score)
    
    stats_list = []
    for name, scores in studio_map.items():
        if len(scores) >= 3:
            stats_list.append({
                "name": name,
                "score": round(statistics.mean(scores), 2),
                "count": len(scores)
            })
    
    stats_list.sort(key=lambda x: x['score'], reverse=True)
    

    final_data = {
        "names": [s['name'] for s in stats_list[:15]],
        "scores": [s['score'] for s in stats_list[:15]]
    }
    return final_data

def get_seasonal_logic():
    data = load_cached_data()

    seasonal_map = defaultdict(lambda: defaultdict(list))
    
    for item in data:
        node = item.get('node', {})
        score = node.get('mean') #
        # Extraction de la saison de l'objet node
        season_info = node.get('start_season') 
        
        if score and season_info:
            year = season_info.get('year')
            season_name = season_info.get('season') #
            seasonal_map[year][season_name].append(score)
            
    result = []

    for year in sorted(seasonal_map.keys()):
        year_data = []

        for s in ["winter", "spring", "summer", "fall"]:
            scores = seasonal_map[year].get(s, [])
            if scores:
                avg = statistics.mean(scores)
                std = statistics.stdev(scores) if len(scores) > 1 else 0
                year_data.append({
                    "season": s,
                    "avg": round(avg, 2),
                    "std": round(std, 2)
                })
        result.append({"name": str(year), "data": year_data})


    return result



def get_anime_list_logic():
    data = load_cached_data()
    processed_list = []
    
    for item in data:
        node = item.get('node', {})

        processed_list.append({
            'id': node.get('id'),
            'title': node.get('title'),
            'score': node.get('mean'),

            'studio_name': node.get('studios', [{}])[0].get('name', 'Unknown') if node.get('studios') else 'Unknown',
           
            'genres': [g['name'] for g in node.get('genres', [])],
            'year': node.get('start_season', {}).get('year')
        })

    print(processed_list)
    
    return processed_list