const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicleController');

// Create

router.post('/create', vehicleController.createVehicle);

// Read

router.get('/', vehicleController.getVehicle)

// Update

router.put('/update/:id', vehicleController.updateVehicle)

// Delete

router.delete('/delete/:id', vehicleController.deleteVehicle)

module.exports = router;