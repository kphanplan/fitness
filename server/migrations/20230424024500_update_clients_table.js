exports.up = async function (knex) {
    // Rename table 'clients' to 'Clients'
    await knex.schema.renameTable('clients', 'Clients');
  
    // Alter table 'Clients'
    await knex.schema.alterTable('Clients', (table) => {
      // Drop 'name' column
      table.dropColumn('name');
      // Add 'firstName' and 'lastName' columns
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
    });
  };
  
  exports.down = async function (knex) {
    // Rename table 'Clients' back to 'clients'
    await knex.schema.renameTable('Clients', 'clients');
  
    // Alter table 'clients'
    await knex.schema.alterTable('clients', (table) => {
      // Drop 'firstName' and 'lastName' columns
      table.dropColumn('firstName');
      table.dropColumn('lastName');
      // Add 'name' column back
      table.string('name').notNullable();
    });
  };