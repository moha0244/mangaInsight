import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { AnimeStats } from '../../interfaces/anim-stats';

@Injectable({
  providedIn: 'root',
})
export class AnimeDataService {
  private apiUrl = 'https://mangainsight-1.onrender.com/api';

  constructor(private http: HttpClient) {}

  getCorrelation(): Observable<AnimeStats['correlationData']> {
    return this.http.get<AnimeStats['correlationData']>(`${this.apiUrl}/correlation`);
  }

  getGenres(): Observable<AnimeStats['genreDistribution']> {
    return this.http.get<AnimeStats['genreDistribution']>(`${this.apiUrl}/genres`);
  }

  getStudios(): Observable<AnimeStats['studioRanking']> {
    return this.http.get<AnimeStats['studioRanking']>(`${this.apiUrl}/studios`);
  }

  getSeasonal(): Observable<AnimeStats['seasonalTrends']> {
    return this.http.get<AnimeStats['seasonalTrends']>(`${this.apiUrl}/seasonal`);
  }

  getAnimeList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/anime-list`);
  }

  getRealStats(): Observable<any[]> {
    return this.getAnimeList().pipe(
      map((animes) => {
        const studios = new Set(animes.map((a) => a.studio_name));
        const genres = new Set(animes.flatMap((a) => a.genres));

        return [
          { label: 'Animés analysés', value: `${animes.length}+` },
          { label: 'Studios suivis', value: `${studios.size}+` },
          { label: 'Genres couverts', value: genres.size.toString() },
          { label: "Période d'analyse", value: '2024-2025' },
        ];
      }),
    );
  }
}
