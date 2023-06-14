const { Router } = require('express');
const { postActivity, getActivities, updateActivity, deleteActivity } = require('../controllers/activities.controller');
const router = Router();

router.post('/activity', postActivity);
router.get('/activity', getActivities);
router.put('/activity/:id', updateActivity)
router.delete('/activity/', deleteActivity);

module.exports = router;