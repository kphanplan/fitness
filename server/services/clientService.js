const { knex } = require('../config/db');

const getAllClients = async () => {
  return await knex('clients');
};

const getClientById = async (id) => {
  return await knex('clients').where({ id }).first();
};

const updateClient = async (id, updates) => {
  await knex('clients').where({ id }).update(updates);
  return await getClientById(id);
};

module.exports = {
  getAllClients,
  getClientById,
  updateClient,
};