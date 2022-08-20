import { useRef, useState, useEffect } from 'react';
import { getAdminDashboard } from '../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
const Pagination = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state.admin;
  });

  let [pages, setPages] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [showingFrom, setShowingFrom] = useState(1);
  const [showingTo, setShowingTo] = useState(booksPerPage);
  const prevBooksPerPageRef = useRef();
  useEffect(() => {
    if (state.dashboardData?.booksCount) {
      setPages(Math.ceil(state.dashboardData.booksCount / booksPerPage));
      handlePageClick(currentPage);
    }
  }, [state.dashboardData]);
  useEffect(() => {
    if (prevBooksPerPageRef.current !== booksPerPage) {
      dispatch(getAdminDashboard({ page: 0, booksPerPage }));
      setCurrentPage(0);
      prevBooksPerPageRef.current = booksPerPage;
    } else {
      dispatch(getAdminDashboard({ page: currentPage, booksPerPage }));
    }
  }, [currentPage, booksPerPage]);

  const handlePageClick = i => {
    if (currentPage > i) {
      setShowingTo(() => {
        const newTo = (i + 1) * booksPerPage;
        setShowingFrom(newTo + 1 - booksPerPage);
        return newTo;
      });
    } else {
      setShowingFrom(() => {
        const newTo = (i + 1) * booksPerPage;
        setShowingTo(
          newTo > state.dashboardData.booksCount ? state.dashboardData.booksCount : newTo,
        );
        return newTo + 1 - booksPerPage;
      });
    }
    setCurrentPage(i);
  };
  const handleNext = () => {
    if (currentPage < pages - 1) {
      setShowingFrom(showingTo + 1);
      const newTo = showingTo + booksPerPage;
      setShowingTo(newTo > state.dashboardData.booksCount ? state.dashboardData.booksCount : newTo);
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 0) {
      setShowingFrom(showingFrom - booksPerPage);
      setShowingTo(showingFrom - 1);
      setCurrentPage(currentPage - 1);
    }
  };
  if (state.dashboardData) {
    return (
      <nav className="flex justify-between items-center pt-2" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-900 dark:text-gray-200">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white">
            {' '}
            {showingFrom}-{showingTo}{' '}
          </span>
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {state.dashboardData?.booksCount}
          </span>
        </span>
        <div>
          <span className="text-gray-800 dark:text-gray-200">Books per page: </span>
          <select
            className="py-2 px-3 leading-tight text-catalina-blue-600 bg-catalina-blue-100 border border-catalina-blue-300 hover:bg-blue-100 hover:text-catalina-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            name="booksPerPage"
            defaultValue={booksPerPage}
            onChange={e => setBooksPerPage(e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div className="flex bg-white rounded-lg font-[Poppins]">
          <button
            onClick={handlePrev}
            className="z-10 py-2 px-3 leading-tight text-catalina-blue-600 bg-catalina-blue-100 border border-catalina-blue-300 hover:bg-blue-100 hover:text-catalina-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>

          {[...Array(pages)].map((p, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`h-12 border-2 border-r-0 border-catalina-blue-400 w-12 ${
                currentPage === i
                  ? 'bg-catalina-blue-500 dark:bg-catalina-blue-600 text-white border-none'
                  : 'bg-gray-100 dark:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            className="py-2 px-3 leading-tight text-catalina-blue-600 bg-catalina-blue-100 border border-catalina-blue-300 hover:bg-blue-100 hover:text-catalina-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    );
  }
};

export default Pagination;
