import { createReducer, on } from '@ngrx/store';
import { Animal } from '../interface/animal';
import * as AnimalActions from './animal.actions';

export interface State {
  animals: Animal[];
  newAnimal: Animal | null;
  myAnimals: Animal[];
  myFavorites: Animal[];
  error: string | null;
  isFetching: boolean;
  successRegistration: boolean;
}

let initialState: State = {
  animals: [],
  newAnimal: null,
  myAnimals: [],
  myFavorites: [],
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
  /*---------------------------Create------------------------------*/
  on(AnimalActions.postAnimalSuccess, (state, { newAnimal }) => {
    return {
      ...state,
      newAnimal: newAnimal,
      animals: [...state.animals, newAnimal],
      myAnimals: [...state.myAnimals, newAnimal],
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
  /*---------------------------Modal------------------------------*/
  on(AnimalActions.leaveModalSuccess, (state) => {
    return {
      ...state,
      successRegistration: false,
    };
  }),
  /*-------------------------Get Animals--------------------------*/
  on(AnimalActions.getAnimalsStart, (state) => {
    return {
      ...state,
      isFetching: true,
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
  }),
  /*-----------------------Get my Animals-------------------------*/
  on(AnimalActions.getMyAnimalsStart, (state) => {
    return {
      ...state,
      isFetching: true,
    };
  }),
  on(AnimalActions.getMyAnimalsSuccess, (state, { animal }) => {
    return {
      ...state,
      myAnimals: [...state.myAnimals, animal],
      isFetching: false,
      postAnimalError: null,
    };
  }),
  on(AnimalActions.getMyAnimalsError, (state, { error }) => {
    return {
      ...state,
      error: error,
      isFetching: false,
    };
  }),
  /*-----------------------Get my Favorite Animals-------------------------*/
  on(AnimalActions.getMyFavoritesAnimalsStart, (state) => {
    return {
      ...state,
      isFetching: true,
    };
  }),
  on(AnimalActions.getMyFavoritesAnimalsSuccess, (state, { animal }) => {
    return {
      ...state,
      myFavorites: [...state.myFavorites, animal],
      isFetching: false,
      postAnimalError: null,
    };
  }),
  on(AnimalActions.getMyFavoritesAnimalsError, (state, { error }) => {
    return {
      ...state,
      error: error,
      isFetching: false,
    };
  })
);
