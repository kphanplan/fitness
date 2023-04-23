exports.up = function (knex) {
    return knex.schema.createTable('CheckInData', (table) => {
      table.increments('id').primary();
      table.integer('clientId').references('id').inTable('clients').notNullable();
      table.integer('energyLevelRating');
      table.text('energyLevelDescription');
      table.integer('motivationRating');
      table.text('motivationDescription');
      table.integer('stressRating');
      table.text('stressDescription');
      table.integer('workoutAdherenceRating');
      table.text('workoutAdherenceDescription');
      table.integer('nutritionAdherenceRating');
      table.text('nutritionAdherenceDescription');
      table.integer('positiveQuestionId').references('id').inTable('PositiveQuestions');
      table.text('positiveQuestionAnswer');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('CheckInData');
  };