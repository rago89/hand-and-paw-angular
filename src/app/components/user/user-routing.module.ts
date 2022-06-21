import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteAnimalComponent } from './favorite-animal/favorite-animal.component';
import { AuthGuard } from './forms/auth-guard.service';
import { EditUserComponent } from './forms/edit-user/edit-user.component';
import { MyAnimalsComponent } from './my-animals/my-animals.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class UserRoutingModule {}
