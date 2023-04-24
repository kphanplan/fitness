const { Model } = require('../config/db');
const Client = require('./Client');
const PositiveQuestions = require('./PositiveQuestions');

class CheckInData extends Model {
  static get tableName() {
    return 'check_in_data';
  }

  static get relationMappings() {
    return {
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: Client,
        join: {
          from: 'check_in_data.clientId',
          to: 'Clients.id'
        }
      },
      positiveQuestion: {
        relation: Model.BelongsToOneRelation,
        modelClass: PositiveQuestions,
        join: {
          from: 'check_in_data.positiveQuestionId',
          to: 'positive_questions.id'
        }
      }
    };
  }
}

module.exports = CheckInData;