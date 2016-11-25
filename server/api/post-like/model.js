'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('PostLike', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: true,
    paranoid: true
  });
}
