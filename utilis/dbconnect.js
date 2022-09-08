const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("tools");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
/* mongobd server connect end */

/* mongoose server connect */
/* const mongoose = require("mongoose");

module.exports.main = async function () {
  return await mongoose.connect("mongodb://localhost:27017/tools");
}; */
/* mongoose server connect end*/
