import { createAction, props } from '@ngrx/store';
import { Animal } from './../interface/animal';

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

export const leaveModalSuccess = createAction(
  '[Register animal page]  Set to false Success Registration'
);

/*------------------------------------------------*/

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

/*------------------------------------------------*/

export const getMyAnimalsStart = createAction(
  '[My animals page] Get Animal start',
  props<{ animalId: string }>()
);

export const getMyAnimalsSuccess = createAction(
  '[My animals page] Get Animals Success',
  props<{ animal: Animal }>()
);

export const getMyAnimalsError = createAction(
  '[My animals page] Get Animals Error',
  props<{ error: string }>()
);
