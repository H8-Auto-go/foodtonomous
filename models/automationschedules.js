'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AutomationSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AutomationSchedule.belongsTo(models.Restaurant, {foreignKey: 'restaurantId'})
      AutomationSchedule.belongsTo(models.Food, {foreignKey: 'foodId'})
    }
  };
  AutomationSchedule.init({
    time: DataTypes.STRING,
    restauranId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AutomationSchedule',
  });
  return AutomationSchedule;
};