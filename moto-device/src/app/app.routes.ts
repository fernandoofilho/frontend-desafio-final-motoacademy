import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';

export const routes: Routes = [

  { path: 'home', component: HomePageComponent},
  { path: 'team', component: TeamPageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];
