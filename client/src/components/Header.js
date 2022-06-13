import { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context';
function Header() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    console.log('STATE', state);
  }, [state]);
  const handleLogout = () => {
    axios
      .post(
        '/logout',
        {},
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log('logged out');
        dispatch({ type: 'LOGOUT' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="header">
      <h1>Book Store</h1>
      <NavLink className="nav-link" to={'/'}>
        Home
      </NavLink>
      <span> | </span>
      <NavLink className="nav-link" to={'/new'}>
        Add a New Book
      </NavLink>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {state.user ? (
          <div>
            <p>Hello: {state.user.name}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <NavLink className="nav-link" to={'/login'}>
              Login
            </NavLink>
            <span> | </span>
            <NavLink className="nav-link" to={'/register'}>
              Register
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
