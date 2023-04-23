exports.up = function (knex) {
    return knex.schema.createTable('PositiveQuestions', (table) => {
      table.increments('id').primary();
      table.text('question').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('PositiveQuestions');
  };