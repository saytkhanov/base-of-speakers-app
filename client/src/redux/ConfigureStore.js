import { applyMiddleware, combineReducers, createStore } from "redux";
import categoryReducer from "./features/categories";
import {createLogger} from 'redux-logger/src'
import speakerReducer from "./features/speakers";
import thunk from "redux-thunk";


const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({
    speakers: speakerReducer,
    //voices: voicesReducer,
    categories: categoryReducer,
    //reviews: reviewReducer,
  }),
  applyMiddleware(thunk, logger)
);
