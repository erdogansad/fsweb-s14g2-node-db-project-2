const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cars = require("./cars/cars-router.js");
const { errHandler } = require("./server-middleware.js");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("combined"));

server.use("/api/cars", cars);
server.all("*", (req, res) => res.status(404).json({ message: "not found" }));
server.use(errHandler);

module.exports = server;
