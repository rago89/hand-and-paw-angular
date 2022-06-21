import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../user/forms/auth-guard.service';
import { AnimalDescriptionComponent } from './animal-description/animal-description.component';
import { FindAnimalComponent } from './find-animal/find-animal.component';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';
import { UpdateAnimalComponent } from './update-animal/update-animal.component';

const routes: Routes = [
  {
    path: '',
    children: [
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
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AnimalRoutingModule {}
