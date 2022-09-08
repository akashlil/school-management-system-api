const { ObjectId } = require("mongodb");
// const { userPostModel } = require("../model/userPost");
const { getDb } = require("../utilis/dbconnect");

module.exports = {
  getUser: async function (req, res, next) {
    try {
      const { id } = req.query;
      const db = await getDb();
      /* id find user only */
      if (id) {
        const userData = await db
          .collection("user")
          .find({ _id: ObjectId(id) })
          .toArray();
        return res.json(userData);
      }
      /* id find user only end*/

      const userData = await db.collection("user").find().toArray();
      /*  const userData = await userPostModel.find(); */
      res.json(userData);
    } catch (error) {
      console.log(error);
    }
  },

  savaUser: async function (req, res) {
    try {
      const data = req.body;
      const db = await getDb();
      const userSave = await db.collection("user").insertOne(data);
      /*               await userPostModel.create(data); */
      res.json(data);
    } catch (userSave) {
      console.log(error);
    }
  },

  updataeUser: async function (req, res) {
    try {
      const data = req.body;
      const { id } = req.params;
      const db = getDb();

      if (!ObjectId.isValid(id)) {
        return res.json({ massage: "your updated id not valid" });
      }
      const updataed = await db
        .collection("user")
        .updateOne({ _id: ObjectId(id) }, { $set: data });
      if (!updataed.modifiedCount) {
        return res
          .status(400)
          .json({ massage: "your user not update and id not found" });
      }

      res.json({ massage: "successfully upadte", updataed });
    } catch (error) {}
  },

  deleteUser: async function (req, res) {
    const { id } = req.params;
    const db = getDb();
    const deleteMsa = db.collection("user").deleteOne({ _id: ObjectId(id) });
    if (!deleteMsa.deletedCount) {
      return res.status(400).json({ massage: "user not delete" });
    }
    res.json({ massage: "user delete successsfully", deleteMsa });
  },
};
