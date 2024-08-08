import { createReducer, on} from "@ngrx/store";
import { add, subtract, multiply, divide } from "../action/calculator.action";

export const initialState = 0;

export const calculatorReducer = createReducer(
    initialState,
    on(add, (state, value) => value.num1 + value.num2),
    on(subtract, (state, value) => value.num1 - value.num2),
    on(multiply, (state, value) => value.num1 * value.num2),
    on(divide, ( state, value) => value.num1 + value.num2),
)


