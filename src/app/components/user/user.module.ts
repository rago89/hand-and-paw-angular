import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FavoriteAnimalComponent } from './favorite-animal/favorite-animal.component';
import { EditUserComponent } from './forms/edit-user/edit-user.component';
import { LoginUserComponent } from './forms/login-user/login-user.component';
import { RegisterUserComponent } from './forms/register-user/register-user.component';
import { UpdateEmailComponent } from './forms/update-email/update-email.component';
import { UpdatePasswordComponent } from './forms/update-password/update-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UpdateEmailComponent,
    EditUserComponent,
    UpdatePasswordComponent,
    RegisterUserComponent,
    FavoriteAnimalComponent,
    LoginUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    LoginUserComponent,
    RegisterUserComponent,
    UpdatePasswordComponent,
    UpdateEmailComponent,
    EditUserComponent,
  ],
})
export class UserModule {}
