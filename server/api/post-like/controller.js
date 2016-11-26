'use strict';

import { PostLike } from '../../sqldb';

function index(request, response) {
  const { query: { ids }} = request;
  const where = {};

  if(ids && ids.length) {
    where._id = { $in: ids };
  }

  return PostLike
    .findAll({ where })
    .then(postLikes => response.json({ postLikes }))
    .catch(error => response.status(422).json(error));
}

export default { index };
