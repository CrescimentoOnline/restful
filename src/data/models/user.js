'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING(50),
    lastname: DataTypes.STRING(50),
    email: DataTypes.STRING(120),
    password: DataTypes.STRING(60)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};