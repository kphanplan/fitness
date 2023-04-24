exports.up = function (knex) {
    return knex.schema
      .alterTable("clients", (table) => {
        table.string("firstName", 255).defaultTo("TempFirstName");
        table.string("lastName", 255).defaultTo("TempLastName");
      })
      .then(() => {
        return knex.raw(
          `UPDATE "clients" SET "firstName" = split_part("name", ' ', 1), "lastName" = split_part("name", ' ', 2)`
        );
      })
      .then(() => {
        return knex.schema.alterTable("clients", (table) => {
          table.string("firstName", 255).notNullable().alter();
          table.string("lastName", 255).notNullable().alter();
          table.dropColumn("name");
        });
      });
  };
  
  exports.down = function (knex) {
    return knex.schema
      .alterTable("clients", (table) => {
        table.string("name").notNullable();
      })
      .then(() => {
        return knex.raw(
          `UPDATE "clients" SET "name" = "firstName" || ' ' || "lastName"`
        );
      })
      .then(() => {
        return knex.schema.alterTable("clients", (table) => {
          table.dropColumn("firstName");
          table.dropColumn("lastName");
        });
      });
  };