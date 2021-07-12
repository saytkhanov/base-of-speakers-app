import { applyMiddleware, combineReducers, createStore } from 'redux'
import speakerReducer from "./features/speakers"
import thunk from 'redux-thunk'

export const store = createStore(
  combineReducers({
    speakers: speakerReducer,
    // voices: voicesReducer,
    // categories: categoryReducer,
    // reviews: reviewReducer,
  }),
  applyMiddleware(thunk)
);
