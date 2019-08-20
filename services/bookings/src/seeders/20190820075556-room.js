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
    return queryInterface.bulkInsert('Rooms', [{
      name: 'Economy single room',
      price: 40,
      requiredPoints: 100,
      createdAt: new Date(),
      updatedAt: new Date()

    }, {
      name: 'Economy double room',
      price: 60,
      requiredPoints: 120,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Deluxe suite',
      price: 90,
      requiredPoints: 250,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Presidential suite',
      price: 200,
      requiredPoints: 600,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
