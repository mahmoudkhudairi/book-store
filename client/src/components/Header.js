import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import { logout } from '../redux/actions/user';

import { useDispatch, useSelector } from 'react-redux';
import ThemeSwitcher from './ThemeSwitcher';
import { getLoggedInUser } from '../redux/actions/user';
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state.user;
  });
  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    navbarOpen && setNavbarOpen(!navbarOpen);
    navigate('/');
  };
  const activeLinkClass =
    'px-3 py-2 flex self-center text-xs uppercase font-extrabold md:font-bold leading-snug md:relative md:after:absolute md:after:w-[70%] md:after:rounded-lg md:after:h-[4px] md:after:bottom-[-10%] md:after:left-[15%] md:after:content-[""] md:after:bg-white';
  const linkClass =
    'px-3 py-2 flex self-center text-xs uppercase font-bold leading-snug text-catalina-blue-100 hover:opacity-75';
  return (
    <header className="sticky top-0 z-10 mb-10">
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-catalina-blue-500 dark:bg-catalina-blue-600 mb-3 text-white">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-catalina-blue-100 hover:opacity-75"
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
            className={
              'md:flex flex-grow items-center justify-center ' + (navbarOpen ? 'flex' : 'hidden')
            }
          >
            <ul className="flex flex-col items-center md:flex-row list-none md:ml-auto">
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
                  to={'/'}
                  onClick={() => navbarOpen && setNavbarOpen(!navbarOpen)}
                >
                  Public Books
                </NavLink>
              </li>
              {state.user && (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
                      to={'/books/'}
                      onClick={() => navbarOpen && setNavbarOpen(!navbarOpen)}
                    >
                      Users Books
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
                      to={'/books/new'}
                      onClick={() => navbarOpen && setNavbarOpen(!navbarOpen)}
                    >
                      Add a New Book
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <div className="md:hidden">
                  <ThemeSwitcher isPhone={true} />
                </div>
                <div className="hidden md:block">
                  <ThemeSwitcher isPhone={false} />
                </div>
              </li>

              <li>
                {state.user ? (
                  <div className="flex flex-col md:flex-row list-none md:ml-auto">
                    <span className="md:hidden">
                      <NavLink
                        className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
                        to={`/profile/${state.user.name?.replace(/\s+/g, '-')}`}
                        onClick={() => navbarOpen && setNavbarOpen(!navbarOpen)}
                      >
                        Profile
                      </NavLink>
                    </span>
                    <span className="hidden md:block">
                      <Avatar
                        name={state?.user?.name}
                        round={true}
                        size={35}
                        src=""
                        className=" mx-1 text-xs font-bold leading-snug hover:cursor-pointer hover:opacity-75  mt-1 sm:mt-0 text-catalina-blue-100"
                        onClick={() => {
                          navigate(`/profile/${state.user.name?.replace(/\s+/g, '-')}`);
                          navbarOpen && setNavbarOpen(!navbarOpen);
                        }}
                      />
                    </span>
                    <button className={linkClass} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row list-none md:ml-auto">
                    <NavLink
                      className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
                      to={'/login'}
                      onClick={() => navbarOpen && setNavbarOpen(!navbarOpen)}
                    >
                      Login
                    </NavLink>
                    <span className="text-white text-xs hidden items-center md:flex"> | </span>
                    <NavLink
                      className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
                      onClick={() => navbarOpen && setNavbarOpen(!navbarOpen)}
                      to={'/register'}
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
