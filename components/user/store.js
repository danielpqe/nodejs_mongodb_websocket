const Model = require("./model");

//const list = [];

const addUser = (user) => {
  // list.push(user);
  const myUser = new Model(user);
  return myUser.save(); // Promise
};

const getUsers = async (filterUser) => {
  let filter = {};
  if (filterUser !== null) {
    filter = { name: filterUser };
  }
  const users = await Model.find(filter); // Return a promise

  return users;
};

const updateUser = async (id, text) => {
  const user = await Model.findByIdAndUpdate(id, { user: text });
  return user;
};

const deleteUser = async (id) => {
  const user = await Model.deleteOne({ _id: id });
  return user;
};

module.exports = {
  add: addUser,
  list: getUsers,
  update: updateUser,
  delete: deleteUser,
  //get
  //delete
  //update
};
