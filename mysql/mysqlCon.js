require("dotenv").config();

// MySQL Stuff

// Note: go to your DBeaver and check grab the credentials of a user then replace the necessary info in the env.
// If an error message comes out that "Access denied for user "achuchu", you need to grant privileges to the user
// through DBeaver. If everything works, "Connected!" should be printed in the terminal.

var mysql = require('mysql')

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL DB");
  });

module.exports = con;