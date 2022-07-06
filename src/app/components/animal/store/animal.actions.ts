import { createAction, props } from '@ngrx/store';
import { Animal } from './../interface/animal';

/*---------------------------Create------------------------------*/

export const postAnimalStart = createAction(
  '[Register animal page] Post Animal Start',
  props<{ newAnimalData: any }>()
);

export const postAnimalError = createAction(
  '[Register animal page] Post Animal Error',
  props<{ error: string }>()
);

export const postAnimalSuccess = createAction(
  '[Register animal page] Post Animal Success',
  props<{ newAnimal: Animal }>()
);

/*---------------------------Update------------------------------*/

export const updateAnimalStart = createAction(
  '[Update animal page] Update Animal Start',
  props<{ animalId: string; newAnimalData: any }>()
);

export const updateAnimalSuccess = createAction(
  '[Update animal page] Update Animal Success',
  props<{ animalUpdated: Animal; animalId: string }>()
);

export const updateAnimalError = createAction(
  '[Update animal page] Update Animal Error',
  props<{ error: string }>()
);

/*---------------------------Modal------------------------------*/

export const leaveModalSuccess = createAction(
  '[Register animal page]  Set to false Success Registration'
);

/*-------------------------Get Animals--------------------------*/

export const getAnimalsStart = createAction(
  '[Find animal page] Get Animals Start'
);

export const getAnimalsError = createAction(
  '[Find animal page] Get Animals Error',
  props<{ error: string }>()
);

export const getAnimalsSuccess = createAction(
  '[Find animal page] Get Animals Success',
  props<{ animals: Animal[] }>()
);

/*-----------------------Get my Animals-------------------------*/

export const getMyAnimalsStart = createAction(
  '[My animals page] Get my Animals start',
  props<{ animalId: string }>()
);

export const getMyAnimalsSuccess = createAction(
  '[My animals page] Get my Animals Success',
  props<{ animal: Animal }>()
);

export const getMyAnimalsError = createAction(
  '[My animals page] Get my Animals Error',
  props<{ error: string }>()
);

/*-------------------Get my Favorites Animals-------------------*/

export const getMyFavoritesAnimalsStart = createAction(
  '[My favorites page] Get Favorites Animal start',
  props<{ animalId: string }>()
);

export const getMyFavoritesAnimalsSuccess = createAction(
  '[My favorites page] Get Favorites Animals Success',
  props<{ animal: Animal }>()
);

export const getMyFavoritesAnimalsError = createAction(
  '[My favorites page] Get FavoritesFavorites Animals Error',
  props<{ error: string }>()
);

/*-------------------Add Favorite Animal-------------------*/

export const AddFavoriteAnimalsStart = createAction(
  '[My favorites page] Get Animal start',
  props<{ animalId: string }>()
);

export const AddFavoriteAnimalsSuccess = createAction(
  '[My favorites page] Get Animals Success',
  props<{ animal: Animal }>()
);

export const AddFavoriteAnimalError = createAction(
  '[My favorites page] Get Animals Error',
  props<{ error: string }>()
);
