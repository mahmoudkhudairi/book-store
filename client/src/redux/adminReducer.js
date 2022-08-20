import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getAdminDashboard, updateAdminBookStatus } from './actions/admin';

const adminSlice = createSlice({
  name: 'admin',
  initialState: { dashboardData: null, error: null, loading: false, success: false },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(updateAdminBookStatus.pending, getAdminDashboard.pending),
      (state, { payload }) => ({ ...state, loading: true, error: null }),
    );
    builder.addMatcher(
      isAnyOf(updateAdminBookStatus.fulfilled, getAdminDashboard.fulfilled),
      (state, { type, payload }) => {
        switch (type) {
          case 'users/update-admin-book-status/fulfilled':
            const books = state.dashboardData.books.map(book => {
              if (book._id === payload._id) {
                return payload;
              } else {
                return book;
              }
            });
            return {
              ...state,
              loading: false,
              success: true,
              dashboardData: { ...state.dashboardData, books },
            };
          default:
            return { ...state, loading: false, success: true, dashboardData: payload };
        }
      },
    );
    builder.addMatcher(
      isAnyOf(updateAdminBookStatus.rejected, getAdminDashboard.rejected),
      (state, { type, payload }) => {
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
        }
      },
    );
  },
});

export default adminSlice.reducer;
