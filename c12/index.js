var express = require ("express");  
var cors = require ("cors"); 
var bodyParser = require ("body-parser"); 
var config = require("./config");
var DB = require ("./config/db");
const fileUpload = require('express-fileupload');

var userControlers = require("./controllers/users");
var fileControllers = require("./controllers/files");

DB.Init();

var app = express(); 
app.use(bodyParser.json()); 
app.use(cors()); 
app.use(fileUpload());

//GET ALL USERS
app.get("/api/users",userControlers.getAllUsers);

// GET SPECIFIED USER
app.get("/api/users/:id",userControlers.getSingleUser);

// CREATE NEW USER
app.post("/api/users", userControlers.createUser);

//DEACTIVATE A USER
app.delete("/api/users/:id", userControlers.deleteUser);

//MANAGE FILE UPLOADS
app.post("/api/files", fileControllers.uploadFile);

app.delete("/api/files/:id", fileControllers.deleteUser);

app.get("api/files/:id/download", fileControllers.downloadFile);

app.listen(config("server").port, () =>{
    console.log('Server started on port ' + config("server").port);
});