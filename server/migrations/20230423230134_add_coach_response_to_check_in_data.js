exports.up = function (knex) {
    return knex.schema.table('CheckInData', (table) => {
      table.text('coachResponse');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('CheckInData', (table) => {
      table.dropColumn('coachResponse');
    });
  };