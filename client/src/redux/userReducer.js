import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  getLoggedInUser,
  login,
  register,
  logout,
  getProfile,
  updateProfile,
} from './actions/user';
import { addBookToFav } from './actions/book';
const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, error: null, loading: false, success: false, profile: null },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        login.pending,
        register.pending,
        logout.pending,
        getLoggedInUser.pending,
        getProfile.pending,
        updateProfile.pending,
        addBookToFav.pending,
      ),
      (state, { type, payload }) => {
        if (type === 'users/get-logged-in-user/pending') {
          return { ...state, loading: false, success: false, error: null, user: 'pending' };
        } else if (type === 'users/profile/pending') {
          return { ...state, loading: true, error: null, profile: null };
        } else {
          return { ...state, loading: true, error: null };
        }
      },
    );
    builder.addMatcher(
      isAnyOf(
        login.fulfilled,
        register.fulfilled,
        logout.fulfilled,
        getLoggedInUser.fulfilled,
        getProfile.fulfilled,
        updateProfile.fulfilled,
        addBookToFav.fulfilled,
      ),
      (state, { type, payload }) => {
        switch (type) {
          case 'users/profile/fulfilled':
            return { ...state, loading: false, success: true, profile: payload };
          case 'books/fav/fulfilled':
            return {
              ...state,
              loading: false,
              success: true,
              user: { ...state.user, favDict: payload },
            };
          default:
            return { ...state, loading: false, success: true, user: payload };
        }
      },
    );
    builder.addMatcher(
      isAnyOf(
        login.rejected,
        register.rejected,
        logout.rejected,
        getLoggedInUser.rejected,
        getProfile.rejected,
        updateProfile.rejected,
        addBookToFav.rejected,
      ),
      (state, { type, payload }) => {
        if (type === 'users/get-logged-in-user/rejected') {
          return { ...state, loading: false, success: false, error: null, user: payload };
        } else {
          if (payload) {
            return {
              ...state,
              loading: false,
              success: false,
              error: {
                message: payload.message ? payload.message : 'Something went wrong :(',
                errors: payload.errors,
              },
            };
          } else {
            return { ...state, loading: false, success: false, error: null };
          }
        }
      },
    );
  },
});

export default userSlice.reducer;
