import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state.user;
  });
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (state.user) {
      navigate('/');
    }
  }, [state.user]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(user));
  };

  return (
    <form className="container mx-auto px-10 max-w-md" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleChange}
          className="border border-gray-300  text-sm rounded-lg focus:ring-catalina-blue-500 focus:border-catalina-blue-500 block w-full p-2.5 "
          placeholder="John Doe"
          required
        />
        {state.error?.errors?.name && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {state.error?.errors?.name.message}
          </span>
        )}
      </div>
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
          value={user.email}
          onChange={handleChange}
          className="border border-gray-300  text-sm rounded-lg focus:ring-catalina-blue-500 focus:border-catalina-blue-500 block w-full p-2.5"
          placeholder="john@domain.com"
          required
        />
        {state.error?.errors?.email && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {state.error?.errors?.email.message}
          </span>
        )}
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
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-catalina-blue-500 focus:border-catalina-blue-500 block w-full p-2.5"
          required
          autoComplete="on"
        />
        {state.error?.errors?.password && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {state.error?.errors?.password.message}
          </span>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password"
          value={user.confirmPassword}
          onChange={handleChange}
          placeholder="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-catalina-blue-500 focus:border-catalina-blue-500 block w-full p-2.5"
          required
          autoComplete="on"
        />
        {state.error?.errors?.confirmPassword && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {state.error?.errors?.confirmPassword.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="text-white bg-catalina-blue-500 hover:bg-catalina-blue-500 focus:ring-4 focus:outline-none focus:ring-catalina-blue-500 font-medium rounded-full text-sm w-full  px-5 py-2.5 text-center"
      >
        Register
      </button>
      <span className="block text-center mt-6 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Already have an Account?{' '}
        <Link to="/login" className="text-catalina-blue-500 dark:text-catalina-blue-400">
          Login Now!
        </Link>
      </span>
    </form>
  );
}

export default Register;
