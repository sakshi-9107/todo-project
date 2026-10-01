const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",          // your MySQL username
    password: "Sakshi123",  // your MySQL password
    database: "tododb"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database ✅");
    }
});

module.exports = db;