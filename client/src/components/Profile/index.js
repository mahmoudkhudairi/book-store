import { useEffect, useState } from 'react';
import { useBooksContext } from '../../context';
import UserInfo from './UserInfo';
import Book from '../Book';
import { useParams, Link } from 'react-router-dom';
import Placeholder from '../Placeholder';
function Profile() {
  const { username } = useParams();
  const { getProfile } = useBooksContext();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    getProfile(username).then((data) => {
      setUserInfo(data);
    });
  }, []);
  if (userInfo) {
    return (
      <>
        <UserInfo userInfo={userInfo} username={username} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-14">
          <div className="rounded-lg shadow-xl dark:bg-slate-800 bg-catalina-blue-500 p-8 text-center text-white ">
            <h2 className="mb-8 font-bold">Added Books</h2>
            <div className="flex flex-col items-center justify-center md:flex-row gap-8 md:flex-wrap">
              {userInfo.books.length > 0 ? (
                userInfo.books.map((book) => <Book book={book} key={book._id} />)
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
                userInfo.favoriteBooks.map((book) => <Book book={book} key={book._id} />)
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
