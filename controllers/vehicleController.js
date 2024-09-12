const Vehicle = require('../model/vehicle')
const mysqlCon = require('../mysql/mysqlCon')

// Create

module.exports.createVehicle = (req, res) => {
    const{customer_id, model, brand, year, licensePlate} = req.body;

    const query =`Insert into vehicle( customer_id, model, brand, year, licensePlate) values (?, ?, ?, ?, ?)`;
    
    const values = [customer_id, model, brand, year, licensePlate];
    
    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error creating vehicles details:', error);
            return res.status(500).json({ error: 'Error creating vehicle details'});
        }
        res.status(201).json({ "New repairjob": {...req.body, id: result.insertId } });
    })
}

// Read

module.exports.getVehicle= (req, res) => {
    const{ customer_id, model, brand, year, licensePlate } = req.body;

    const query = 'Select * from vehicle' ;
    const values = [customer_id, model, brand, year, licensePlate];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error fetching the vehicle description:', error);
            return res.status(500).json({ error: 'Error fetching the vehicle description' });
        }
        res.status(200).json(result);
    })
}

// Update

module.exports.updateVehicle = (req, res) => {
    const{ customer_id, model, brand, year, licensePlate } = req.body;

    const query = `UPDATE repairjob SET vehicle_id = ?, employee_id = ?, shop_id = ?, problem_type =?, description = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?`;
    const values = [customer_id, model, brand, year, licensePlate];

    mysqlCon.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating vehicle description:',err);
            return result.status(500).json({err: 'Error updating vehicle description'});
        }
        res.status(200).json(result);
    })
}

// Delete
module.exports.deleteVehicle = (req, res) => {
    const{ vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate,status } = req.body;
    const query = `DELETE FROM repairjob WHERE id = ?`;
    const values = [vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status];
    
    mysqlCon.query (query, values, (err, result) => {
        if(err){
            console.error('Error deleting reparjob:', err);
            return result.status(500).json({err: 'Error deleting reparjob'});
        }
    })
}
