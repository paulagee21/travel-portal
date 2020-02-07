
exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('tour_managers', (table) => {
    table.increments('id').primary();
    table.integer('tour_id').unsigned().index().references('id')
      .inTable('tours');
    table.integer('manager_id').unsigned().index().references('id')
      .inTable('users');
    table.enu('status',
      ['approved', 'rejected', 'pending', 'requesting_information'],
      { useNative: true, enumName: 'tour_manager_status' }
    )
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tour_managers');
};
