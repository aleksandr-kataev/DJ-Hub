const express = require('express');
const mongoose = require('mongoose');
const DB_CONN = require('./config').DB_CONN;

const app = express();

//MiddleWare
app.use(express.json());

//DB con
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_CONN, dbOptions);
    console.log('DB connected');
  } catch (err) {
    console.error(err);
  }
};

dbConnect();

//Routes
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

module.exports = app;
