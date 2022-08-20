import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPublicBooks = createAsyncThunk(
  'books/public',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/books/public');

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        errors: error.response.data.errors,
      });
    }
  },
);
export const addBook = createAsyncThunk('books/add', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/books', payload, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.message,
      errors: error.response.data.errors,
    });
  }
});
export const getBooks = createAsyncThunk('books/get-all', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/books?page=${payload}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.message,
      errors: error.response.data.errors,
    });
  }
});
export const getBookById = createAsyncThunk(
  'books/get-by-id',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/books/${payload}`, {
        withCredentials: true,
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
export const setCurrentBook = createAsyncThunk('books/set-current-book', async payload => {
  return null;
});
export const updateBook = createAsyncThunk('books/update', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/api/books/${payload._id}`, payload);
    return data;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.message,
      errors: error.response.data.errors,
    });
  }
});
export const deleteBook = createAsyncThunk('books/delete', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/books/${payload}`);
    return data;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.message,
      errors: error.response.data.errors,
    });
  }
});
export const addBookToFav = createAsyncThunk('books/fav', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/api/users/favorite/${payload._id}`, {
      addToFav: payload.addToFav,
    });
    return data;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.message,
      errors: error.response.data.errors,
    });
  }
});
