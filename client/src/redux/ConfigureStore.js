import { applyMiddleware, combineReducers, createStore } from 'redux'
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
