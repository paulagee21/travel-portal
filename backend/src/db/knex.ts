var config = require('../db/knexfile');
export const knex = require('knex')(config);
