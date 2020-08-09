const mysql = require('mysql');

var conn = mysql.createConnection(
    {
        host: "azuresamplesnvironmentmysqlserver.mysql.database.azure.com", 
        user: "SampleAdmin@azuresamplesnvironmentmysqlserver", 
        password: "SamplePassword1", 
        database: "sampledatabase", 
        port: 3306, 
        // ssl: false
    }
);

conn.connect(
	function (err) { 
	if (err) { 
		console.log("!!! Cannot connect !!! Error:");
		throw err;
	}
	else
	{
	   console.log("Connection established.");
           queryDatabase();
	}	
});

function queryDatabase(){
	   conn.query('DROP TABLE IF EXISTS sampletable;', function (err, results, fields) { 
			if (err) throw err; 
			console.log('Dropped sampletable table if existed.');
		})
  	   conn.query('CREATE TABLE sampletable (id serial PRIMARY KEY, samplename VARCHAR(50), sampledescription VARCHAR(100));', 
	      	function (err, results, fields) {
      			if (err) throw err;
			console.log('Created sampletable table.');
		})
	   conn.query('INSERT INTO sampletable (samplename, sampledescription) VALUES (?, ?);', ['Sample Web App 1', 'Sample Web App 1 was created to use for Azure cloud platform sample environment.'], 
      		function (err, results, fields) {
      			if (err) throw err;
			else console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
	   conn.query('INSERT INTO sampletable (samplename, sampledescription) VALUES (?, ?);', ['Sample Web App 2', 'Sample Web App 2 was created to use for Azure cloud platform sample environment.'], 
      		function (err, results, fields) {
      			if (err) throw err;
			console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
	   conn.query('INSERT INTO sampletable (samplename, sampledescription) VALUES (?, ?);', ['Sample Azure Function', 'Sample Azure Function was created to use for Azure cloud platform sample environment.'], 
		function (err, results, fields) {
      			if (err) throw err;
			console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
	   conn.end(function (err) { 
		if (err) throw err;
		else  console.log('Done.') 
		});
};