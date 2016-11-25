'use strict';

import { Post, User, PostLike } from '../../sqldb';

function index(request, response) {
  const { query: { ids }} = request;
  const where = { ParentId: null };

  if (ids && ids.length) {
    where._id = { $in: ids };
  }

  return Post
    .findAll({
      where: where,
      order: 'Post.createdAt desc',
      include: [
        User,
        PostLike,
        {
          model: Post,
          as: 'PostReplies',
          separate: true,
          order: [ ['createdAt', 'asc'] ],
          include: [User]
        }
      ]
    })
    .then(posts => response.json({ posts }))
    .catch(error => response.status(422).json(error));
}

function create(request, response) {
  const { user, body: { post }} = request;

  return user
    .createPost(post)
    .then(post =>
      post
        .createNotification({ UserId: user.get('_id') })
        .then(() => post)
    )
    .then(post => response.status(201).json({ post }))
    .catch(error => response.status(422).json(error));
}

function destroy(request, response) {
  const { params: { id }} = request;

  return Post
    .destroy({
      where: { _id: id }
    })
    .then(isDeleted => isDeleted ? Post.findById(id, { paranoid: false }) : null)
    .then(post => response.json({ post }))
    .catch(error => response.status(422).json(error));
}

function like(request, response) {
  const { user, params: { id }} = request;
  const postLike = {
    PostId: id,
    UserId: user.get('_id')
  };

  return PostLike
    .findOrCreate({
      where: postLike,
      defaults: postLike
    })
    .spread((postLike, isCreated) => {
      if (isCreated) {
        return postLike
          .createNotification({ UserId: user.get('_id') })
          .then(() => postLike);
      }
      return postLike
        .destroy()
        .then(() => postLike);
    })
    .then(postLike => response.json({ postLike }))
    .catch(error => response.status(422).json(error));
}

export default { index, create, destroy, like };
