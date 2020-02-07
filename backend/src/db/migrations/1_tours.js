
exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('tours', (table) => {
    table.increments('id').primary();
    table.string('destination');
    table.text('description');
    table.string('conveyance');
    table.string('mode_of_travel');
    table.datetime('start_date');
    table.datetime('end_date');
    table.decimal('hotel', 8, 2);
    table.decimal('ticket', 8, 2);
    table.decimal('airport_cab_home', 8, 2);
    table.decimal('airport_cab_destination', 8, 2);
    table.timestamps(false, true);
    table.string('created_by', 100).notNullable().defaultTo('anonymous');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tours');
};
