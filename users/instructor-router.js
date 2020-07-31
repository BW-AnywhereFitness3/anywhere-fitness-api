let express = require("express");
// insert DB connection here
let router = express.Router();
let DB = require('../helpers/users-model');

router.get("/classes", (req, res) => {
    let subject = req.jwt.subject;
    DB.findAllClassesByInstructorId(subject)
    .then(classes => {
        if(classes.length < 1){
            res.status(404).json({ message: "no classes found" });
        } else {
            res.status(200).json({ data: classes });
        }
    })
})

router.get('/classes/:id', (req, res) => {
    let { id } = req.params;
    if(Number(id)){
        DB.findClassById(id)
        .then(returned => {
            // console.log(returned.instructor_id)
            res.status(200).json({ class: returned })
        })
        .catch(err => {
            res.status(500).json({ errMessage: "Could not find class with that id" })
        })
    } else {
        res.status(400).json({ error: "id must be a number" })
    }
})

router.post("/classes", (req, res) => {
    let newClass = req.body;
    let subject = req.jwt.subject;

    if(!newClass.name || !newClass.type || !newClass.start_time || !newClass.duration || !newClass.intensity_level || !newClass.address || !newClass.city || !newClass.postal || !newClass.max_class || newClass.id) {
    res.status(400).json({ message: "all fields required: name, type, start_time, duration, intensity_level, address, city, postal, current_attendees, max_clas only", data: newClass })
    } else {
        newClass.instructor_id = subject
        DB.addClass(newClass)
        .then(addedClass => {
            res.status(201).json({ data: addedClass, message: "successfully added class" })
        })
    }
})

router.delete('/classes/:id', (req, res) => {
    let { id } = req.params;
    let instructorID = req.jwt.subject;
    console.log(instructorID)
    DB.findClassById(id)
    .then(returnedClass => {
        // console.log(returnedClass)
        // console.log(returnedClass.users_id)
        if(returnedClass.instructor_id === instructorID) {
            DB.removeClassById(id)
            .then(count => {
                if(count > 0) {
                    res.status(200).json({ message: `successfully deleted class with id ${id}` })
                } else {
                    res.status(500).json({ errMessage: `could not delete class with id ${id}` })
                }
            })
        } else {
            res.status(404).json({ message: `no class with id ${id} found for current logged user ` })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errMessage: "Internal error, could not get data" })
    })
});

// router.delete('/classes/:id', (req, res) => {
//     let { id } = req.params;
//     let subject = req.jwt.subject;

//     DB.findAllClassesByInstructorId(subject)
//     .then(returnedArray => {
//         if(returnedArray.length >= 1) {
            
//             let arr = returnedArray.filter(filtered => {
//                 return filtered.id === Number(id)
//             })

//             if(arr) {
//             let getObjectId = arr[0].id

//                 DB.removeById(getObjectId)
//                 .then(removedID => {
//                     if(removedID > 0){
//                         res.status(200).json({ message: `successfully removed class with id ${id}`})
//                     } else {
//                         res.status(500).json({ errMessage: "could not delete class" })
//                     }
//                 })
//                 .catch(err => {
//                     res.status(500).json({ errMessage: "could not process request" })
//                 })
//             } else {
//                 res.status(404).json({ message: "class with said id does not exist" })
//             }
//         } else {
//             res.status(404).json({ message: "class with said id cannot be found" })

//         }
//     })
//     .catch(err => {
//         res.status(500).json({ err, errMessage: "could not find classes"})
//     })
// })

router.put('/classes/:id', (req, res) => {
    let { id } = req.params;
    let subject = req.jwt.subject;
    let changes = req.body;

    DB.findClassById(id)
    .then(returnedClass => {
        if(returnedClass){
            if(returnedClass.instructor_id === subject){
                DB.updateClassById(id, changes)
                .then(count => {
                    if(count === 1) {
                        DB.findClassById(id)
                        .then(updatedClass => {
                            res.status(200).json({ success: `successfully updated class with id ${id}`, updated: updatedClass })
                        })
                        .catch(err => {
                            res.status(500).json({ errMessage: "Internal server error finding updated class" })
                        })
                    } else {
                        res.status(400).json({ errMessage: "Could not update class" })
                    }
                })
                .catch(err => {
                    res.status(500).json({ errMessage: "Internal server error updating class" })
                })
            } else {
                res.status(401).json({ errMessage: "Not authorized, this class is not assigned to this instructor" })
            }
        } else {
            res.status(404).json({ errMessage: "No classs found with requested id"})
        }
    })
    .catch(err => {
        res.status(500).json({ errMessage: "Internal server error finding class" })
    })

    // DB.findAllClassesByInstructorId(subject)
    // .then(returnedArray => {
    //     if(returnedArray.length >= 1) {
            
    //         let arr = returnedArray.filter(filtered => {
    //             return filtered.id === Number(id)
    //         })

    //         if(arr) {
    //         let getObjectId = arr[0].id

    //             DB.removeClassById(getObjectId)
    //             .then(removedID => {
    //                 if(removedID > 0){
    //                     res.status(200).json({ message: `successfully removed class with id ${id}`})
    //                 } else {
    //                     res.status(500).json({ errMessage: "could not delete class" })
    //                 }
    //             })
    //             .catch(err => {
    //                 res.status(500).json({ errMessage: "could not process request" })
    //             })
    //         } else {
    //             res.status(404).json({ message: "class with said id does not exist" })
    //         }
    //     } else {
    //         res.status(404).json({ message: "class with said id cannot be found" })

    //     }
    // })
    // .catch(err => {
    //     res.status(500).json({ err, errMessage: "could not find classes"})
    // })
})

module.exports = router;