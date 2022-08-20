import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addBook,
  getBooks,
  getBookById,
  setCurrentBook,
  updateBook,
  deleteBook,
  addBookToFav,
  getPublicBooks,
} from './actions/book';
const bookSlice = createSlice({
  name: 'book',
  initialState: {
    allBooks: [],
    currentBook: null,
    publicBooks: [],
    error: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        addBook.pending,
        getBooks.pending,
        getBookById.pending,
        updateBook.pending,
        deleteBook.pending,
        addBookToFav.pending,
        getPublicBooks.pending,
      ),
      (state, { payload }) => ({ ...state, loading: true, error: null }),
    );
    builder.addMatcher(
      isAnyOf(
        addBook.fulfilled,
        getBooks.fulfilled,
        getBookById.fulfilled,
        updateBook.fulfilled,
        deleteBook.fulfilled,
        addBookToFav.fulfilled,
        getPublicBooks.fulfilled,
        setCurrentBook.fulfilled,
      ),
      (state, { type, payload }) => {
        switch (type) {
          case 'books/public/fulfilled':
            return { ...state, loading: false, success: true, publicBooks: payload };
          case 'books/get-all/fulfilled':
            return {
              ...state,
              loading: false,
              success: true,
              allBooks: [...state.allBooks, ...payload],
            };
          case 'books/get-by-id/fulfilled':
            return { ...state, loading: false, success: true, currentBook: payload };
          case 'books/set-current-book/fulfilled':
            return { ...state, loading: false, success: true, currentBook: null };
          case 'books/delete/fulfilled':
            return {
              ...state,
              loading: false,
              success: true,
              allBooks: state.allBooks.filter(book => book._id !== payload._id),
            };
          case 'books/update/fulfilled':
            const newBooks = state.allBooks.map(book => {
              if (book._id === payload._id) {
                return payload;
              } else {
                return book;
              }
            });
            return { ...state, loading: false, success: true, allBooks: newBooks };
          case 'books/fav/fulfilled':
            return { ...state, loading: false, success: true };
          default:
            return state;
        }
      },
    );
    builder.addMatcher(
      isAnyOf(
        addBook.rejected,
        getBooks.rejected,
        getBookById.rejected,
        updateBook.rejected,
        deleteBook.rejected,
        addBookToFav.rejected,
        getPublicBooks.rejected,
      ),
      (state, { payload }) => {
        if (payload) {
          state = { ...state, error: { message: payload.message, errors: payload.errors } };
        }
        return {
          ...state,
          loading: false,
          success: false,
        };
      },
    );
  },
});

export default bookSlice.reducer;
