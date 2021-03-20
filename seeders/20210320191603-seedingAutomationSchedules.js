'use strict';
const automationScheduleData = require('./seedData/automationSchedules.json')
const automationSchedule = automationScheduleData.map(({time, userId, foodId, restaurantId}) =>  {
  return {
    time,
    userId,
    foodId,
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
     await queryInterface.bulkInsert('AutomationSchedules', automationSchedule, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * 
     */
     await queryInterface.bulkDelete('AutomationSchedules', null, {})
  }
};
