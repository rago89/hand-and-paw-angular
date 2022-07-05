import { createSelector } from '@ngrx/store';
import * as appStore from '../../../store/app.reducer';
import * as animalStore from './animal.reducer';

export const getAnimalFromStore = (state: appStore.AppState) => state.animal;

export const selectNewAnimal = createSelector(
  getAnimalFromStore,
  (state: animalStore.State) => {
    return state.newAnimal;
  }
);

export const selectAnimal = (id: string) =>
  createSelector(getAnimalFromStore, (state: animalStore.State) => {
    const animalFound = state.animals.find((animal) => animal._id === id);
    return animalFound;
  });

export const selectAnimals = () =>
  createSelector(getAnimalFromStore, (state: animalStore.State) => {
    return state.animals;
  });

export const selectMyAnimals = () =>
  createSelector(getAnimalFromStore, (state: animalStore.State) => {
    return state.myAnimals;
  });
