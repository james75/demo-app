'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Post', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 200],
          msg: 'Post message is restrict to 200 characters.'
        }
      }
    }
  }, {
    timestamps: true,
    paranoid: true
  });
}
