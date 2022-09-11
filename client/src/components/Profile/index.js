import { useEffect, useState } from 'react';
import { getProfile } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from './UserInfo';
import Book from '../Book';
import { useParams } from 'react-router-dom';
import Placeholder from '../Placeholder';
function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state.user;
  });
  useEffect(() => {
    dispatch(getProfile(username));
  }, []);
  useEffect(() => {
    setUserInfo(state.profile);
  }, [state.profile]);

  if (userInfo) {
    return (
      <>
        <UserInfo userInfo={userInfo} username={username} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-14">
          <div className="rounded-lg shadow-xl dark:bg-slate-800 bg-catalina-blue-500 p-8 text-center text-white">
            <h2 className="mb-8 font-bold">Added Books</h2>
            <div className="flex flex-col items-center justify-center md:flex-row gap-8 md:flex-wrap">
              {userInfo.books.length > 0 ? (
                userInfo.books.map(book => (
                  <div key={book._id} className="max-w-[285px]">
                    <Book book={book} />
                  </div>
                ))
              ) : (
                <Placeholder
                  text="No books added yet :("
                  buttonText="Add one Now"
                  link="/books/new"
                />
              )}
            </div>
          </div>

          <div className="rounded-lg shadow-xl dark:bg-slate-800 bg-catalina-blue-500 p-8 text-center text-white ">
            <h2 className="mb-8 font-bold">Favorite Books</h2>
            <div className="flex flex-col items-center justify-center md:flex-row gap-8 md:flex-wrap">
              {userInfo.favoriteBooks.length > 0 ? (
                userInfo.favoriteBooks.map(book => (
                  <div key={book._id} className="max-w-[285px]">
                    <Book book={book} />
                  </div>
                ))
              ) : (
                <Placeholder
                  text="No books added to the Favorite yet :("
                  buttonText="Browse Books"
                  link="/books"
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
