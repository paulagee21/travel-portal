
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        { id: 1, name: 'employee', description: 'employee' },
        { id: 2, name: 'manager', description: 'manager' },
        { id: 3, name: 'finance manager', description: 'finance manager' },
      ]);
    });
};
