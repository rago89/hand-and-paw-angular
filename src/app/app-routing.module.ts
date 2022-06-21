import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutAdoptionComponent } from './components/about-adoption/about-adoption.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./components/user/user.module').then(
        (module) => module.UserModule
      ),
  },
  {
    path: 'animal',
    loadChildren: () =>
      import('./components/animal/animal.module').then(
        (module) => module.AnimalModule
      ),
  },
  { path: 'about-adoption', component: AboutAdoptionComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
