const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("./socket");
const db = require("./db");
//const router = require("./components/message/network");
const router = require("./network/routes");

db(
  "mongodb+srv://danielpqe:danielpqe@cluster0.lp3nv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.use(cors());

app.use(bodyParser.json());
//app.use(router);
socket.connect(server);

router(app);
app.use("/app", express.static("public"));
server.listen(8000, () => {
  console.log("listening on http://localhost:8000");
});
