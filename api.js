const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const port = 3000;
const router = express.Router();

const galeriaRouter = require("./router/galeriaRouter");

api.use(cors());

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json({ limit: "20mb", extended: true }));

api.use("/public", express.static(__dirname + "/public"));

router.get("/", (req, resp) =>
  resp.json({
    message: "API online...",
  })
);

api.use("/", router);
api.use("/galeria", galeriaRouter);

api.listen(port);
console.log("Run API express");
