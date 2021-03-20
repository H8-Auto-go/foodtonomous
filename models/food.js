'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Foods.hasMany(models.AutomationSchedule, {foreignKey: 'foodId'})
      Foods.hasMany(models.Order, {foreighKey: 'foodId'})
      Foods.hasMany(models.FavoriteFood, {foreignKey: 'foodId'})
    }
  };
  Foods.init({
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    restaurantId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Foods',
  });
  return Foods;
};
