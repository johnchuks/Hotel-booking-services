'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    token: DataTypes.STRING,
    uuid: DataTypes.STRING,
  }, {});
  AccessToken.associate = function(models) {
    // associations can be defined here
  };
  return AccessToken;
};
