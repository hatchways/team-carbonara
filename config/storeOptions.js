const mongoose = require('mongoose');

//create new connection for session store
const connection = mongoose.createConnection(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = storeOptions = {
  mongooseConnection: connection,
  //automatically remove after 3 hours
  ttl: 3 * 60 * 60,
};
