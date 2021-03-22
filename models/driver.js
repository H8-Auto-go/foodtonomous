'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Driver.init({
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
    saldo: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
    hooks: {
      beforeCreate: driver => {
        driver.password = hashPassword(driver.password)
        driver.avatar = 'https://avatars.dicebear.com/api/avataaars/angga.svg?style=circle'
      }
    }
  });
  return Driver;
};