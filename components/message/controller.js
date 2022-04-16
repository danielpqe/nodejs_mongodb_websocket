const socket = require("../../socket").socket;
const store = require("./store");

const addMessage = (chat, user, message, file) => {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error("[Message Controller], no user or message");
      return reject(new Error("Wrong data"));
      return false;
    }

    let fileUrl = "";
    if (file) {
      fileUrl = "http://localhost:3000/app/files/" + file.filename;
    }

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };
    store.add(fullMessage);

    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });

  //   const messageObject = {
  //     user: user,
  //     message: message,
  //     time: new Date().toLocaleString(),
  //   };
  //   messages.push(messageObject);
  //   return messageObject;
};

const listMessages = (filterUser) => {
  return new Promise((resolve, reject) => {
    const list = store.list(filterUser);
    resolve(list);
  });
};

const listMessagesByUser = (user) => {
  console.log("user", user);
  return new Promise((resolve, reject) => {
    const list = store.listByUser(user);
    resolve(list);
  });
};

const updateMessage = (id, text) => {
  return new Promise((resolve, reject) => {
    const list = store.update(id, text);
    resolve(list);
  });
};

const deleteMessage = (id) => {
  return new Promise((resolve, reject) => {
    const messageDeleted = store.delete(id);
    resolve(messageDeleted);
  });
};
module.exports = {
  addMessage,
  listMessages,
  updateMessage,
  deleteMessage,
};
