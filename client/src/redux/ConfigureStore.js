import { applyMiddleware, combineReducers, createStore } from "redux";
import categoryReducer from "./features/categories";
import { createLogger } from "redux-logger/src";
import speakerReducer from "./features/speakers";
import voicesReducer from './features/voices'
import reviewsReducer from './features/reviews'
import ratingsReducer from './features/ratings'

import thunk from "redux-thunk";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({
    speakers: speakerReducer,
    voices: voicesReducer,
    categories: categoryReducer,
    reviews: reviewsReducer,
    ratings: ratingsReducer
  }),
  applyMiddleware(thunk, logger)
);
