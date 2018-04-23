var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var config = require("./config");
var DB = require("./config/db");
const fileUpload = require('express-fileupload');
var jwt = require("express-jwt");


var userControllers = require("./controllers/users");
var fileControllers = require("./controllers/files");
var loginControllers = require("./controllers/login");

DB.Init();

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

var jwtCheck = () => {
    return jwt({secret: config("jwt_secret"), resultProperty: 'local.users'});
};




/*************************************/
/************ user routes ************/
/*************************************/

// // get all users
// app.get("/api/users", userControllers.getAllUsers);
// // get specified user
// app.get("/api/users/:id", userControllers.getSingleUser);
// // create new user
// app.post("/api/users", userControllers.createUser);
// // deactivate a user
// app.delete("/api/users/:id", userControllers.deleteUser);
// manage file uploads
app.post("/api/files", fileControllers.uploadFile);
app.get("/api/files", fileControllers.getAllFiles);
app.delete("/api/files/:id", fileControllers.deleteFile);

//da definirame tri ruti. Prvata ruta /api/files (get all files), 2 rute e get ruta (/api/files/id, getOneFole), 3. delete ruta(/api/files/id).
//getAllFiles - get ruta i se aktivira metodot getAllFiles. 
//get api/files/id da dade informacii za eden fajl

app.get("/api/files/:id/download", fileControllers.downloadFile);

//Login
app.post("/api/login", loginControllers.login);

app.get("/api/token-test", jwtCheck(), (req, res) => {
    res.status(200);
    res.send('OK');

});

app.use((err, req, res, next) => {
    if(err.name == 'UnauthorizedError'){
        res.send('Invalid Token.')
    }
});

app.listen(config("server").port, () => {
    console.log('Server started on port ' + config("server").port);
});