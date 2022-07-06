import { createReducer, on } from '@ngrx/store';
import { Animal } from '../interface/animal';
import * as AnimalActions from './animal.actions';

export interface State {
  animals: Animal[];
  newAnimal: Animal | null;
  animalUpdated: Animal | null;
  myAnimals: Animal[];
  myFavorites: Animal[];
  error: string | null;
  isFetching: boolean;
  successRegistration: boolean;
  successUpdate: boolean;
}

let initialState: State = {
  animals: [],
  newAnimal: null,
  animalUpdated: null,
  myAnimals: [],
  myFavorites: [],
  error: null,
  isFetching: false,
  successRegistration: false,
  successUpdate: false,
};

export const animalReducer = createReducer(
  initialState,
  /*---------------------------Create------------------------------*/
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
  /*---------------------------Update-----------------------------*/
  on(AnimalActions.updateAnimalStart, (state) => {
    return {
      ...state,
      isFetching: true,
      successRegistration: false,
    };
  }),
  on(
    AnimalActions.updateAnimalSuccess,
    (state, { animalUpdated, animalId }) => {
      const animalIndexInMyAnimals = state.myAnimals.findIndex(
        (animalEl) => animalEl._id === animalId
      );
      const animalWithNewData = {
        ...state.myAnimals[animalIndexInMyAnimals],
        ...animalUpdated,
      };
      const myAnimalsUpdated = [...state.myAnimals];
      myAnimalsUpdated[animalIndexInMyAnimals] = animalWithNewData;
      const animalsUpdated = [...state.animals];
      if (state.animals.length) {
        const animalIndexInAnimals = state.animals.findIndex(
          (animalEl) => animalEl._id === animalId
        );
        animalsUpdated[animalIndexInAnimals] = animalWithNewData;
      }
      return {
        ...state,
        animals: animalsUpdated,
        myAnimals: myAnimalsUpdated,
        animalUpdated: animalUpdated,
        isFetching: false,
        successUpdate: true,
        postAnimalError: null,
      };
    }
  ),
  on(AnimalActions.updateAnimalError, (state, { error }) => {
    return {
      ...state,
      error: error,
      isFetching: false,
      successUpdate: false,
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
    if (state.animalUpdated && state.animals.length) {
      const animals = [...state.animals];
      const animalIndexInAnimals = state.animals.findIndex(
        (animalEl) => animalEl._id === state.animalUpdated?._id
      );
      animals[animalIndexInAnimals] = state.animalUpdated;
      return {
        ...state,
        animals: animals,
        isFetching: false,
        postAnimalError: null,
      };
    } else if (state.animalUpdated && !state.animals.length) {
      const animalsList = [...animals];
      const animalIndexInAnimals = animalsList.findIndex(
        (animalEl) => animalEl._id === state.animalUpdated?._id
      );
      animalsList[animalIndexInAnimals] = state.animalUpdated;
      return {
        ...state,
        animals: animalsList,
        isFetching: false,
        postAnimalError: null,
      };
    } else {
      return {
        ...state,
        animals: animals,
        isFetching: false,
        postAnimalError: null,
      };
    }
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
