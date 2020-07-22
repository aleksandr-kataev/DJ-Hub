const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(express.json());

//DB con
mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.error(err);
  });

const port = process.env.PORT || 5000;

//Routes
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/users', require('./routes/api/auth'));

app.listen(port, () => console.log(`Started on ${port}`));
