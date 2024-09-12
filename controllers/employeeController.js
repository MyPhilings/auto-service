const Employee = require("../model/employees")
const mysqlCon = require('../mysql/mysqlCon')

// Create

module.exports.createEmployee = (req, res) => {
    const { user_id, specialty, manager_id, shop_id } = req.body;

    // Check if the manager belongs to the same shop if a manager_id is provided
    if (manager_id) {
        const checkManagerQuery = `
            SELECT * FROM employee 
            WHERE employee_id = ? AND shop_id = ? AND specialty = 'Manager'`;

        const checkValues = [manager_id, shop_id];

        mysqlCon.query(checkManagerQuery, checkValues, (err, results) => {
            if (err) {
                console.error('Error checking manager', err);
                return res.status(500).send('Error checking manager');
            }

            if (results.length === 0) {
                return res.status(400).json({ error: 'Manager does not belong to the specified shop or is not a manager' });
            }

            // If the manager is valid, proceed to insert the new employee
            insertEmployee(user_id, specialty, manager_id, shop_id, req, res);
        });
    } else {
        // If no manager_id is provided, proceed to insert the new employee
        insertEmployee(user_id, specialty, null, shop_id, req, res);
    }
};

const insertEmployee = (user_id, specialty, manager_id, shop_id, req, res) => {
    const query = `INSERT INTO employee (user_id, specialty, manager_id, shop_id) VALUES (?, ?, ?, ?)`;
    const values = [user_id, specialty, manager_id, shop_id];

    mysqlCon.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating an Employee', err);
            res.status(500).send(err);
        } else {
            res.status(201).json({ "New Employee": { ...req.body, id: result.insertId } });
        }
    });
};
// Read

// Get all employees
module.exports.getEmployees = (req, res) => {
    const query = `SELECT * FROM employee`;

    mysqlCon.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching Employees',err);
            return res.status(500).json({err: 'Error fetching Employees'});
        } else {
            res.status(200).json(result);
        }
    })
}

//Get the Shop handled by Employee
module.exports.getEmployeeShop = (req, res) =>{
    const query = `SELECT sh.* FROM repairshop as sh JOIN employee as em ON sh.repairShop_id = em.shop_id WHERE em.employee_id = ?`;

    mysqlCon.query(query, [req.params.id], (err, result) =>{
        if(err){
            console.error('Error fetching Employee Shop',err);
            return res.status(500).json({err: 'Error fetching Employee Shop'});
        }
        res.status(200).json(result);
    })
}

//Get Employee's Repair Job Schedules
module.exports.getEmployeeRepairJobs = (req, res) =>{
    const query = `SELECT rj.* FROM repairjob as rj JOIN employee as em ON rj.employee_id = em.employee_id WHERE em.employee_id = ?`;

    mysqlCon.query(query, [req.params.id], (err, result) =>{
        if(err){
            console.error('Error fetching Employee Repair Jobs',err);
            return res.status(500).json({err: 'Error fetching Employee Repair Jobs'});
        }
        res.status(200).json(result);
    })

}

// Get all managers
module.exports.getManagers = (req, res) =>{ 
    const query = `SELECT * FROM employee WHERE manager_id IS NULL`;

    mysqlCon.query(query, (err, result) =>{
        if(err){
            console.error('Error fetching Managers',err);
            return res.status(500).json({err: 'Error fetching Managers'});
        }
        res.status(200).json(result);
    })
}

//Get Manager's Subordinates
module.exports.getSubordinates = (req, res) => {
    const query = `
        SELECT e.employee_id, u.firstName, u.lastName, u.email, u.username, e.specialty, s.date, s.startTime, s.endTime, rj.status 
        FROM employee e
        JOIN user u ON e.user_id = u.user_id
        LEFT JOIN schedule s ON e.employee_id = s.employee_id
        LEFT JOIN repairjob rj ON s.repairJob_id = rj.repairJob_id
        WHERE e.manager_id = ?
    `;
    
    mysqlCon.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching Subordinates', err);
            return res.status(500).json({ err: 'Error fetching Subordinates' });
        }
        res.status(200).json(result);
    })
}


// Update

module.exports.updateEmployee = (req, res) => {
    const { employee_id, user_id, specialty, manager_id, shop_id } = req.body;

    const query = `UPDATE employee SET employee_id =?, user_id =?, specialty =?, manager_id =?, shop_id =? WHERE employee_id =?`;
   
    const values = [employee_id, user_id, specialty, manager_id, shop_id, req.params.id];

    mysqlCon.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating Employee',err);
            return res.status(500).json({err: 'Error updating Employee'});
        } else {
            res.status(200).json(result);
        }
    })
}

// Delete

module.exports.deleteEmployee = (req, res) => {
    const query = `DELETE FROM employee WHERE employee_id =?`;

    const values = [req.params.id];

    mysqlCon.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting Employee',err);
            return res.status(500).json({err: 'Error deleting Employee'});
        } else {
            res.status(200).json(result);
        }
    })
}