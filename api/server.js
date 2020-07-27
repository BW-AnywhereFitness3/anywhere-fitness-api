// Initial server requirements
let express = require("express"),
    cors = require("cors"),
    helmet = require("helmet");

let server = express(); // server using express
// middleware
server.use(cors());
server.use(helmet());
server.use(express.json()); // for using json to communicate with db and client

// base endpoint
server.get("/", (req, res) => {
    res.status(200).json({ message: "Include /api to request" });
})
server.get("/api", (req, res) => {
    res.status(200).json({ api: "UP" });
})

module.exports = server;