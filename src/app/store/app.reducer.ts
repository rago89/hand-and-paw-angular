import { ActionReducerMap } from '@ngrx/store';

import * as animal from '../components/animal/store/animal.reducer';

export interface AppState {
  animal: animal.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  animal: animal.animalReducer,
};
