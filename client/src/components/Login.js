import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';
function Login() {
  const { state, dispatch } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    axios
      .post(
        '/login',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data.user);
        dispatch({ type: 'SET_USER', payload: { user: res.data.user } });
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <form className="container mx-auto px-10 max-w-md" onSubmit={login}>
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
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300  text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
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
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-teal-500 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm w-full  px-5 py-2.5 text-center "
      >
        Submit
      </button>
    </form>
  );
}

export default Login;
