'use strict';
const {hashPassword} = require('../helpers/bcrypt')
const usersData = require('./seedData/users.json')
const users = usersData.map(({ email, password, saldo, avatar, location }) => {
  return {
    email,
    password: hashPassword(password),
    saldo,
    avatar,
    location: JSON.stringify(location),
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
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
   await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
