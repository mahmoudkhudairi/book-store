import React, { useEffect, useReducer, createContext, useContext } from 'react';
import axios from 'axios';
export const Context = createContext(null);
const initialState = { user: 'pre-fetch', books: [] };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'GET_BOOKS':
      return { ...state, books: action.payload };
    case 'DELETE_BOOK':
      return { ...state, books: state.books.filter((book) => book._id !== action.payload) };
    case 'ADD_BOOK':
      return { ...state, books: [action.payload, ...state.books] };
    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
}

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios
      .get('/api/users/user-info')
      .then((res) => {
        dispatch({ type: 'SET_USER', payload: { user: res.data } });
      })
      .catch((err) => {
        dispatch({ type: 'SET_USER', payload: { user: null } });
      });
  }, []);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}

export default ContextProvider;

export const useBooksContext = () => {
  return useContext(Context);
};
