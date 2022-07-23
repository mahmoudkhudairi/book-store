require('dotenv/config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./configs/mongoose.configs');
const BooksRoutes = require('./routes/book');
const UsersRoutes = require('./routes/user');
const AuthRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/books', BooksRoutes);
app.use('/api/users', UsersRoutes);
app.use(AuthRoutes);
app.use(errorHandler);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
dbConnection
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(`db connection error`, err);
  });
