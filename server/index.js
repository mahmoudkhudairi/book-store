require('dotenv/config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const dbConnection = require('./configs/mongoose.configs');
const booksRoutes = require('./routes/book');
const commentsRoutes = require('./routes/comment');
const usersRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');
const path = require('path');
const swaggerDocs = require('./docs/swagger');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/books', booksRoutes);
app.use('/api/books', commentsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
app.use(authRoutes);
app.use(errorHandler);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
dbConnection
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => {
    console.log(`db connection error`, err);
  });
