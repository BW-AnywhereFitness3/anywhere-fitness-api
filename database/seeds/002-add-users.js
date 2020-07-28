
exports.seed = function(knex) {
  let users = [
    {
      role: 1,
      first_name: "Jen",
      last_name: "Web UI",
      email: "jen@fitness.com",
      username: "jen",
      password: "secretpw"
    },
    {
      role: 1,
      first_name: "Cameron",
      last_name: "React I",
      email: "cameron@fitness.com",
      username: "cameron",
      password: "secretpw"
    },
    {
      role: 1,
      first_name: "Nicole",
      last_name: "React I",
      email: "nicole@fitness.com",
      username: "nicole",
      password: "secretpw"
    },
    {
      role: 1,
      first_name: "Harper",
      last_name: "React II",
      email: "harper@fitness.com",
      username: "harper",
      password: "secretpw"
    },
    {
      role: 1,
      first_name: "Elisa",
      last_name: "React II",
      email: "elisa@fitness.com",
      username: "elisa",
      password: "secretpw"
    },
    {
      role: 2,
      first_name: "Fernando",
      last_name: "Node",
      email: "fernando@fitness.com",
      username: "fernando",
      password: "secretpw"
    },
    {
      role: 2,
      first_name: "anywhere",
      last_name: "fitness",
      email: "anywhere@fitness.com",
      username: "anywhere",
      password: "secretpw"
    },
  ]

  return knex("users")
      .insert(users)
      .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
