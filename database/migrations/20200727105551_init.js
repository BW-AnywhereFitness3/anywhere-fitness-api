exports.up = function(knex) {
    return knex.schema
    .createTable("roles", tbl => {
      tbl.increments();

      tbl.string("name", 128).notNullable().unique();
    })

    .createTable("users", tbl => {
        tbl.increments();
        tbl
          .integer("role")
          .unsigned()
          .references("roles.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");

        tbl.string('first_name', 128).notNullable();
        tbl.string('last_name', 128).notNullable();
        tbl.string('email', 128).notNullable().unique();

        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 128).notNullable();
      })
    .createTable("classes", tbl => {
        tbl.increments();
        tbl
            .integer("instructor_id")
            .unsigned()
            .references("users.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl.string("name", 128).notNullable()
        tbl.string("type", 128).notNullable()
        tbl.string("start_time", 128).notNullable()
        tbl.integer("duration", 128).notNullable()
        tbl.integer("intensity_level").notNullable()
        tbl.string("address", 128).notNullable()
        tbl.string("city", 128).notNullable()
        tbl.integer("postal").notNullable()
        tbl.integer("current_attendees").nullable()
        tbl.integer("max_class").notNullable();

    })

    .createTable("sessions", tbl => {
        tbl
            .increments();
        tbl
            .integer("users_id")
            .unsigned()
            .references("users.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl
            .integer("classes_id")
            .unsigned()
            .references("classes.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl.string("joined", 128).notNullable();
    })

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("sessions")
        .dropTableIfExists("classes")
        .dropTableIfExists("users")
        .dropTableIfExists("roles");
};
