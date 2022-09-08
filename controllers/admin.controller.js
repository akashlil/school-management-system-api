const { ObjectID, ObjectId } = require("mongodb");
const { getDb } = require("../utilis/dbconnect");

module.exports = {
  getAdmin: async (req, res) => {
    try {
      const parmisonUser = "_a";

      const db = await getDb();
      const adminData = await db
        .collection("admin")
        .find({ parmison: { $eq: parmisonUser } })
        .toArray();

      res.status(200).json({ data: adminData });
    } catch (error) {}
  },

  saveAdmin: async (req, res) => {
    try {
      const data = { ...req.body, parmison: "_n" };
      const db = await getDb();
      const adminSave = await db.collection("admin").insertOne(data);
      if (!adminSave.acknowledged) {
        return res.status(400).send("data not insert");
      }
      res.status(200).send("data  insert");
    } catch (error) {
      console.log(error);
    }
  },

  adminParmison: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const db = await getDb();
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ massage: "Id  not valid" });
      }
      const updateAdmin = await db
        .collection("admin")
        .updateOne({ _id: ObjectId(id) }, { $set: data });

      if (!updateAdmin.modifiedCount) {
        return res.status(400).json({ massage: "adin data not updated" });
      }
      res.send("admin upated");
    } catch (error) {
      console.log(error);
    }
  },

  adminDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const db = await getDb();
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ massage: "Id  not valid" });
      }

      const deleteAdmin = await db
        .collection("admin")
        .deleteOne({ _id: ObjectId(id) });
      if (!deleteAdmin.deletedCount) {
        return res.status(400).json({ massage: "admin allready not delete" });
      }

      res.json({ massage: "admin delete successsfully" });
    } catch (error) {
      console.log(error);
    }
  },
};
