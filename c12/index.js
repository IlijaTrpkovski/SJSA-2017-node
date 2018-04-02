var express = require ("express");  //ekspres e biblioteka za kreiranje na apinja, te http server, nesto preku browser da ispingas i da ti vrati podatoci
var cors = require ("cors"); //da komuniciraat front end i back end
var mongoose = require ("mongoose"); //biblioteka za node js da komunicira so mongodb
var bodyParser = require ("body-parser"); //del od ekspress sto sluzi koga ke ispratime podatoci na server da gi isparsa kako json

//KONEKCIJA SO MONGO
mongoose.connect("mongodb://127.0.0.1/reactgram", (err) =>{ //se konektira so mongo
    if(err){
        console.error("Could not connect to database.");
        console.log(err);
    }
});


//MODEL NA EDEN USER
const User = mongoose.model('user', {  //za da mozeme da zapiseme podatoci vo Mongodb treba da napravime sema. Definirame model na podatocite
    firstname: String,
    lastname: String, 
    handle: String, //mandatory
    email: String, //mandatory
    date_of_birth: Date,
    pohne: String,
    location: {
        country: String,
        city: String,
        gps: {
            lat: Number,
            lng: Number
        },
    },
    avatar: String,
    password: String //mandatory
});


var app = express(); //kreiranje express aplikacija
app.use(bodyParser.json()); //komanda za koga ke ispratime na server podatoci da gi isparsa vo json
app.use(cors()); //da moze da se pravat povici od eden na drug domain

// user routes

//GET ALL USERS
app.get("/api/users",(req,res) => {  //definiranje na ruta. Kreirame get povik sto ke raboti na taa i taa ruta
    User.find({},{password:0, __v:0}, (err, data) => { //se povikuva user modelot. So user.find so {prazni zagradi}, se povikuva, site podatoci
        if(err) {
            res.status(500);    //ako ima greska vrakja Internal server error
            res.send("Internal server error.")
            return;  //izlaganje od funkcijata
        }  
        res.status(200); //statusot e 200 => OK
        res.json(data);  
        return; //vrakja podatoci sto sme zele od baza
    });
});

// GET SPECIFIED USER
app.get("/api/users/:id",(req,res) => { //vo rutata se stava :id(promenliva)
    User.findOne({_id: req.params.id}, (err, data) => { //zema user so ide kade sto params.id kade sto params.id e :id odnosno userot so id sto go barame
        if(err){ 
            res.status(500);
            res.send("Internal server error.");
            return;
        }
        res.status(200);
        res.json(data);
        return;
    });
});

// CREATE NEW USER
app.post("/api/users",(req,res) => {  //pred da zapiseme podatoci vo baza mora prvo da se napravi validacija
    var isValid = 
        req.body.handle != undefined && req.body.handle != "" &&
        req.body.email != undefined && req.body.email != "" &&
        req.body.password != undefined && req.body.password != "";

    if(isValid){  //ako site od uslovite gore se validni prodolzuva monatamu.
        var u = new User(req.body); //kreira objekt sto ke se zapise vo baza
        u.save((err) => { //go zapisuva vo baza userot
            if(err){
                res.status(500);
                res.send("Internal server error.")
                return;
            }
            res.status(200);
            res.send("OK.")
            return;
        });
    } else{
        res.status(400);
        res.send("Bad request");
        return;
    }
   
});

//DEACTIVATE A USER
app.delete("/api/users/:id", (req, res) => {
    user.deleteOne({_id: req.params.id}, (err, data) => {
        if(err){
            res.status(500);
            res.send("Internal server error.");
            return;
        }
        res.status(200);
        res.send("OK.");
        return;

    });
});

app.listen(8080, () =>{
    console.log('server started on port 8080')
});