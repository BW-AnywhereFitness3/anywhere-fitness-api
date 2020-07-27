// Update with your config settings.
let pgConnection = process.env.DATABASE_URL 

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/fitness.db3'
    },
    useNullAsDefault: true,
    migrations: {
        directory: "./database/migrations",
    },
    seeds: {
        directory: "./database/seeds",
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
