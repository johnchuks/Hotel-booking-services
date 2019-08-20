'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Room', [{
      name: 'Economy single room',
      amount: 40,
      requiredPoints: 100
    }, {
      name: 'Economy double room',
      amount: 60,
      requiredPoints: 120
    }, {
      name: 'Deluxe suite',
      amount: 90,
      requiredPoints: 250
    }, {
      name: 'Presidential suite',
      amount: 200,
      requiredPoints: 600
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Room', null, {});
  }
};
