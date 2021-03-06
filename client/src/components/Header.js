import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import { useBooksContext } from '../context';
import ThemeSwitcher from './ThemeSwitcher';
function Header() {
  const navigate = useNavigate();
  const { state, logout } = useBooksContext();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleLogout = () => {
    logout().then(() => navigate('/'));
  };

  if (state.user !== 'pre-fetch') {
    return (
      <header className="sticky top-0 z-10 mb-10">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-500 dark:bg-teal-800 mb-3">
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

            <div className={'md:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}>
              <ul className="flex flex-col md:flex-row list-none md:ml-auto">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? ' px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-blue-600 dark:text-blue-400 hover:opacity-75'
                        : ' px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                    }
                    to={'/'}
                  >
                    Public Books
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? ' px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-blue-600 dark:text-blue-400 hover:opacity-75'
                        : ' px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                    }
                    to={'/books/'}
                  >
                    Users Books
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? ' px-3 py-2 flex items-center text-xs uppercase font-extrabold leading-snug text-blue-600 dark:text-blue-400 hover:opacity-75'
                        : ' px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                    }
                    to={'/books/new'}
                  >
                    Add a New Book
                  </NavLink>
                </li>
                <li>
                  <ThemeSwitcher />
                </li>

                <li className="nav-item">
                  {state.user === 'not-loggedin' ? (
                    <div className="flex flex-col md:flex-row list-none md:ml-auto">
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? ' px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-blue-600 dark:text-blue-400 hover:opacity-75'
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
                            ? ' px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-blue-600 dark:text-blue-400 hover:opacity-75'
                            : ' px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                        }
                        to={'/register'}
                      >
                        Register
                      </NavLink>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row list-none md:ml-auto">
                      <Avatar
                        name={state.user.name}
                        round={true}
                        size={35}
                        src=""
                        className=" mx-1 text-xs font-bold leading-snug hover:cursor-pointer hover:opacity-75  mt-1 sm:mt-0 "
                        onClick={() => navigate(`/profile/${state.user.name.replace(/\s+/g, '-')}`)}
                      />
                      <button
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
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
}

export default Header;
