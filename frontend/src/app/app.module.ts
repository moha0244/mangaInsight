/* eslint-disable import/no-unresolved */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';
import { AppComponent } from './pages/app/app.component';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.component';
import { CorrelationChartComponent } from './components/correlation-chart/correlation-chart.component';
import { GenreChartComponent } from './components/genre-chart/genre-chart.component';
import { SeasonalChartComponent } from './components/seasonal-chart/seasonal-chart.component';
import { StudioChartComponent } from './components/studio-chart/studio-chart.component';
import { routes } from './modules/app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppComponent,
    NgApexchartsModule,
    CorrelationChartComponent,
    GenreChartComponent,
    SeasonalChartComponent,
    StudioChartComponent,
    NavbarComponent,
    DashboardPage,

    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
