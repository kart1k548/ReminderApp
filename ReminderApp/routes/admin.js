const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/', adminController.getAddReminder);

// /admin/products => GET
router.get('/reminders', adminController.getReminders);

// /admin/add-product => POST
router.post('/add-reminder', adminController.postAddReminder);

router.get('/edit-reminder/:reminderId', adminController.getEditReminder);

router.post('/edit-reminder', adminController.postEditReminder);

router.post('/delete-reminder', adminController.postDeleteReminder);

module.exports = router;
