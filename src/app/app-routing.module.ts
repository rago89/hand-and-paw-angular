import { AuthGuard } from './components/user/forms/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateAnimalComponent } from './components/animal/update-animal/update-animal.component';
import { AnimalDescriptionComponent } from './components/animal/animal-description/animal-description.component';
import { MyAnimalsComponent } from './components/user/my-animals/my-animals.component';
import { EditUserComponent } from './components/user/forms/edit-user/edit-user.component';
import { FavoriteAnimalComponent } from './components/user/favorite-animal/favorite-animal.component';
import { FindAnimalComponent } from './components/animal/find-animal/find-animal.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterAnimalComponent } from './components/animal/register-animal/register-animal.component';
import { AboutAdoptionComponent } from './components/about-adoption/about-adoption.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'user',
    children: [
      {
        path: 'favorites-animals/:id',
        component: FavoriteAnimalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my-animals/:id',
        component: MyAnimalsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'animal',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'find' },
      { path: 'find', component: FindAnimalComponent },
      {
        path: 'register',
        component: RegisterAnimalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update/:id',
        component: UpdateAnimalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'description/:id',
        component: AnimalDescriptionComponent,
      },
    ],
  },
  { path: 'about-adoption', component: AboutAdoptionComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
