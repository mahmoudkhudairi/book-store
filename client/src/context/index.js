import React, { useState } from 'react';

export const Context = React.createContext();

function ContextProvider(props) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  return <Context.Provider value={{ user, books }}>{props.children}</Context.Provider>;
}

export default ContextProvider;
