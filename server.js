const DB = require('./db/connection');
DB.promise().query('SELECT * FROM department').then(([db_data]) => console.log(db_data));