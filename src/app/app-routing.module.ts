import { MyAnimalsComponent } from './components/user/my-animals/my-animals.component';
import { EditUserComponent } from './components/user/forms/edit-user/edit-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoriteAnimalComponent } from './components/user/favorite-animal/favorite-animal.component';
import { LoginUserComponent } from './components/user/forms/login-user/login-user.component';
import { FindAnimalComponent } from './components/animal/find-animal/find-animal.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterAnimalComponent } from './components/animal/register-animal/register-animal.component';
import { AboutAdoptionComponent } from './components/about-adoption/about-adoption.component';
import { RegisterUserComponent } from './components/user/forms/register-user/register-user.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'user/favorites-animals', component: FavoriteAnimalComponent },
  { path: 'user/account/edit', component: EditUserComponent },
  { path: 'user/my-animals', component: MyAnimalsComponent },
  { path: 'animal/find', component: FindAnimalComponent },
  { path: 'animal/register', component: RegisterAnimalComponent },
  { path: 'about-adoption', component: AboutAdoptionComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'register', component: RegisterUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
