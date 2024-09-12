const express = require('express')
const router = express.Router()

const scheduleController = require('../controllers/scheduleController')

// Create

router.post('/create', scheduleController.createSchedule)

// Read

router.get('/', scheduleController.getSchedule)

// Update

router.put('/update/:id', scheduleController.updateSchedule)

// Delete

router.delete('/delete/:id', scheduleController.deleteSchedule)

module.exports = router;