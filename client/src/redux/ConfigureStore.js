import { applyMiddleware, combineReducers, createStore } from "redux";
import categoryReducer from "./features/categories";
import { createLogger } from "redux-logger/src";
import speakerReducer from "./features/speakers";
import voicesReducer from './features/voices'
import reviewsReducer from './features/reviews'
import ratingsReducer from './features/ratings'

import thunk from "redux-thunk";
import Grid from '@material-ui/core/Grid'
import { IconButton } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import React from 'react'

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({
    speakers: speakerReducer,
    voices: voicesReducer,
    reviews: reviewsReducer,
    ratings: ratingsReducer
  }),
  applyMiddleware(thunk, logger)
);





