
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tours').del()
    .then(function () {
      // Inserts seed entries
      return knex('tours').insert([
        {
          id: 1,
          destination: 'Osaka, Japan',
          description: 'The land of the rising sun',
          conveyance: 'van',
          mode_of_travel: 'airplane',
          start_date: '2020-02-14T19:54:00+0000',
          end_date: '2020-02-20T19:54:00+0000',
          hotel: 1299.50,
          ticket: 17000.00,
          airport_cab_home: 300.00,
          airport_cab_destination: 300.00,
          created_by: 'employee',
        },
        {
          id: 2,
          destination: 'Seoul, South Korea',
          description: 'Seoul is a huge metropolis where modern skyscrapers, high-tech subways and pop culture meet Buddhist temples, palaces and street markets. Notable attractions include futuristic Dongdaemun Design Plaza, a convention hall with curving architecture and a rooftop park; Gyeongbokgung Palace, which once had more than 7,000 rooms; and Jogyesa Temple, site of ancient locust and pine trees.',
          conveyance: 'van',
          mode_of_travel: 'airplane',
          start_date: '2020-02-20T19:54:00+0000',
          end_date: '2020-02-25T19:54:00+0000',
          hotel: 1299.50,
          ticket: 17000.00,
          airport_cab_home: 300.00,
          airport_cab_destination: 300.00,
          created_by: 'employee',
        },
      ]);
    });
};
