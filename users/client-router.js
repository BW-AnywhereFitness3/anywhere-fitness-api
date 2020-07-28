let express = require("express");
// insert DB connection here
let router = express.Router();
let DB = require('../helpers/users-model');
const server = require("../api/server");
// router.get("/", (req, res) => {
//     res.status(200).json({ message: "inside client router", jwt: req.jwt })
// })

router.get("/classes", (req, res) => {
    let { role, username } = req.jwt

    DB.findAllClasses()
    .then(classes => {
        res.status(200).json({ data: classes, jwt: req.jwt })
    })
    .catch(err => {
        res.status(500).json({ err })
    })
})

router.post("/classes/sessions", (req, res) => {
    let newSession = req.body;
    let userID = req.jwt.subject;
    let timeStamp = new Date().toString().split(' ').slice(0, 5).join(' ');
    newSession.users_id = userID;
    newSession.joined = timeStamp;
    // need to add rejection of added item if it already exists
    if(!newSession.classes_id) {
        res.status(400).json({ message: "class id required" });
    } else {
        DB.addSession(newSession)
        .then(addedSession => {
            res.status(201).json({ addedSession, message: "successfully added new session" })
        })
        .catch(err => {
            res.status(500).json({ errMessage: "Internal error, could not add session", err })
        })
    }
})

router.get('/classes/sessions', (req, res) => {
    let userID = req.jwt.subject;
    DB.findAllSessionsById(userID)
    .then(classes => {
        res.status(200).json({ classes, message: "all classes for logged user" })
    })
    .catch(err => {
        res.status(500).json({ errMessage: "Internal error, could not get data" })
    })
})

router.get('/classes/:id', (req, res) => {
    let { id } = req.params;
    if(Number(id)){
        DB.findClassById(id)
        .then(returned => {
            res.status(200).json({ class: returned })
        })
        .catch(err => {
            res.status(500).json({ errMessage: "Could not find class with that id" })
        })
    } else {
        res.status(400).json({ error: "id must be a number" })
    }
})

module.exports = router;