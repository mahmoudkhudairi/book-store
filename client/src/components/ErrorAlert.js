import React from 'react';

const ErrorAlert = ({ message }) => {
  return (
    <div
      className="p-4 mb-10 mx-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span className="font-medium">Error!</span> {message}
    </div>
  );
};

export default ErrorAlert;
