'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {foreignKey: 'userId'})
      Order.belongsTo(models.User, {foreignKey: 'driverId'})
      Order.belongsTo(models.Restaurant, {foreignKey: 'restaurantId'})
      Order.belongsTo(models.Food, {foreignKey: 'foodId'})
    }
  };
  Order.init({
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    hooks:{
      beforeCreate: order =>{
        order.status = order.status || 'pending'
      }
    }
  });
  return Order;
};