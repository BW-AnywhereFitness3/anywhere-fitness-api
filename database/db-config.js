let knex = require("knex");
let knexfile = require("../knexfile");

let configuration = knexfile.development;

module.exports = knex(configuration);