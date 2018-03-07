var fs = require('fs');
var http = require('http');

//users datastore
var DATA = [];

var url = require('url');
var routes = {
    GET: [],
    POST: [],
    PATCH: [],
    PUT: [],
    DELETE: []
}

function URLToRegex(url) {
    var output = url.replace(new RegExp('/', 'g'), '\\/')
    .replace(new RegExp('{num}', 'g'), '[0-9]+')
    .replace(new RegExp('{alnum}', 'g'), '[a-z0-9]+')
    .replace(new RegExp('{alpha}', 'g'), '[a-z]+')

    return '^' + output + '$';

}

routes.POST['/users'] = function (req, res) {

    var d = '';

    req.on('data', function(){
        d += data;
    });

    req.on('end', function(){
        DATA.push(JSON.parse(d));

        res.writeHead(200, 'OK');
        res.end('POST ALL USERS');
    });
};

routes.GET['/users'] = function (req, res) {

    var url = req.url.split('/');
    var id = parseInt(url[url.length - 1]);

    if(DATA[id] != undefined){
        res.writeHead(200, 'OK');
        res.end(JSON.stringify(DATA['id']));
    }else{
        res.writeHead(200, 'OK');
        res.end('Not Fount')   
    };
};

routes.DELETE["/users/{num}"] = function (req, res){

    var url = req.url.split('/');
    var id = parseInt(url[url.length - 1]);

    if(DATA[id] != undefined){
        DATA.splice(id, 1);
        res.writeHead(200, 'OK');
        res.end('USER DELETED');
    }else{
        res.writeHead(200, 'OK');
        res.end('Not Fount')   
    };

    res.writeHead(200, "OK");
    res.end("UPTADE USER DATA");
}

routes.PUT['/users/{num}'] = function (req,res){
    res.writeHead(200, 'OK');
    res.end('UPDATE USER DATA');
}

routes.PATCH["/users/{num}/(dirstname|lastname|bithdate|pasword|email)"] = function(req,res){
    var url = req.url.split('/');
    var id = parseInt(url[url.length - 2]);
    var property = parseInt(url[url.length-1]);

    var d = '';
    
        req.on('data', function(){
            d += data;
        });
    
        req.on('end', function(){
            DATA.push(JSON.parse(d));

    res.writeHead(200, 'OK');
    res.end('UPDATE PART OF USER\'S DATA');
})}

routes.GET['/users/{num}'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end('GET SINGLE USER');
}

http.createServer(function (req, res) { //request, response
   res.writeHead(200, 'OK');
   res.end('METHOD: ' + req.method + ' URL: ' + req.url);

   for(i in routes[req.method]){
       var regex = new RegExp(URLToRegex(i));

       if(regex.test(req.url)) {
           if(typeof routes[req.method][i] == 'function'){
               error = false;
               routes[req.method][i](req, res);
           }else {
               res.wrirteHead(500, 'Internal Server Error');
               res.end('');
           }
           break;
       }
   }

   if(error){
       res.writeHead(404, 'Not Found');
       res.end('Not Found');
   }
   
}).listen(3000);