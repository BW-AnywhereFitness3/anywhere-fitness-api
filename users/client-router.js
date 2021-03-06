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
    DB.findAllSessionsByClientId(userID)
    .then(classes => {
        res.status(200).json({ classes, message: "all classes for logged user" })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errMessage: "Internal error, could not get data" })
    })
})

router.get('/classes/sessions/:id', (req, res) => {
    let { id } = req.params;
    let userID = req.jwt.subject;
    console.log(userID)
    DB.findSessionById(id)
    .then(session => {
        console.log(session)
        console.log(session.users_id)
        if(session.users_id === userID) {
            res.status(200).json({ session, message: "Session for logged user" })
        } else {
            res.status(404).json({ message: "no session found for current logged user" })
        }
    })
    .catch(err => {
        console.log(err)
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

router.delete('/classes/sessions/:id', (req, res) => {
    let { id } = req.params;
    let userID = req.jwt.subject;
    console.log(userID)
    DB.findSessionById(id)
    .then(session => {
        console.log(session)
        console.log(session.users_id)
        if(session.users_id === userID) {
            DB.removeSessionById(id)
            .then(count => {
                if(count > 0) {
                    res.status(200).json({ message: `successfully deleted session with id ${id}` })
                } else {
                    res.status(500).json({ errMessage: `could not delete session with id ${id}` })
                }
            })
        } else {
            res.status(404).json({ message: `no session with id ${id} found for current logged user ` })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errMessage: "Internal error, could not get data" })
    })
});

router.put('/classes/sessions/:id', (req, res) => {
    let { id } = req.params;
    let subject = req.jwt.subject;
    let changes = req.body;

    if(changes.classes_id){
        DB.findSessionById(id)
        .then(session => {
            if(session){
                if(session.users_id === subject){
                    DB.updateSessionById(id, changes)
                    .then(count => {
                        if(count === 1) {
                            DB.findSessionById(id)
                            .then(updatedSession => {
                                res.status(200).json({ success: `successfully updated session with id ${id}`, updated: updatedSession })
                            })
                            .catch(err => {
                                res.status(500).json({ errMessage: "Internal server error finding updated session" })
                            })
                        } else {
                            res.status(400).json({ errMessage: "Could not update class" })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ errMessage: "Internal server error updating class" })
                    })
                } else {
                    res.status(401).json({ errMessage: "Not authorized, this session is not assigned to this client" })
                }
            } else {
                res.status(404).json({ errMessage: "No session found with requested id"})
            }
        })
        .catch(err => {
            res.status(500).json({ errMessage: "Internal server error finding session" })
        })
    } else {
        res.status(400).json({ message: "classes id is required" })
    }

});

module.exports = router;