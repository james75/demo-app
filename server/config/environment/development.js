'use strict';
/*eslint no-process-env:0*/

module.exports = {
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },
  seedDB: true
};
