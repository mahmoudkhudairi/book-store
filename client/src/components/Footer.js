import React from 'react';

function Footer() {
  return (
    <footer className="absolute min-h-[70px] p-3 sm:p-4 sm:h-[50px] bottom-0 flex flex-col sm:flex-row items-center sm:justify-between w-full shadow bg-catalina-blue-500 dark:bg-catalina-blue-600 text-white">
      <span className="text-sm  sm:text-center ">
        © 2022{' '}
        <a href="https://www.linkedin.com/in/mahmoudkhudairi/" className="font-bold underline">
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
