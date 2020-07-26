const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { DB_CONN } = require('./config');

const mongod = new MongoMemoryServer();

module.exports.devConnect = async () => {
  try {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    await mongoose.connect(DB_CONN, dbOptions);
    console.log('DB connected');
  } catch (err) {
    console.error(err);
  }
};

module.exports.testConnect = async () => {
  const uri = await mongod.getConnectionString();

  const dbOptions = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, dbOptions);
  console.log('Connected to test DB');
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
