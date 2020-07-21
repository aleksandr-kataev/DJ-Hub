const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

mongoose
  .connect(process.env.DB_CONN)
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.error(err);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Started on ${port}`));
