'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

db.Post = db.sequelize.import('../api/post/model');
db.Post.belongsTo(db.User);
db.Post.belongsTo(db.Post, { as: 'Parent' });
db.User.hasMany(db.Post);
db.Post.hasMany(db.Post, { as: 'PostReplies', foreignKey: 'ParentId' });

db.PostLike = db.sequelize.import('../api/post-like/model');
db.PostLike.belongsTo(db.Post);
db.PostLike.belongsTo(db.User);
db.Post.hasMany(db.PostLike);
db.User.hasMany(db.PostLike);

db.Notification = db.sequelize.import('../api/notification/model');
db.Notification.belongsTo(db.User);
db.PostLike.hasMany(db.Notification, {
  foreignKey: 'NotifiableId',
  constraints: false,
  scope: {
    Notifiable: 'PostLike'
  }
});
db.Post.hasMany(db.Notification, {
  foreignKey: 'NotifiableId',
  constraints: false,
  scope: {
    Notifiable: 'Post'
  }
});

module.exports = db;
