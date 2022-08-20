import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('users/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/login', payload, {
      withCredentials: true,
    });

    return data.user;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.message,
      errors: error.response.data.errors,
    });
  }
});
export const register = createAsyncThunk('users/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/register', payload, {
      withCredentials: true,
    });
    return data.user;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.message,
      errors: error.response.data.errors,
    });
  }
});
export const logout = createAsyncThunk('users/logout', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      '/logout',
      {},
      {
        withCredentials: true,
      },
    );
    return null;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.message,
      errors: error.response.data.errors,
    });
  }
});
export const getLoggedInUser = createAsyncThunk(
  'users/get-logged-in-user',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/users/user-info');

      return data;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const getProfile = createAsyncThunk(
  'users/profile',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/profile/${payload.replaceAll('-', ' ')}`);

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        errors: error.response.data.errors,
      });
    }
  },
);

export const updateProfile = createAsyncThunk(
  'users/update-profile',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/users/profile/${payload.username.replaceAll('-', ' ')}`,
        payload.userInfo,
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
