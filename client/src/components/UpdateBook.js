import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Form from './Form';
function UpdateBook() {
  const [oldBook, setOldBook] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      axios
        .get(`/api/books/${id}`)
        .then((res) => {
          setOldBook(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setOldBook(state);
    }
  }, []);
  const submitHandler = (book, setErrors) => {
    axios
      .put(`/api/books/${id}`, book)
      .then((res) => {
        navigate('/books');
      })
      .catch((err) => {
        setErrors(err.response.data.error.errors);
      });
  };
  return <Form submitHandler={submitHandler} buttonText={'Update Book'} oldBook={oldBook} />;
}

export default UpdateBook;
