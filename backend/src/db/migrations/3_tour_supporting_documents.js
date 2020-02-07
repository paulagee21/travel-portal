
exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('tour_supporting_documents', (table) => {
    table.increments('id').primary();
    table.integer('tour_id').unsigned().index().references('id')
      .inTable('tours');
    table.string('image');
    table.string('description');
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tour_supporting_documents');
};
