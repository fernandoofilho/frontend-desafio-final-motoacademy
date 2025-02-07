import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
// import { SearchPageComponent } from './pages/search-page/search-page.component';

export const routes: Routes = [

  { path: 'home', component: HomePageComponent},
  // { path: 'search', component: SearchPageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];
