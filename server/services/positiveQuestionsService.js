const { knex } = require('../config/db');

const getAllPositiveQuestions = async () => {
  return await knex('PositiveQuestions');
};

const getPositiveQuestionById = async (id) => {
  return await knex('PositiveQuestions').where({ id }).first();
};

const updatePositiveQuestion = async (id, updates) => {
  await knex('PositiveQuestions').where({ id }).update(updates);
  return await getPositiveQuestionById(id);
};

module.exports = {
  getAllPositiveQuestions,
  getPositiveQuestionById,
  updatePositiveQuestion,
};