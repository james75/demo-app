'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Notifiable: DataTypes.STRING,
    NotifiableId: DataTypes.INTEGER
  }, {
    timestamps: true
  });
}
