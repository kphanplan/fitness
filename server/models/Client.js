const { Model } = require('../config/db');

class Client extends Model {
  static get tableName() {
    return 'clients';
  }

  static get relationMappings() {
    const CheckInData = require('./CheckInData');
    return {
      checkIns: {
        relation: Model.HasManyRelation,
        modelClass: CheckInData,
        join: {
          from: 'clients.id',
          to: 'check_in_data.clientId'
        }
      }
    };
  }
}

module.exports = Client;