import React from 'react';

const TableHeader = ({ dashboardData }) => {
  const columns = [
    'title',
    'authors',
    'publisher',
    'description',
    'imageUrl',
    'createdBy',
    'status',
    'createdAt',
    'updatedAt',
  ];
  if (dashboardData) {
    return (
      <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              scope="col"
              className="px-2 py-3  text-center text-xs font-medium text-gray-800 dark:text-white uppercase tracking-wider"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
};

export default TableHeader;
