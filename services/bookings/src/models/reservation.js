'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    user: DataTypes.STRING,
    status: DataTypes.ENUM(
      'PENDING_APPROVAL', 'RESERVED',
    ),
    roomId: DataTypes.INTEGER
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
    Reservation.belongsTo(models.Room, {
      foreignKey: 'roomId',
      onDelete: 'CASCADE'
    })
  };
  return Reservation;
};
