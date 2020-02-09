
exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('tour_info', (table) => {
    table.increments('id').primary();
    table.integer('tour_id').unsigned().index().references('id')
      .inTable('tours');
    table.integer('requestor_id').unsigned().index().references('id')
      .inTable('users');
    table.string('description');
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tour_info');
};
