const express = require('express')
const router = express.Router()

const customerController =  require('../controllers/customerController')

// Create

router.post('/create', customerController.createCustomer)

// Read

router.get('/customer', customerController.getCustomer)

// Update

router.put('/update/:id', customerController.updateCustomer)

// Delete

router.delete('/delete/:id', customerController.deleteCustomer)

module.exports = router;