import { applyMiddleware, combineReducers, createStore } from "redux";
import speakerReducer from "./features/speakers";
import voicesReducer from './features/voices'
import reviewsReducer from './features/reviews'
import ratingsReducer from './features/ratings'
import thunk from "redux-thunk";
import React from 'react'
import { composeWithDevTools } from 'redux-devtools-extension'


export const store = createStore(
  combineReducers({
    speakers: speakerReducer,
    voices: voicesReducer,
    reviews: reviewsReducer,
    ratings: ratingsReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);





