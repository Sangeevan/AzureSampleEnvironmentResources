const http = require('http');
const mysql = require('mysql');

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "application/json"});
    

var conn = mysql.createConnection(
    {
        host: "azuresamplesnvironmentmysqlserver.mysql.database.azure.com", 
        user: "SampleAdmin@azuresamplesnvironmentmysqlserver", 
        password: "SamplePassword1", 
        database: "sampledatabase", 
        port: 3306, 
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
       readData();
	}	
});

function readData(){
    conn.query('SELECT samplename,sampledescription FROM sampletable WHERE id=2', 
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            response.end(JSON.stringify(results));
            console.log('Done.');
        })
   conn.end(
       function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });
};

});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
