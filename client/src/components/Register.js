import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../context';
function Register() {
  const navigate = useNavigate();
  const { state, dispatch } = useBooksContext();
  const [user, SET_USER] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    SET_USER({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/register', user, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: 'SET_USER', payload: { user: res.data.user } });
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
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
          className="border border-gray-300  text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
          placeholder="John Doe"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Enter Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          className="border border-gray-300  text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
          placeholder="john@domain.com"
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
          id="password"
          value={user.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          ConfirmPassword
        </label>
        <input
          type="text"
          name="confirmPassword"
          id="confirm-password"
          value={user.confirmPassword}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-teal-500 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm w-full  px-5 py-2.5 text-center "
      >
        Register
      </button>
    </form>
  );
}

export default Register;
