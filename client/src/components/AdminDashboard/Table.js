import { useEffect } from 'react';
import Pagination from './Pagination';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import { useBooksContext } from '../../context';
const Table = () => {
  const {
    state: { dashboardData },
  } = useBooksContext();
  useEffect(() => {
    console.log('DAT', dashboardData);
  }, [dashboardData]);
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow border-gray-200 sm:rounded-lg max-h-[75vh] overflow-y-auto scrollbar dark:scrollbar-thumb-gray-700 scrollbar-thumb-gray-200 scrollbar-track-gray-300 dark:scrollbar-track-gray-800">
          <table className="w-full divide-y divide-gray-200 scrollbar">
            <TableHeader dashboardData={dashboardData} />
            <TableBody />
          </table>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Table;
