'use strict';

import Express from 'express';
import Controller from './controller';
import * as auth from '../../auth/auth.service';

var router = Express.Router();

router.get('/', auth.isAuthenticated(), Controller.index);
router.post('/', auth.isAuthenticated(), Controller.create);
router.post('/:id/like', auth.isAuthenticated(), Controller.like);
router.delete('/:id', auth.isAuthenticated(), Controller.destroy);

module.exports = router;
