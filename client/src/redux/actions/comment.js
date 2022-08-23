import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ bookId, content }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/books/${bookId}/add-comment`,
        { content },
        {
          withCredentials: true,
        },
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
export const getComments = createAsyncThunk(
  'comments/get-all',
  async ({ bookId, page }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/books/${bookId}/comments?page=${page}`, {
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
export const updateComment = createAsyncThunk(
  'comments/update',
  async ({ bookId, commentId, content }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/books/${bookId}/comments/${commentId}`, { content });
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        errors: error.response.data.errors,
      });
    }
  },
);
export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ bookId, commentId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/books/${bookId}/comments/${commentId}`);
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        errors: error.response.data.errors,
      });
    }
  },
);
