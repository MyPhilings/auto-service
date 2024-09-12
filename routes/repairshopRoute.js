const express = require ('express')
const router = express.Router()

const repairshopController = require('../controllers/repairshopController')

// Create

router.post('/create',  repairshopController.createRepairShop)

// Read

router.get('/', repairshopController.getRepairShops)

// Update

router.put('/update/:id', repairshopController.updateRepairShop)

// Delete

router.delete('/delete/:id', repairshopController.deleteRepairShop)

module.exports = router;