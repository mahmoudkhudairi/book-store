import React, { useEffect, useReducer, createContext, useContext } from 'react';
import axios from 'axios';
export const Context = createContext({});
const initialState = {
  user: 'pre-fetch',
  books: [],
  publicBooks: [],
  dashboardData: null,
  loading: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'GET_PUBLIC_BOOKS':
      return { ...state, ...action.payload };
    case 'GET_BOOKS':
      return { ...state, ...action.payload };
    case 'DELETE_BOOK':
      return { ...state, books: state.books.filter((book) => book._id !== action.payload) };
    case 'ADD_BOOK':
      return { ...state, books: [action.payload, ...state.books] };
    case 'UPDATE_BOOK':
      return { ...state, books: action.payload };
    case 'GET_DASHBOARD':
      return { ...state, dashboardData: action.payload };
    case 'UPDATE_DASHBOARD':
      return { ...state, dashboardData: action.payload };
    case 'LOADING_START':
      return { ...state, loading: true };
    case 'LOADING_END':
      return { ...state, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...initialState, ...action.payload };

    default:
      return state;
  }
}

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: 'LOADING_START' });
    axios
      .get('/api/users/user-info')
      .then((res) => {
        dispatch({ type: 'LOADING_END' });
        dispatch({ type: 'SET_USER', payload: { user: res.data } });
      })
      .catch((err) => {
        dispatch({ type: 'LOADING_END' });
        dispatch({ type: 'SET_USER', payload: { user: 'not-loggedin' } });
      });
  }, []);
  // Async actions
  const asyncActions = {
    login: (user) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .post('/login', user, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch({ type: 'LOADING_END' });
            state.error && dispatch({ type: 'SET_ERROR', payload: null });
            dispatch({ type: 'SET_USER', payload: { user: res.data.user } });
            resolve(res.data.user.role);
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'SET_ERROR', payload: err.response.data.message });
            reject();
          });
      });
    },
    register: (user) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .post('/register', user, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'SET_USER', payload: { user: res.data.user } });
            resolve();
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            reject(err.response.data.errors);
          });
      });
    },
    logout: () => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .post(
            '/logout',
            {},
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'LOGOUT', payload: { user: 'not-loggedin' } });
            resolve();
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'SET_ERROR', payload: err });
            reject();
          });
      });
    },
    getPublicBooks: () => {
      dispatch({ type: 'LOADING_START' });
      axios
        .get('/api/books/public')
        .then((res) => {
          dispatch({ type: 'LOADING_END' });
          dispatch({ type: 'GET_PUBLIC_BOOKS', payload: { publicBooks: res.data } });
        })
        .catch((err) => {
          dispatch({ type: 'LOADING_END' });
          dispatch({ type: 'SET_ERROR', payload: `Cannot fetch Public Books` });
        });
    },
    addBook: (book) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .post('/api/books', book, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'ADD_BOOK', payload: res.data });
            resolve();
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            reject(err.response.data.errors);
          });
      });
    },
    getBooks: () => {
      dispatch({ type: 'LOADING_START' });
      axios
        .get('/api/books')
        .then((res) => {
          dispatch({ type: 'LOADING_END' });
          dispatch({ type: 'GET_BOOKS', payload: { books: res.data } });
        })
        .catch((err) => {
          dispatch({ type: 'LOADING_END' });
          dispatch({ type: 'SET_ERROR', payload: `Cannot get books` });
        });
    },
    getBookById: (id) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .get(`/api/books/${id}`)
          .then((res) => {
            dispatch({ type: 'LOADING_END' });
            !res.data && dispatch({ type: 'SET_ERROR', payload: `Cannot find book with id ${id}` });
            resolve(res.data);
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'SET_ERROR', payload: `Cannot find book with id ${id}` });
            reject();
          });
      });
    },
    updateBook: (book) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .put(`/api/books/${book._id}`, book)
          .then((res) => {
            const newBooks = state.books.map((book) => {
              if (book._id === res.data._id) {
                return res.data;
              } else {
                return book;
              }
            });
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'UPDATE_BOOK', payload: newBooks });
            resolve();
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            reject(err.response.data.errors);
          });
      });
    },
    deleteBook: (id) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .delete(`/api/books/${id}`)
          .then((res) => {
            dispatch({ type: 'DELETE_BOOK', payload: id });
            resolve();
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'SET_ERROR', payload: `Cannot delete book with id ${id}` });
            reject();
          });
      });
    },
    addBookToFav: (id, addToFav) => {
      axios.put(`/api/users/favorite/${id}`, {
        addToFav,
      });
    },
    getProfile: (username) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .get(`/api/users/profile/${username.replaceAll('-', ' ')}`)
          .then((res) => {
            dispatch({ type: 'LOADING_END' });
            resolve(res.data);
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'SET_ERROR', payload: `Cannot fetch Profile` });
          });
      });
    },
    updateProfile: (username, userInfo) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: 'LOADING_START' });
        axios
          .put(`/api/users/profile/${username.replaceAll('-', ' ')}`, userInfo)
          .then((res) => {
            dispatch({ type: 'LOADING_END' });
            resolve(res.data);
          })
          .catch((err) => {
            dispatch({ type: 'LOADING_END' });
            dispatch({ type: 'SET_ERROR', payload: `Cannot update Profile` });
          });
      });
    },
    getAdminDashboard: (page, booksPerPage) => {
      dispatch({ type: 'LOADING_START' });
      axios
        .get(`/api/admin/dashboard?page=${page}&booksPerPage=${booksPerPage}`)
        .then((res) => {
          dispatch({ type: 'GET_DASHBOARD', payload: res.data });
          dispatch({ type: 'LOADING_END' });
        })
        .catch((err) => {
          dispatch({ type: 'GET_DASHBOARD', payload: null });
          dispatch({ type: 'SET_ERROR', payload: `Cannot load dashboard` });
          dispatch({ type: 'LOADING_END' });
        });
    },
    updateAdminBookStatus: (bookId, status) => {
      dispatch({ type: 'LOADING_START' });
      axios
        .put(`/api/admin/dashboard/update-status/${bookId}`, { status })
        .then((res) => {
          dispatch({ type: 'LOADING_END' });
          const books = state.dashboardData.books.map((book) => {
            if (book._id === bookId) {
              return res.data;
            } else {
              return book;
            }
          });
          dispatch({ type: 'UPDATE_DASHBOARD', payload: { ...state.dashboardData, books } });
        })
        .catch((err) => {
          dispatch({ type: 'LOADING_END' });
          dispatch({ type: 'SET_ERROR', payload: `Cannot load dashboard` });
        });
    },
  };
  return (
    <Context.Provider value={{ state, dispatch, ...asyncActions }}>{children}</Context.Provider>
  );
}

export default ContextProvider;

export const useBooksContext = () => {
  return useContext(Context);
};
