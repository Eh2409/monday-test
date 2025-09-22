import { combineReducers, compose, legacy_createStore as createStore } from "redux";
import { crudlReducer } from "./reducers/crudl.reducer.js";
import { boardReducer } from "./reducers/board.reducer.js";

const rootReducer = combineReducers({
    crudlModule: crudlReducer,
    boardModule: boardReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())