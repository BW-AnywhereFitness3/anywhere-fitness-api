let express = require("express");
// insert DB connection here
let router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "inside client router" })
})

router.get("/classes", (req, res) => {
    res.status(200).json({ message: "inside client classes router" })
})

module.exports = router;