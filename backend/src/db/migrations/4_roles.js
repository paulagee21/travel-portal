
exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('roles', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('roles');
};
