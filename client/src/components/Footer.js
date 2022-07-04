import React from 'react';

function Footer() {
  return (
    <footer className="sm:sticky flex flex-col sm:flex-row items-center sm:justify-between w-screen bottom-0 p-4 mt-5 bg-white shadow dark:bg-gray-800 text-black dark:text-white">
      <span className="text-sm  sm:text-center ">
        © 2022{' '}
        <a
          href="https://www.linkedin.com/in/mahmoudkhudairi/"
          className="text-teal-500  hover:underline"
        >
          Mahmoud Khudairi
        </a>{' '}
        All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>

        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
