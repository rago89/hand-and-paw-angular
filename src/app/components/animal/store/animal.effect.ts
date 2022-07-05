import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import * as AnimalActions from './animal.actions';
import { AnimalService } from '../animal.service';

@Injectable()
export class AnimalEffects {
  addAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.postAnimalStart),
      switchMap((action) => {
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

  getMyAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getMyAnimalsStart),
      mergeMap((action) => {
        return this.animalService.getAnimal(action.animalId).pipe(
          map((animal) =>
            AnimalActions.getMyAnimalsSuccess({
              animal: animal[0],
            })
          ),
          catchError((error) =>
            of(
              AnimalActions.getMyAnimalsError({
                error: 'An error has occurred, try again later',
              })
            )
          )
        );
      })
    )
  );

  getMyFavoritesAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getMyFavoritesAnimalsStart),
      mergeMap((action) => {
        return this.animalService.getAnimal(action.animalId).pipe(
          map((animal) =>
            AnimalActions.getMyFavoritesAnimalsSuccess({
              animal: animal[0],
            })
          ),
          catchError((error) =>
            of(
              AnimalActions.getMyFavoritesAnimalsError({
                error: 'An error has occurred, try again later',
              })
            )
          )
        );
      })
    )
  );

  addFavoriteAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.AddFavoriteAnimalsStart),
      mergeMap((action) => {
        return this.animalService.getAnimal(action.animalId).pipe(
          map((animal) =>
            AnimalActions.getMyFavoritesAnimalsSuccess({
              animal: animal[0],
            })
          ),
          catchError((error) =>
            of(
              AnimalActions.getMyFavoritesAnimalsError({
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
