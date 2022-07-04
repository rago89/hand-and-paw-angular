import { createReducer, on } from '@ngrx/store';
import { Animal } from '../interface/animal';
import * as AnimalActions from './animal.actions';

export interface State {
  animals: Animal[];
  newAnimal: Animal | null;
  myAnimals: Animal[];
  error: string | null;
  isFetching: boolean;
  successRegistration: boolean;
}

let initialState: State = {
  animals: [],
  newAnimal: null,
  myAnimals: [],
  error: null,
  isFetching: false,
  successRegistration: false,
};

export const animalReducer = createReducer(
  initialState,
  on(AnimalActions.postAnimalStart, (state) => {
    return {
      ...state,
      isFetching: true,
      successRegistration: false,
    };
  }),
  on(AnimalActions.postAnimalSuccess, (state, { newAnimal }) => {
    return {
      ...state,
      newAnimal: newAnimal,
      animals: [...state.animals, newAnimal],
      isFetching: false,
      successRegistration: true,
      postAnimalError: null,
    };
  }),
  on(AnimalActions.postAnimalError, (state, { error }) => {
    return {
      ...state,
      error: error,
      isFetching: false,
      successRegistration: false,
    };
  }),
  on(AnimalActions.leaveModalSuccess, (state) => {
    return {
      ...state,
      successRegistration: false,
    };
  }),
  on(AnimalActions.getAnimalsStart, (state) => {
    return {
      ...state,
      isFetching: true,
      successRegistration: false,
    };
  }),
  on(AnimalActions.getAnimalsSuccess, (state, { animals }) => {
    return {
      ...state,
      animals: animals,
      isFetching: false,
      postAnimalError: null,
    };
  }),
  on(AnimalActions.getAnimalsError, (state, { error }) => {
    return {
      ...state,
      error: error,
      isFetching: false,
    };
  })
);
