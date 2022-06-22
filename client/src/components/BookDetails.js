import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context';

function BookDetails() {
  const { state, dispatch } = useContext(Context);
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const book = state.books.find((book) => book._id === id);
    if (state.books && book) {
      setBook(book);
    } else {
      axios
        .get(`/api/books/${id}`)
        .then((res) => {
          setBook(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const deleteBook = () => {
    axios
      .delete(`/api/books/${id}`)
      .then((res) => {
        dispatch({ type: 'DELETE_BOOK', payload: id });
        navigate('/');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>{book.title}</h2>
      <p>authors:</p>
      <p>{book.authors && book.authors.join(',')}</p>
      <p>Publisher: {book.publisher}</p>
      <img src={book.imageUrl} alt="" />
      <p>PublishedDate: {book.publishedDate}</p>
      <p>Description: {book.description}</p>
      <button onClick={deleteBook}>Delete</button>
    </div>
  );
}

export default BookDetails;
