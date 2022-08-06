import React from 'react';
import { Link } from 'react-router-dom';
const Placeholder = ({ text, buttonText, link }) => {
  return (
    <div className="text-center bg-gray-200 dark:bg-slate-600 grid-col-1 p-8  dark:text-white text-black mx-10 md:w-[50%] md:mx-auto rounded-xl relative">
      {text}
      <Link
        className="block mt-2 text-catalina-blue-500 dark:text-catalina-blue-600 font-bold hover:underline"
        to={link}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default Placeholder;
