
exports.seed = function(knex) {
  let sessions = [
    {
      users_id: 6,
      classes_id: 5,
      joined: new Date().toString().split(' ').slice(0, 5).join(' '),

    },
    {
      users_id: 6,
      classes_id: 5,
      joined: new Date().toString().split(' ').slice(0, 5).join(' '),
    },
    {
      users_id: 7,
      classes_id: 6,
      joined: new Date().toString().split(' ').slice(0, 5).join(' '),
    },
    {
      users_id: 7,
      classes_id: 6,
      joined: new Date().toString().split(' ').slice(0, 5).join(' '),
    },
  ]
  return knex("sessions")
      .insert(sessions)
      .then(() => console.log("\n== Seed data for sessions table added. ==\n"));
};
