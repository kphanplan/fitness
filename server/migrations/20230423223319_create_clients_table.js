exports.up = function (knex) {
    return knex.schema.createTable('clients', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('pin').notNullable();
      table.string('gender').notNullable();
      table.boolean('isActive').defaultTo(true);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('clients');
  };