module.exports = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 8000,
    database: 'travel_portal',
    user: 'tp',
    password: 'password' 
  },
  debug: true,
  pool: {
    min: 2,
    max: 5
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

