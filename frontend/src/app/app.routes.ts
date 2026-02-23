import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardPage },
  { path: '**', redirectTo: 'home' },
];
