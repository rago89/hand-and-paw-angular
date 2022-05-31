import { AuthGuard } from './components/user/forms/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateAnimalComponent } from './components/animal/update-animal/update-animal.component';
import { AnimalDescriptionComponent } from './components/animal/animal-description/animal-description.component';
import { MyAnimalsComponent } from './components/user/my-animals/my-animals.component';
import { EditUserComponent } from './components/user/forms/edit-user/edit-user.component';
import { FavoriteAnimalComponent } from './components/user/favorite-animal/favorite-animal.component';
import { LoginUserComponent } from './components/user/forms/login-user/login-user.component';
import { FindAnimalComponent } from './components/animal/find-animal/find-animal.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterAnimalComponent } from './components/animal/register-animal/register-animal.component';
import { AboutAdoptionComponent } from './components/about-adoption/about-adoption.component';
import { RegisterUserComponent } from './components/user/forms/register-user/register-user.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'user/favorites-animals/:id',
    component: FavoriteAnimalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/edit/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/my-animals/:id',
    component: MyAnimalsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'animal/find', component: FindAnimalComponent },
  {
    path: 'animal/register',
    component: RegisterAnimalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'animal/update/:id',
    component: UpdateAnimalComponent,
    canActivate: [AuthGuard],
  },
  { path: 'animal/description/:id', component: AnimalDescriptionComponent },
  { path: 'about-adoption', component: AboutAdoptionComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
