'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'James',
      email: 'john@yahoo.com',
      password: 'johnny123',
      points: 90,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Frank',
      lastName: 'Arnold',
      email: 'arnny@yahoo.com',
      password: 'arnold12',
      points: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Efe',
      lastName: 'Chuks',
      email: 'chuks@gmail.com',
      password: 'chukwu123',
      points: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
