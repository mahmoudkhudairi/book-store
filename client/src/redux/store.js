import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import adminReducer from './adminReducer';

const reducer = combineReducers({
  user: userReducer,
  books: bookReducer,
  admin: adminReducer,
});
export default configureStore({
  reducer,
});
