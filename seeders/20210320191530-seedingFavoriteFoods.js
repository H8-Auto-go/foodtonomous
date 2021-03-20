'use strict';
const favoriteFoodsData = require('./seedData/favoriteFoods.json')
const favoriteFoods = favoriteFoodsData.map(({userId, restaurantId, foodId}) => {
  return {
    userId,
    restaurantId,
    foodId,
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
   await queryInterface.bulkInsert('FavoriteFoods', favoriteFoods, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('FavoriteFoods', )
  }
};
