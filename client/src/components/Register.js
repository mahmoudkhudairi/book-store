import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [user, SET_USER] = useState({
    username: '',
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
        console.log(res.data);
        // setIsLoggedin(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" value={user.email} onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        id="password"
        value={user.password}
        onChange={handleChange}
      />
      <label htmlFor="confirm-password">ConfirmPassword</label>
      <input
        type="text"
        name="confirmPassword"
        id="confirm-password"
        value={user.confirmPassword}
        onChange={handleChange}
      />
      <button>Register</button>
    </form>
  );
}

export default Register;
