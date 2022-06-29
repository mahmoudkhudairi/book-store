import { useState, useEffect } from 'react';
function Form(props) {
  const [authorInputList, setAuthorInputList] = useState(['']);
  const [book, setBook] = useState({
    title: '',
    authors: [],
    publisher: '',
    publishedDate: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (!!props.oldBook) {
      setBook(props.oldBook);
      console.log('props.oldBook.authors', props.oldBook);
      setAuthorInputList(props.oldBook.authors);
    }
  }, [props.oldBook]);

  const [errors, setErrors] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();

    props.submitHandler(book, setErrors);
  };
  const handleAuthorsInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...authorInputList];
    list[index] = value;
    setAuthorInputList(list);
    setBook({ ...book, authors: list });
  };
  const changeHandler = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageData = reader.result;
        setBook({ ...book, imageUrl: imageData });
      };
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };
  const handleRemoveClick = (index) => {
    const list = [...authorInputList];
    list.splice(index, 1);
    setAuthorInputList(list);
  };

  const handleAddClick = () => {
    setAuthorInputList([...authorInputList, '']);
  };
  return (
    <form
      onSubmit={submitHandler}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <label>Title</label>
      <input
        className="border-2 border-blue-500"
        value={book.title}
        name="title"
        onChange={changeHandler}
        type="text"
      />
      {errors.title ? <span className="text-danger">{errors.title.message}</span> : null}
      <label>Authors</label>
      {authorInputList.map((author, i) => {
        return (
          <div key={i}>
            <input
              className="border-2 border-blue-500"
              name="name"
              value={author}
              onChange={(e) => handleAuthorsInputChange(e, i)}
            />

            {authorInputList.length !== 1 && (
              <button onClick={() => handleRemoveClick(i)}>Remove</button>
            )}
            {authorInputList.length - 1 === i && i < 9 && (
              <button onClick={handleAddClick}>Add</button>
            )}
          </div>
        );
      })}
      {errors.authors ? <span>{errors.authors.message}</span> : null}

      <label>publisher</label>
      <input
        className="border-2 border-blue-500"
        value={book.publisher}
        name="publisher"
        onChange={changeHandler}
        type="text"
      />
      {errors.publisher ? <span>{errors.publisher.message}</span> : null}
      <label>publishedDate</label>
      <input
        className="border-2 border-blue-500"
        value={book.publishedDate}
        name="publishedDate"
        onChange={changeHandler}
        type="date"
      />
      {errors.publishedDate ? <span>{errors.publishedDate.message}</span> : null}
      <label>description</label>
      <input
        className="border-2 border-blue-500"
        value={book.description}
        name="description"
        onChange={changeHandler}
        type="text"
      />
      {errors.description ? <span>{errors.description.message}</span> : null}
      <label>image</label>
      {book.imageUrl && <img src={book.imageUrl} alt="" />}
      <input type="file" name="image" onChange={changeHandler} accept="image/*" />
      {errors.imageUrl ? <span>{errors.imageUrl.message}</span> : null}
      <button>{props.buttonText}</button>
    </form>
  );
}

export default Form;
