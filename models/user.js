'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {foreignKey:'userId'})
      User.hasMany(models.Order, {foreignKey: 'driverId'})
      User.hasMany(models.FavoriteFood, {foreignKey:'userId'})
      User.hasMany(models.AutomationSchedule, {foreignKey: 'userId'})
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique:{
        args:true,
        msg:'email already exist'
      },
      validate:{
        isEmail:{
          args:true,
          msg:'Invalid format email'
        }
      }
    },
    password: DataTypes.STRING,
    saldo: DataTypes.NUMBER,
    location: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
        user.avatar = `https://avatars.dicebear.com/api/avataaars/${user.name}.svg?style=circle`
      }
    }
  });
  return User;
};
