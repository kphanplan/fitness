const { Model } = require('../config/db');

class PositiveQuestions extends Model {
  static get tableName() {
    return 'positive_questions';
  }
}

module.exports = PositiveQuestions;