require('dotenv/config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./configs/mongoose.configs');
const BooksRoutes = require('./routes/book');
const UsersRoutes = require('./routes/user');
const AuthRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use('/api/books', BooksRoutes);
app.use('/api/users', UsersRoutes);
app.use(AuthRoutes);
app.use(errorHandler);
dbConnection
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(`db connection error`, err);
  });
