var http = require("http");

var routes = {GET:[], POST:[], PATCH:[], PUT:[], DELETE:[]};

routes.GET['/users'] = function(req, res) {
    res.writeHead(200, 'OK');
    res.end('GET ALL USERS');
};

routes.GET['^/users/{num}'] = function(req, res) {
    res.writeHead(200, 'OK');
    res.end('GET SINGLE USERS');
};


routes.POST['/users'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end('POST USERS');
};

http.createServer(function (req, res) {
    // console.log(req.method);
    // console.log(req.url);

    res.writeHead(200, 'OK')

    // if(typeof routes[req.method][req.url] == 'function'){
    //     routes[req.method][req.url](req, res);
    // }else {
    //     res.writeHead(404, 'NOT FOUND');
    //     res.end();
    // }
}).listen(3000);

//^\/users\/[0-9]+$
//^\/users\/[0-9]+\/(firstname|lastname|birthday)$