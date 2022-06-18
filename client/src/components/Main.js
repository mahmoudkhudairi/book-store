import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';
import AddBook from './AddBook';
import BookDetails from './BookDetails';
import UpdateBook from './UpdateBook';
import ProtectedRoute from './ProtectedRoute';
function Main() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Home />} path="/" />
      <Route element={<Feed />} path="/feed" />
      <Route element={<Profile />} path="/profile/:username" />
      <Route element={<AddBook />} path="/new" />
      <Route element={<ProtectedRoute />} path="/book">
        <Route path=":id" element={<BookDetails />} />
      </Route>
      <Route element={<UpdateBook />} path="/book/edit/:id" />
    </Routes>
  );
}

export default Main;
