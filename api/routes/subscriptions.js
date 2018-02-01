import express from 'express';
const router = express.Router();

import SubscriberController from '../controllers/subscriber';

router.get('/', SubscriberController.get_subscriber);


module.exports = router;