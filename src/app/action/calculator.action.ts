import {createAction, props} from '@ngrx/store';

export const add = createAction('[Calculator Component] Add', props<{num1: number, num2: number}>());
export const subtract = createAction('[Calculator Component] Subtract', props<{num1: number, num2: number}>());
export const multiply = createAction('[Calculator Component] Multiply', props<{num1: number, num2: number}>());
export const divide = createAction('[Calculator Component] Divide', props<{num1: number, num2: number}>());
