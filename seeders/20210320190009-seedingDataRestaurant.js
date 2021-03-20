'use strict';
const restaurants = require('./seedData/restaurants.json')
const res =restaurants.map(restaurant => {
  return {
    name:restaurant.name,
    picture:restaurant.picture,
    location:JSON.stringify(restaurant.location),
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
   
    await queryInterface.bulkInsert('Restaurants', res, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
