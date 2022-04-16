const Model = require("./model");

//const list = [];

const addMessage = (message) => {
  // list.push(message);
  const myMessage = new Model(message);
  console.log(myMessage);
  myMessage.save();
};

const getMessages = (filterUser) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterUser !== null) {
      filter = { user: new RegExp(filterUser, "i") };
    }
    Model.find(filter)
      .populate("user")
      .exec((error, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
    // .catch((err) => {
    //   reject(err);
    // });
    //resolve(messages);
  });
};

const updateMessage = async (id, text) => {
  const message = await Model.findByIdAndUpdate(id, { message: text });
  return message;
};

const deleteMessage = async (id) => {
  const message = await Model.deleteOne({ _id: id });
  return message;
};

module.exports = {
  add: addMessage,
  list: getMessages,
  update: updateMessage,
  delete: deleteMessage,
  //get
  //delete
  //update
};
