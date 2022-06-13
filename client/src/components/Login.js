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
    <>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign In</button>
      </form>
    </>
  );
}

export default Login;
