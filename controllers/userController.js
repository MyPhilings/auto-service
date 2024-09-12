const User = require("../model/user")
const mysqlCon = require('../mysql/mysqlCon')

module.exports.createUser = (req, res) => {
    const { lastName, firstName, email, username, password, userType } = req.body;

    // Check if email or username already exists
    const checkQuery = `SELECT * FROM user WHERE email = ? OR username = ?`;
    const checkValues = [email, username];

    mysqlCon.query(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }

        if (checkResult.length > 0) {
            // Either email or username already exists
            return res.status(400).json({ error: 'Email or Username already exists' });
        } else {
            // Proceed with creating the user
            const insertQuery = `INSERT INTO user (lastName, firstName, email, username, password, userType) 
                                 VALUES (?, ?, ?, ?, ?, ?)`;
            const insertValues = [lastName, firstName, email, username, password, userType];

            mysqlCon.query(insertQuery, insertValues, (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error creating user:', insertError);
                    return res.status(500).json({ error: 'Error creating user' });
                }

                res.status(201).json(insertResult);
            })
        }
    })
}

// Read
module.exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM user'

    mysqlCon.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Error fetching users' });
        }

        res.status(200).json(results);
    })
}


module.exports.getUser = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM user WHERE username = ? AND password = ?'

    const values = [username, password];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ error: 'Error fetching user' });
        }
        
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    })
}

// Update
module.exports.updateUser = (req, res) => {
    const { lastName, firstName, email, username, password, userType } = req.body;

    const query = `UPDATE user SET lastName = ?, firstName = ?, email = ?, username = ?, password = ?, userType = ? WHERE user_id = ?`;

    const values = [lastName, firstName, email, username, password, userType, req.params.id];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Error updating user' });
        }

        res.status(200).json({ message: 'User updated' })
    })
}

// Delete

module.exports.deleteUser = (req, res) => {
    const query = `DELETE FROM user WHERE user_id = ?`;

    const values = [req.params.id];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        res.status(200).json({ message: 'User deleted' })
    })
}