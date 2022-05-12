import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FindAnimalComponent } from './components/animal/find-animal/find-animal.component';
import { RegisterAnimalComponent } from './components/animal/register-animal/register-animal.component';
import { EditAnimalComponent } from './components/animal/edit-animal/edit-animal.component';
import { FavoriteAnimalComponent } from './components/animal/favorite-animal/favorite-animal.component';
import { MyAnimalsComponent } from './components/animal/my-animals/my-animals.component';
import { RegisterUserComponent } from './components/user/forms/register-user/register-user.component';
import { LoginUserComponent } from './components/user/forms/login-user/login-user.component';
import { FindShelterComponent } from './components/find-shelter/find-shelter.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutAdoptionComponent } from './components/about-adoption/about-adoption.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AnimalCardComponent } from './components/animal/animal-card/animal-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FindAnimalComponent,
    RegisterAnimalComponent,
    EditAnimalComponent,
    FavoriteAnimalComponent,
    MyAnimalsComponent,
    RegisterUserComponent,
    LoginUserComponent,
    FindShelterComponent,
    PageNotFoundComponent,
    AboutAdoptionComponent,
    HeaderComponent,
    FooterComponent,
    AnimalCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
