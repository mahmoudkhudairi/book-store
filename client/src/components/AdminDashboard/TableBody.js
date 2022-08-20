import React from 'react';
import { updateAdminBookStatus } from '../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
const TableBody = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state.admin;
  });
  const statusList = ['APPROVED', 'DECLINED', 'PENDING'];
  const dropdownStyle = {
    APPROVED: 'bg-green-400 dark:bg-green-500 dark:text-white focus:outline-green-500',
    DECLINED: 'bg-red-600 text-white  dark:bg-red-500 dark:text-white focus:outline-red-500',
    PENDING: 'bg-yellow-400 dark:bg-yellow-500 dark:text-white focus:outline-yellow-500',
  };

  const handleStatusChange = (bookId, newStatus) => {
    dispatch(updateAdminBookStatus({ bookId, status: newStatus }));
  };
  return (
    <tbody className="bg-gray-300 divide-y text-center divide-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {state.dashboardData?.books.map(book => (
        <tr key={book._id}>
          <td className="px-2 py-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white break-words w-40">
              {book.title}
            </p>
          </td>
          <td className="px-2 py-4">
            <ul className="text-sm text-gray-800 dark:text-gray-100">
              {book.authors.map(author => (
                <li key={author}>{author}</li>
              ))}
            </ul>
          </td>
          <td className="px-2 py-4">
            <div className="text-sm text-gray-800 dark:text-gray-100">{book.publisher}</div>
          </td>
          <td className="px-2 py-4 ">
            <p className="text-sm text-gray-800 dark:text-gray-100 break-words w-40">
              {book.description}
            </p>
          </td>
          <td className="px-2 py-4">
            <img className="h-10 w-10 md:h-20 md:w-20 rounded" src={book.imageUrl} alt="" />
          </td>
          <td className="px-2 py-4 text-sm text-gray-900 dark:text-white">{book.createdBy.name}</td>
          <td className="px-2 py-4">
            <select
              value={book.status}
              className={`p-2 text-xs text-center
    font-semibold rounded-md ${dropdownStyle[book.status]}`}
              onChange={e => handleStatusChange(book._id, e.target.value)}
            >
              {statusList.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </td>
          <td className="px-2 py-4 text-sm text-gray-800 dark:text-gray-100">
            {new Date(book.createdAt).toDateString()}
          </td>
          <td className="px-2 py-4 text-sm text-gray-800 dark:text-gray-100">
            {new Date(book.updatedAt).toDateString()}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
