'use strict';
const foodsData = require('./seedData/foods.json')
const foods = foodsData.map(({name, price, restaurantId, picture}) => {
  return {
    name,
    picture,
    price,
    restaurantId,
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
   await queryInterface.bulkInsert('Foods', foods, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Foods', {})
  }
};
