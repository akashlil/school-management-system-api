const User = require("../model/User");

module.exports.getUserService = async (id) => {
  if (id) {
    const result = await User.findById(`${id}`);
    return result;
  }
  const result = await User.find({});
  return result;
};

module.exports.saveUserService = async (data) => {
  const result = await User.create(data);
  return result;
};
