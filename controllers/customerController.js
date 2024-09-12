const Customer = require('../model/customer');
const mysqlCon = require('../mysql/mysqlCon');

// Create

module.exports.createCustomer = (req, res) =>{
    const {user_id} = req.body;

    const query = `INSERT INTO customer (user_id) VALUES (?)`;
    
    const values = [user_id];
    
    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error creating customer:', error);
            return res.status(500).json({ error: 'Error creating customer' });
        }
        return res.status(201).json({ message: 'Customer created' });
    })
}

// Read

// Get all Customer
module.exports.getCustomer = (req, res) => {
    const query = `SELECT * FROM customer`;
    
    mysqlCon.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching customers:', error);
            return res.status(500).json({ error: 'Error fetching customers' });
        }
        res.status(200).json(results);
    })
}

// Update

module.exports.updateCustomer = (req, res) => {
    const {user_id} = req.body;
    const {id} = req.params;

    const query = `UPDATE customer SET user_id = ? WHERE id = ?`;
    
    const values = [user_id, id];
    
    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error updating customer:', error);
            return res.status(500).json({ error: 'Error updating customer' });
        }
        return res.status(200).json({ message: 'Customer updated' });
    })
}

// Delete

module.exports.deleteCustomer = (req, res) => {
    const {id} = req.params;

    const query = `DELETE FROM customer WHERE id = ?`;
    
    const values = [id];
    
    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error deleting customer:', error);
            return res.status(500).json({ error: 'Error deleting customer' });
        }

        res.status(200).json({ message: 'Customer deleted' })
    })
}