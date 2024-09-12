const RepairShop = require('../model/repairshops')
const mysqlCon = require('../mysql/mysqlCon')

// Create

module.exports.createRepairShop = (req, res) => {
    const {name, address, details} = req.body;

    const query = `INSERT INTO repairshop (name, address, details) 
                   VALUES (?,?,?)`;
                   
    const values = [name, address, details];
    mysqlCon.query(query, values, (error, result) => {
        if(error){
            console.error('Error creating repairshop:', error);
            return res.status(500).json({error: 'Error creating repairshop'});
        }
        res.status(200).json({message: 'Repairshop created'});
    })
}

// Read

module.exports.getRepairShops = (req, res) => {
    const query = `SELECT * FROM repairshop`;

    mysqlCon.query(query, (error, result) => {
        if(error){
            console.error('Error getting repairshops:', error);
            return res.status(500).json({error: 'Error getting repairshops'});
        }
        res.status(200).json(result);
    })
}

// Update

module.exports.updateRepairShop = (req, res) => {
    const {name, address, details} = req.body;

    const query = `UPDATE repairshop SET name = ?, address = ?, details = ? WHERE repairShop_id = ?`;

    const values = [name, address, details, req.params.id];
    mysqlCon.query(query, values, (error, result) => {
        if(error){
            console.error('Error updating repairshop:', error);
            return res.status(500).json({error: 'Error updating repairshop'});
        }
        res.status(200).json({message: 'Repairshop updated'});
    })
}

// Delete

module.exports.deleteRepairShop = (req, res) => {
    const query = `DELETE FROM repairshop WHERE repairShop_id = ?`;

    const values = [req.params.id];
    mysqlCon.query(query, values, (error, result) => {
        if(error){
            console.error('Error deleting repairshop:', error);
            return res.status(500).json({error: 'Error deleting repairshop'});
        }
        res.status(200).json({message: 'Repairshop deleted'});
    })
}