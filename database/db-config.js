// let knex = require("knex");
// let knexfile = require("../knexfile");

// let environment = process.env.NODE_ENV || 'development';

// // let configuration = knexfile.development;

// module.exports = knex(knexfile[environment]);

const knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

module.exports = knex(config);
