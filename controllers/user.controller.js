const { getDb } = require("../utilis/dbconnect");

module.exports = {
  getUser: async function (req, res, next) {
    try {
      const db = await getDb();
      const userData = await db.collection("user").find().toArray();
      res.json(userData);
    } catch (error) {
      console.log(error);
    }
  },

  savaUser: async function (req, res) {
    const data = req.body;
    const db = await getDb();
    const userSave = await db.collection("user").insertOne(data);
    res.send(data);
  },
};
