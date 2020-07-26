const express = require('express');
const dbHandler = require('./db_handler');

const app = express();

// MiddleWare
app.use(express.json());

if (process.env.NODE_ENV === 'test') {
  dbHandler.testConnect();
} else {
  dbHandler.devConnect();
}

// Routes
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/user', require('./routes/api/user'));

module.exports = app;
