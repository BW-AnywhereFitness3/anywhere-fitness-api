let express = require("express");
// insert DB connection here
let router = express.Router();
let DB = require('../helpers/users-model');

router.get("/classes", (req, res) => {
    let subject = req.jwt.subject;
    DB.findAllClassesById(subject)
    .then(classes => {
        if(classes.length < 1){
            res.status(404).json({ message: "no classes found" });
        } else {
            res.status(200).json({ data: classes });
        }
    })
})
router.post("/classes", (req, res) => {
    let newClass = req.body;
    let subject = req.jwt.subject;

    if(!newClass.name || !newClass.type || !newClass.start_time || !newClass.duration) {
    res.status(400).json({ message: "all fields required", data: newClass })
    } else {
        newClass.instructor_id = subject
        DB.addClass(newClass)
        .then(addedClass => {
            res.status(201).json({ data: addedClass, message: "successfully added class" })
        })
    }
})

module.exports = router;