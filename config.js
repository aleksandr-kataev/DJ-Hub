require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB_CONN: process.env.DB_CONN,
  JWT_SECRET: process.env.JWT_SECRET,
};
