import { useEffect, useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Context } from '../context';
function Header() {
  const { state, dispatch } = useContext(Context);
  const [navbarOpen, setNavbarOpen] = useState(false);
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
    <header>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/"
            >
              Book Store
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div
            className={'md:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col md:flex-row list-none md:ml-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? ' px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-purple-600 hover:opacity-75'
                      : ' px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  }
                  to={'/books/'}
                >
                  Browse Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? ' px-3 py-2 flex items-center text-xs uppercase font-extrabold leading-snug text-purple-600 hover:opacity-75'
                      : ' px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  }
                  to={'/books/new'}
                >
                  Add a New Book
                </NavLink>
              </li>

              <li className="nav-item">
                {state.user ? (
                  <div className="flex flex-col md:flex-row list-none md:ml-auto">
                    <p className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                      Hello: {state.user.name}
                    </p>
                    <button
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row list-none md:ml-auto">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? ' px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-purple-600 hover:opacity-75'
                          : ' px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                      }
                      to={'/login'}
                    >
                      Login
                    </NavLink>
                    <span className="text-white text-xs hidden items-center md:flex"> | </span>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? ' px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-purple-600 hover:opacity-75'
                          : ' px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                      }
                      to={'/register'}
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </li>
              <li className="nav-item"></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
