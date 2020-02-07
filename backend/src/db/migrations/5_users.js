
exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary();
    table.integer('role_id').unsigned().index().references('id')
      .inTable('roles');
    table.string('username');
    table.string('password');
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
