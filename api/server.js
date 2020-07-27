// Initial server requirements
let express = require("express"),
    cors = require("cors"),
    helmet = require("helmet");

let authRouter = require("../auth/auth-router");
let clientRouter = require("../users/client-router");
let restricted = require("../auth/restricted-middleware");

let server = express(); // server using express
// middleware
server.use(cors());
server.use(helmet());
server.use(express.json()); // for using json to communicate with db and client

// auth endpoint
server.use("/api/auth", authRouter);
server.use("/api/client", restricted, clientRouter);

// base endpoint
server.get("/", (req, res) => {
    res.status(200).json({ message: "Include /api to request" });
})
server.get("/api", (req, res) => {
    res.status(200).json({ api: "UP" });
})

module.exports = server;