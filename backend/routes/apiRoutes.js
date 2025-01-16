const express = require('express');
const { sendNotification, getNotifications } = require('../controllers/notificationController');
const router = express.Router();

router.post('/notify', sendNotification);
router.get('/notifications', getNotifications);

module.exports = router;
 
