'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FavoriteFood.belongsTo(models.User, {foreignKey: 'userId'})
      FavoriteFood.belongsTo(models.Food, {foreignKey: 'foodId'})
      FavoriteFood.belongsTo(models.Restaurant, {foreignKey: 'restaurantId'})
    }
  };
  FavoriteFood.init({
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteFood',
  });
  return FavoriteFood;
};