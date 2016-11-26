/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;

const users = [
  {
    provider: 'local',
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  },
  {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }
];

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() =>
    User
      .bulkCreate(users)
      .then(() => console.log('finished populating users'))
  );
