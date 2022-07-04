import { animalReducer } from './components/animal/store/animal.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core.module';

import { UserModule } from './components/user/user.module';
import { SharedModule } from './components/shared/shared.module';
import * as fromApp from './store/app.reducer';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutAdoptionComponent } from './components/about-adoption/about-adoption.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { DropdownMenuDirective } from './shared-directives/dropdown-menu.directive';
import { ToggleCollapseQuestionDirective } from './components/about-adoption/directives/toggle-collapse-question.directive';
import { HamburgerComponent } from './components/layout/header/hamburger/hamburger.component';
import { EffectsModule } from '@ngrx/effects';
import { AnimalEffects } from './components/animal/store/animal.effect';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    AboutAdoptionComponent,
    HeaderComponent,
    FooterComponent,
    DropdownMenuDirective,
    ToggleCollapseQuestionDirective,
    HamburgerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AnimalEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
