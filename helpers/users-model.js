const db = require("../database/db-config");
const { where } = require("../database/db-config");

module.exports = {
    add,
    find,
    findBy,
    findById,
    findAllClasses,
    findAllClassesByInstructorId,
    findClassById,
    addClass,
    findSessionById,
    addSession,
    findAllSessionsByClientId,
    removeClassById,
    updateClassById,
    removeSessionById,
    updateSessionById,
};

function find() {
    return db("users as u")
        .join("roles as r", "u.role", "r.id")
        .select("u.id", "u.username", "r.name as role")
        .orderBy("u.id");
}

function findBy(filter) {
    return db("users as u")
    .join("roles as r", "u.role", "r.id")
    .where(filter)
    .select("u.id", "u.username", "r.name as role", "u.password")
    .orderBy("u.id");
}

// =================== BOTH ======================================
// functioning
function findById(id) {
    return db("users as u")
    .where({ id })
    .first()
    // .join('roles as r', 'r.id')  
    .select("u.id", "u.role", "u.first_name", "u.last_name", "u.email", "u.username");
}
// functioning
async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");
        
        return findById(id);
    } catch (error) {
        throw error;
    }
}

// =================== CLIENTS ===================================
// working, this is for getting all classes for clients
function findAllClasses() {
    return db("classes")
}

function findSessionById(id) {
    return db('sessions as s')
    .select('s.id as session_id', 's.users_id', 's.classes_id', 'c.name', 'c.instructor_id', 'c.type', 'c.start_time', 'c.duration', 'c.intensity_level', 'c.address', 'c.city', 'c.postal', 'c.current_attendees', 'c.max_class')
    // .from('sessions as s')
    .join('classes as c', 's.classes_id', 'c.id')
    .where('s.id', id)
    .first()
}

function addSession(newSession) {
    return db('sessions')
        .insert(newSession, 'id')
        .then(([id]) => {
            return findSessionById(id);
        })
}

function findAllSessionsByClientId(id) { // of the logged in client taken from decodedToken
    return db('sessions as s')
    .select('s.id as sessionID', 's.users_id', 's.classes_id', 'c.name', 'c.instructor_id', 'c.type', 'c.start_time', 'c.duration', 'c.intensity_level', 'c.address', 'c.city', 'c.postal', 'c.current_attendees', 'c.max_class')
    // .from('sessions as s')
    .join('classes as c', 's.classes_id', 'c.id')
    .where('s.users_id', id)

    // return db('c')
    // .from('sessions as s')
    // .join('classes as c on s.classes_id = c.id')
    // .where('s.users_id', id)
    // .select('select c.id, c.name, c.instructor_id, c.type, c.start_time, c.duration, c.intensity_level, c.address, c.city, c.postal, c.current_attendees, c.max_class')
}

function removeSessionById(id) {
    return db('sessions')
    .where('id', id)
    .del();
}

function updateSessionById(id, updatedSession) {
    return db('sessions')
        .where('id', id)
        .update(updatedSession)
}

// =================== INSTRUCTORS ===============================
function findAllClassesByInstructorId(id) { // of the logged in instructor taken from decodedToken
    return db('classes as c')
        .where('c.instructor_id', id)
        .orderBy('id', 'asc')
}


function findClassById(id) {
    return db('classes')
        .where({id})
        .first();
}

function addClass(newClass) {
    return db('classes')
        .insert(newClass, "id")
        .then(([id]) => {
            return findClassById(id)
        })
}

function removeClassById(id) {
    return db('classes')
    .where('id', id)
    .del();
}

function updateClassById(id, updatedClass) {
    return db('classes')
        .where('id', id)
        .update(updatedClass)
}