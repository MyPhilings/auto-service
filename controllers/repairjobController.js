const repairJob = require('../model/repairjobs')
const mysqlCon = require('../mysql/mysqlCon')

// Create

module.exports.createRepairJob = (req, res) => {
    const { vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status } = req.body;

    // Check if the vehicle exists in the database
    const checkVehicleQuery = `SELECT * FROM vehicle WHERE vehicle_id = ?`;
    const checkVehicleValues = [vehicle_id];

    mysqlCon.query(checkVehicleQuery, checkVehicleValues, (err, vehicleResults) => {
        if (err) {
            console.error('Error checking vehicle:', err);
            return res.status(500).send('Error checking vehicle');
        }

        if (vehicleResults.length === 0) {
            return res.status(400).json({ error: 'Vehicle not found' });
        }
        console.log("Vehicle:", vehicleResults);

        // Check if the employee exists and matches with user_id from user table
        const checkEmployeeQuery = `
            SELECT e.employee_id, e.user_id 
            FROM employee e 
            WHERE e.employee_id = ? AND EXISTS (
                SELECT 1 FROM user u WHERE u.user_id = e.user_id
            )`;
        const checkEmployeeValues = [employee_id];

        mysqlCon.query(checkEmployeeQuery, checkEmployeeValues, (err, employeeResults) => {
            if (err) {
                console.error('Error checking employee:', err);
                return res.status(500).send('Error checking employee');
            }

            if (employeeResults.length === 0) {
                return res.status(400).json({ error: 'Employee not found or not associated with any user' });
            }
            console.log("Employee:", employeeResults);

            const userId = employeeResults[0].user_id;

            // Check if the employee belongs to the specified shop or is a manager
            const checkShopQuery = `
                SELECT * FROM employee 
                WHERE (employee_id = ? AND shop_id = ?) 
                OR (employee_id = ? AND manager_id IS NULL)`;
            const checkShopValues = [employee_id, shop_id, employee_id];

            mysqlCon.query(checkShopQuery, checkShopValues, (err, shopResults) => {
                if (err) {
                    console.error('Error checking shop:', err);
                    return res.status(500).send('Error checking shop');
                }

                if (shopResults.length === 0) {
                    return res.status(400).json({ error: 'Employee does not belong to the specified shop or is not a manager' });
                }
                console.log('Shop:', shopResults);

                // Log values before insertion
                console.log('Inserting repair job with values:', {
                    vehicle_id, 
                    employee_id, 
                    shop_id, 
                    problemType, 
                    description, 
                    startDate, 
                    endDate, 
                    status
                });

                // If all checks pass, insert the new repair job using the user_id
                const query = `
                    INSERT INTO repairjob (vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                const values = [vehicle_id, userId, shop_id, problemType, description, startDate, endDate, status];

                mysqlCon.query(query, values, (error, result) => {
                    
                    if (error) {
                        console.error('Error creating repairjob:', error);
                        return res.status(500).json({ error: 'Error creating repairjob', details: error.message });
                    }
                    res.status(201).json({ "New repairjob": { ...req.body, id: result.insertId } });
                    console.log("Inserted info in repairjob:" + result);
                });
            });
        });
    });
};


// Read

// get all repairjob base
module.exports.getRepairJobs = (req, res) => {
    const{ vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate,status } = req.body;

    const query = 'Select * from repairjob' ;
    const values = [vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error getting repairjobs:', error);
            return res.status(500).json({ error: 'Error getting repairjobs' });
        }
        res.status(200).json(result);
    })
}

// get specified repairjobs from employee
module.exports.getSpecificRepairJobs = (req, res) => {
    
    const user_id = req.params.user_id;

    console.log('Received request for user_id:', req.params.user_id);

    const checkUserQuery = `SELECT employee_id, specialty FROM employee WHERE user_id = ?`;
    const checkValues = [user_id];

    mysqlCon.query(checkUserQuery, checkValues, (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).send('Error checking user');
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        console.log('User found:', user);

        let query;
        let values;

        if (user.specialty === 'Manager') {
            query = `
                SELECT r.* FROM repairjob r
                JOIN employee e ON r.employee_id = e.employee_id
                WHERE e.manager_id = ? OR r.employee_id = ?
            `;
            values = [user.employee_id, user.employee_id];
        } else {
            query = `
                SELECT * FROM repairjob
                WHERE employee_id = ?
            `;
            values = [user.employee_id];
        }

        console.log('Executing query:', query);
        console.log('With values:', values);

        mysqlCon.query(query, values, (err, result) => {
            if (err) {
                console.error('Error getting repairjobs:', err);
                return res.status(500).json({ error: 'Error getting repairjobs' });
            }
            console.log('Query result:', result);
            res.status(200).json(result);
        })  
    })
}

// Update

module.exports.updateRepairJob = (req, res) => {
    const{ vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate,status } = req.body;

    const query = `UPDATE repairjob SET vehicle_id = ?, employee_id = ?, shop_id = ?, problem_type =?, description = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?`;
    const values = [vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status];

    mysqlCon.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating repairjob:',err);
            return result.status(500).json({err: 'Error updating repairjob'});
        }
        res.status(200).json(result);
    })
}

// Delete
module.exports.deleteRepairJob = (req, res) => {
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
