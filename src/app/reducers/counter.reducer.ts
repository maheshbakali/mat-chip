import {createReducer, on} from '@ngrx/store';
import * as fromCounterActions from '../actions';

export const initialState = 0;

export const myCounterReducer = createReducer(
    initialState,
    on(fromCounterActions.increment, state => state + 1),
    on(fromCounterActions.decrement, state => state - 1),
    on(fromCounterActions.reset, state => 0),
);