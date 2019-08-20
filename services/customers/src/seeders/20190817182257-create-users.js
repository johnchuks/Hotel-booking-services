'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [{
      firstName: 'John',
      lastName: 'James',
      email: 'john@yahoo.com',
      password: '$2b$10$rahFgCRtkIYGHLYy/xUPluu/noYB08pETRO4Pv0IRvWPEgK.bOsMO',
      points: 500,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Frank',
      lastName: 'Arnold',
      email: 'arnny@yahoo.com',
      password: '$2b$10$yvNbcE8GzL4JvYpgjORt0OlKYF/6g82fjMBKnBYlyvaeGcMLKOLRO',
      points: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Efe',
      lastName: 'Chuks',
      email: 'chuks@gmail.com',
      password: '$2b$10$fBYsQS2wejXpSeocbXhuWOzuzWlJYOC.v2C9XUUJJIaKnymG1WWFS',
      points: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
