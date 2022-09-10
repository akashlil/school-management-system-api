const { ObjectId } = require("mongodb");
const {
  getUserService,
  saveUserService,
} = require("../services/user.services");

const { getDb } = require("../utilis/dbconnect");

module.exports = {
  /* mongooes query user get and save */
  getUser: async function (req, res, next) {
    try {
      /* id find user only*/
      const { id } = req.query;
      if (id) {
        const userData = await getUserService(id);
        return res.json(userData);
      }
      /* id find user only end*/

      const userData = await getUserService(); //mongooes
      res.json(userData);
    } catch (error) {
      console.log(error);
    }
  },

  savaUser: async function (req, res) {
    try {
      const data = req.body;
      const result = await saveUserService(data);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },
  /* mongooes query user get and save end*/

  /* mongodb query system upadate and delete */
  updataeUser: async function (req, res) {
    try {
      const data = req.body;
      const { id } = req.params;
      const db = getDb();

      if (!ObjectId.isValid(id)) {
        return res.json({ massage: "your updated id not valid" });
      }
      const updataed = await db
        .collection("users")
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

  /* mongodb query system upadate and delete end*/
};
