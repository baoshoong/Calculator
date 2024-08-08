import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { calculatorReducer } from './calculator.reducer' ;

export interface State {}

export const reducers: ActionReducerMap<State> = {
  calculator: calculatorReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

