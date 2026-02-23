import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterService } from '../../services/filter-service/filter.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  years = ['Toutes', '2024', '2025'];
  genres = [
    'Tous',
    'Action',
    'Aventure',
    'Comédie',
    'Drame',
    'Fantaisie',
    'Horreur',
    'Mecha',
    'Musique',
    'Mystère',
    'Romance',
    'Sci-Fi',
    'Sports',
    'Surnaturel',
    'Thriller',
    'Tranche de vie',
  ];
  studios = ['Tous', 'Shaft', 'Trigger', 'CloverWorks', 'MAPPA', 'ufotable'];

  constructor(private filterService: FilterService) {}

  onYearChange(value: string) {
    this.filterService.updateFilter('year', value);
  }

  onGenreChange(value: string) {
    this.filterService.updateFilter('genre', value);
  }

  onStudioChange(value: string) {
    this.filterService.updateFilter('studio', value);
  }
}
