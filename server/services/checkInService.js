// server/services/checkInService.js
const { knex } = require('../config/db');

const getAllCheckIns = async () => {
  return await knex('CheckInData');
};

const createCheckIn = async (data) => {
  const result = await knex('CheckInData').insert(data);
  const id = result[0];
  return await getCheckInById(id);
};

const getCheckInById = async (id) => {
  return await knex('CheckInData').where({ id }).first();
};

const updateCheckIn = async (id, updates) => {
  await knex('CheckInData').where({ id }).update(updates);
  return await getCheckInById(id);
};



module.exports = {
  getAllCheckIns,
  getCheckInById,
  updateCheckIn,
};