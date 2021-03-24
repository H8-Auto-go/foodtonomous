'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AutomationSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      foodId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Foods',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      quantity:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AutomationSchedules');
  }
};