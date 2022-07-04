import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as AnimalActions from './animal.actions';
import { AnimalService } from '../animal.service';

@Injectable()
export class AnimalEffects {
  addAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.postAnimalStart),
      switchMap((action) => {
        console.log(action.newAnimalData);
        return this.animalService.postAnimal(action.newAnimalData).pipe(
          map((newAnimal) =>
            AnimalActions.postAnimalSuccess({
              newAnimal: newAnimal.newPublication,
            })
          ),
          catchError((error) =>
            of(
              AnimalActions.postAnimalError({
                error: 'An error has occurred, try again later',
              })
            )
          )
        );
      })
    )
  );

  getAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getAnimalsStart),
      switchMap((action) => {
        return this.animalService.getAnimals().pipe(
          map((animals) =>
            AnimalActions.getAnimalsSuccess({
              animals,
            })
          ),
          catchError((error) =>
            of(
              AnimalActions.getAnimalsError({
                error: 'An error has occurred, try again later',
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private animalService: AnimalService
  ) {}
}
