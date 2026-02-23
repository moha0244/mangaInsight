import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FilterState {
  year: string;
  genre: string;
  studio: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private initialState: FilterState = {
    year: 'Toutes',
    genre: 'Tous',
    studio: 'Tous',
  };

  private filterState$ = new BehaviorSubject<FilterState>(this.initialState);

  constructor() {}

  // Observable pour écouter les changements de filtres
  getFilters() {
    return this.filterState$.asObservable();
  }

  // Obtenir l'état actuel des filtres
  getCurrentFilters(): FilterState {
    return this.filterState$.value;
  }

  // Mettre à jour un filtre spécifique
  updateFilter(filterType: keyof FilterState, value: string) {
    const currentState = this.filterState$.value;
    const newState = { ...currentState, [filterType]: value };
    this.filterState$.next(newState);
  }

  // Mettre à jour tous les filtres à la fois
  updateAllFilters(filters: Partial<FilterState>) {
    const currentState = this.filterState$.value;
    const newState = { ...currentState, ...filters };
    this.filterState$.next(newState);
  }

  // Réinitialiser tous les filtres
  resetFilters() {
    this.filterState$.next(this.initialState);
  }
}
