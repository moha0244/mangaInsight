import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/pages/app/app.component'; // Attention au chemin !

bootstrapApplication(AppComponent, appConfig).catch((err: unknown) => console.error(err));
