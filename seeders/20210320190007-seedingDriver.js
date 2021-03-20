'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const driverData = require('./seedData/drivers.json')
const drivers = driverData.map(({name, email, password, avatar, location, saldo}) => {
  return {
    name,
    email,
    password:hashPassword(password),
    avatar,
    saldo,
    location: JSON.stringify(location),
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
console.log(drivers);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Drivers',drivers ,{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Drivers', null, {})
  }
};
