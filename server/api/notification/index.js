'use strict';

import Express from 'express';
import Controller from './controller';
import * as auth from '../../auth/auth.service';

var router = Express.Router();

router.get('/', auth.isAuthenticated(), Controller.index);
router.post('/open', auth.isAuthenticated(), Controller.open);

module.exports = router;
