import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CorrelationChartComponent } from '../../components/correlation-chart/correlation-chart.component';
import { GenreChartComponent } from '../../components/genre-chart/genre-chart.component';
import { SeasonalChartComponent } from '../../components/seasonal-chart/seasonal-chart.component';
import { StudioChartComponent } from '../../components/studio-chart/studio-chart.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProjectDescriptionComponent } from '../../components/project-description/project-description.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CorrelationChartComponent,
    GenreChartComponent,
    SeasonalChartComponent,
    StudioChartComponent,
    NavbarComponent,
    ProjectDescriptionComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
