import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const destination = locationState ? locationState.destination : '/';
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state.user;
  });
  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
  };
  useEffect(() => {
    if (state.user) {
      if (state.user.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(destination, { replace: true });
      }
    }
  }, [state.user]);

  return (
    <form className="container mx-auto px-10 max-w-md" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Enter Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300  text-sm rounded-lg focus:ring-catalina-blue-600 focus:border-catalina-blue-600 block w-full p-2.5 "
          placeholder="name@domain.com"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="password"
          placeholder="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-catalina-blue-600 focus:border-catalina-blue-600 block w-full p-2.5"
          required
          autoComplete="on"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-catalina-blue-500 dark:bg-catalina-blue-600  hover:bg-catalina-blue-600 focus:ring-4 focus:outline-none focus:ring-catalina-blue-600 font-medium rounded-full text-sm w-full  px-5 py-2.5 text-center "
      >
        Login
      </button>
      <span className="block text-center mt-6 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Don't have an Account?{' '}
        <Link to="/register" className="text-catalina-blue-500 dark:text-catalina-blue-400">
          Register Now!
        </Link>
      </span>
    </form>
  );
}

export default Login;
