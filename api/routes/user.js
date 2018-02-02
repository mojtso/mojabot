import express from 'express';
const router = express.Router();

import SignController from '../controllers/user';

router.post('/signup', SignController.create_user);

module.exports = router;