
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, role_id: 1, username: 'employee', password: '$2b$10$xApTtGra4kBam37JrdPjpOloaNYwe6Ia7L3Pjh6COoFABsojybk4m' },
        { id: 2, role_id: 2, username: 'manager', password: '$2b$10$xApTtGra4kBam37JrdPjpOloaNYwe6Ia7L3Pjh6COoFABsojybk4m' },
        { id: 3, role_id: 2, username: 'another_manager', password: '$2b$10$xapttgra4kbam37jrdpjpoloanywe6ia7l3pjh6coofabsojybk4m' },
        { id: 4, role_id: 3, username: 'finance_manager', password: '$2b$10$xapttgra4kbam37jrdpjpoloanywe6ia7l3pjh6coofabsojybk4m' },
      ]);
    });
};
