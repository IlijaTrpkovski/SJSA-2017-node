var mongoose = require("mongoose");

const User = mongoose.model('user', {
    fullname: String,
    handle: String, // mandatory
    email: String,
    password: String
});

var checkUser = (email, handle) => {   //za proveruvanje dali korisnikot postio
    return new Promise((resolve, reject) => {
        User.findOne({$or: [{email: email}, {handle: handle}]}, (err, data) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
};

var createUser = (data) => {  //ni trwba za da mozeme da kreirame korisnik
    return new Promise((resolve, reject) => {
        data.passwrod = data.pwd1; 
        var user = new User(data);
        user.save(function(err) {
            if(err) {
                return reject(err);
            }
            return resolve();
        });
    });
};

var validateUser = (email, password, cb) => {
    User.findOne({email: email, password: password}, function (err, data) {
    if(err){
        cb(err, null);
        return;
    }
    cb(null, data);
    })
}

module.exports = {
    checkUser,
    createUser
}