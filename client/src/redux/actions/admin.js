import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAdminDashboard = createAsyncThunk(
  'users/admin-dashboard',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/admin/dashboard?page=${payload.page}&booksPerPage=${payload.booksPerPage}`,
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        errors: error.response.data.errors,
      });
    }
  },
);
export const updateAdminBookStatus = createAsyncThunk(
  'users/update-admin-book-status',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/dashboard/update-status/${payload.bookId}`, {
        status: payload.status,
      });
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        errors: error.response.data.errors,
      });
    }
  },
);
