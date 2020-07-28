const express = require('express');
const path = require('path');
const dbHandler = require('./db_handler');

const publicPath = path.join(__dirname, './client/build');

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

// Serve assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

module.exports = app;
