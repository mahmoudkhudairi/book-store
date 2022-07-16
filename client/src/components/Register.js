import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../context';
function Register() {
  const navigate = useNavigate();
  const { register } = useBooksContext();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(user)
      .then(() => navigate('/'))
      .catch((err) => {
        setErrors(err);
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
          required
        />
        {errors.name && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">{errors.name.message}</span>
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
          className="border border-gray-300  text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
          placeholder="john@domain.com"
          required
        />
        {errors.email && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">{errors.email.message}</span>
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
          required
        />
        {errors.password && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {errors.password.message}
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
          required
        />
        {errors.confirmPassword && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {errors.confirmPassword.message}
          </span>
        )}
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
