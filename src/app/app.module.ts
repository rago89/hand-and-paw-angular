import { AuthGuard } from './components/user/forms/auth-guard.service';
import { AuthInterceptorService } from './components/user/forms/auth-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  APP_BASE_HREF,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FindAnimalComponent } from './components/animal/find-animal/find-animal.component';
import { RegisterAnimalComponent } from './components/animal/register-animal/register-animal.component';
import { EditAnimalComponent } from './components/animal/edit-animal/edit-animal.component';
import { FavoriteAnimalComponent } from './components/user/favorite-animal/favorite-animal.component';
import { MyAnimalsComponent } from './components/user/my-animals/my-animals.component';
import { RegisterUserComponent } from './components/user/forms/register-user/register-user.component';
import { LoginUserComponent } from './components/user/forms/login-user/login-user.component';
import { FindShelterComponent } from './components/find-shelter/find-shelter.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutAdoptionComponent } from './components/about-adoption/about-adoption.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AnimalCardComponent } from './components/animal/animal-card/animal-card.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { DropdownMenuDirective } from './shared-directives/dropdown-menu.directive';
import { ModalMessageComponent } from './components/shared/modal-message/modal-message.component';
import { ToggleCollapseQuestionDirective } from './components/about-adoption/directives/toggle-collapse-question.directive';
import { HamburgerComponent } from './components/layout/header/hamburger/hamburger.component';
import { PascalCasePipe } from './pipes/pascal-case.pipe';
import { AnimalDescriptionComponent } from './components/animal/animal-description/animal-description.component';
import { EditUserComponent } from './components/user/forms/edit-user/edit-user.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { UpdateAnimalComponent } from './components/animal/update-animal/update-animal.component';
import { UpdateEmailComponent } from './components/user/forms/update-email/update-email.component';
import { UpdatePasswordComponent } from './components/user/forms/update-password/update-password.component';

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
    ModalComponent,
    DropdownMenuDirective,
    ModalMessageComponent,
    ToggleCollapseQuestionDirective,
    HamburgerComponent,
    PascalCasePipe,
    AnimalDescriptionComponent,
    EditUserComponent,
    ContactFormComponent,
    AnimalFormComponent,
    UpdateAnimalComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
