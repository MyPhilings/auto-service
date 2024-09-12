const express = require ('express')
const router = express.Router()

const employeeController = require('../controllers/employeeController')

// Create

router.post('/create', employeeController.createEmployee)

// Read

router.get('/', employeeController.getEmployees)
router.get('/manager', employeeController.getManagers)
router.get('/manager/:id/subordinates', employeeController.getSubordinates)
router.get('/:id/shop', employeeController.getEmployeeShop)
router.get('/:id/repairs', employeeController.getEmployeeRepairJobs)

// Update

router.put('/update/:id', employeeController.updateEmployee)

// Delete

router.delete('/delete/:id', employeeController.deleteEmployee)

module.exports = router;