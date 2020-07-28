const jwt = require("jsonwebtoken"); // <<<<< install the library
let constant = require('../config/constants');

module.exports = {
    handleError,
    isValid,
    makeJwt,
}

function handleError(err, res) {
    res.status(500).json({ message: err.message });
}

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }

  function makeJwt(user) {
    const payload = {
        subject: user.id,
        first_name: user.first_name,
        username: user.username,
        role: user.role,
    };

    const secret = constant.jwtSecret;

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secret, options);
}