import React, { useEffect, useReducer, createContext, useContext } from 'react';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
export const Context = createContext(null);
const initialState = { user: null, books: [], token: null };

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
    const userToken = cookie.load('userToken');
    const user = userToken && jwtDecode(userToken);
    dispatch({ type: 'SET_USER', payload: { user, token: userToken } });
    console.log('TOKEN', userToken);
  }, []);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}

export default ContextProvider;

export const useBooksContext = () => {
  return useContext(Context);
};
