'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.hasMany(models.AutomationSchedule, {foreignKey: 'restaurantId'})
      Restaurant.hasMany(models.Food, {foreignKey: 'restaurantId'})
      Restaurant.hasMany(models.Order, {foreignKey: 'restaurantId'})
      Restaurant.hasMany(models.FavoriteFood, {foreignKey: 'restaurantId'})
    }
  };
  Restaurant.init({
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};