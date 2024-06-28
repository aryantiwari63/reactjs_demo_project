// store.js
import { createStore, combineReducers } from 'redux';
import profileReducer from './reducer/profilereducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  // other reducers can be added here
});

const store = createStore(rootReducer);

export default store;
