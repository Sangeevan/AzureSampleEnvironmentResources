const url = require('url');
const http = require('http');
const mysql = require('mysql');

var redis = require("redis");
var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var cacheConnection = redis.createClient(6380, 'azuresamplesnvironment.redis.cache.windows.net', 
        {auth_pass: 'LSySdkbXMBu1hWuC+M5vK2h2++rwLeFT6kz4mhOanr0=', tls: {servername: 'azuresamplesnvironment.redis.cache.windows.net'}});
   

exports.sampleRequest = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Azure Sample Environment');
};

exports.sample1Request = function (req, res) {

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
        conn.query('SELECT samplename,sampledescription FROM sampletable WHERE id=1', 
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Selected ' + results.length + ' row(s).');
                for (i = 0; i < results.length; i++) {
                    console.log('Row: ' + JSON.stringify(results[i]));
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end('First Service Response : ' + JSON.stringify(results));
                console.log('Done.');
            })
        conn.end(
        function (err) { 
                if (err) throw err;
                else  console.log('Closing connection.') 
        });
    };

};

exports.sample2Request = function (req, res) {

    http.get('http://azuresampleenvironmentservice02.azurewebsites.net', (res1) => {
    const { statusCode } = res1;
    const contentType = res1.headers['content-type'];

    let error;

    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        res1.resume();
        return;
    }

    res1.setEncoding('utf8');
    let rawData = '';
    res1.on('data', (chunk) => { rawData += chunk; });
    res1.on('end', () => {
        try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('Second Service Response : ' + JSON.stringify(parsedData));
        } catch (e) {
        console.error(e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });
};

exports.sampleFunctionRequest = function (req, res) {

    http.get('http://azuresampleenvironmentfunction.azurewebsites.net/api/HttpTrigger1', (res1) => {
    const { statusCode } = res1;
    const contentType = res1.headers['content-type'];

    let error;

    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    }

    if (error) {
        console.error(error.message);
        res1.resume();
        return;
    }

    res1.setEncoding('utf8');
    let rawData = '';
    res1.on('data', (chunk) => { rawData += chunk; });
    res1.on('end', () => {
        try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('Function Response : ' + JSON.stringify(parsedData));
        } catch (e) {
        console.error(e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });
};

exports.samplecachetest = function (req, res) {

    cacheConnection.set('key', 'Sample cache value', (err, reply) => {
        console.log(reply);
    });
      
    cacheConnection.get('key', (err, reply) => {
        console.log(reply);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(reply);
    });

};

exports.testRequest = function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var response = {
            "text": "Post Request Value is  " + postBody.value
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};