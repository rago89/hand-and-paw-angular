import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAnimalsComponent } from '../user/my-animals/my-animals.component';
import { AnimalDescriptionComponent } from './animal-description/animal-description.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { FindAnimalComponent } from './find-animal/find-animal.component';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';
import { UpdateAnimalComponent } from './update-animal/update-animal.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AnimalRoutingModule } from './animal-routing.module';

@NgModule({
  declarations: [
    FindAnimalComponent,
    RegisterAnimalComponent,
    EditAnimalComponent,
    MyAnimalsComponent,
    AnimalDescriptionComponent,
    AnimalFormComponent,
    UpdateAnimalComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    FormsModule,
    AnimalRoutingModule,
  ],
})
export class AnimalModule {}
