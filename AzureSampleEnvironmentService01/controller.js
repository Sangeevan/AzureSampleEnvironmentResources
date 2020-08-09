const http = require('http');
const url = require('url');
const mysql = require('mysql');

module.exports = http.createServer((req, res) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == '/' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.sampleRequest(req, res);

    }else if (reqUrl.pathname == '/sample1' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.sample1Request(req, res);

    }else if (reqUrl.pathname == '/sample2' && req.method === 'GET') {
            console.log('Request Type:' +
                req.method + ' Endpoint: ' +
                reqUrl.pathname);
    
            service.sample2Request(req, res);
        
    }else if (reqUrl.pathname == '/function' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.sampleFunctionRequest(req, res);
    
    }else if (reqUrl.pathname == '/cache' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.samplecachetest(req, res);
    
    }else if (reqUrl.pathname == '/test' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.testRequest(req, res);

    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});