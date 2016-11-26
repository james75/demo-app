'use strict';

import { Notification, User } from '../../sqldb';

function index(request, response) {
  const { user } = request;
  let list = [];

  return Notification
    .findAll({
      where: { UserId: { $ne: user.get('_id') }},
      order: 'createdAt desc',
      include: [User]
    })
    .then(notifications => {
      list = notifications;
      const where = {};

      if(user.get('openedNotificationsAt')) {
        where.createdAt = { $gt: user.get('openedNotificationsAt') };
      }

      return Notification.count({ where });
    })
    .then(newNotificationsCount => response.json({
      notifications: list,
      meta: { new: newNotificationsCount }
    }))
    .catch(error => {
      console.log(error);
      response.status(422).json(error);
    });
}

function open(request, response) {
  const { user } = request;

  return user
    .update({ openedNotificationsAt: new Date() })
    .then(() => response.json({ user }))
    .catch(error => response.status(422).json(error));
}

export default { index, open };
