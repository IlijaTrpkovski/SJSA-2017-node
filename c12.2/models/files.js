var mongoose = require("mongoose");

const File = mongoose.model('file', {
    file_name: String, // original file name
    object_name: String, // prefixed file name
    mime: String, // mimetype
    md5: String, // md5 hash
});

var addFile = (fileData, cb) => {
    var f = new File(fileData)
    f.save((err) => {
        if(err){
            cb(err);
            return;
        }
        cb(null);
    });
}

var deleteFile = ((id,cb) => {
    File.remove({_id: id}, (err) => {
        if(err) {
            cb(err)
            return;
        }
        cb(null);
        return;
    })
});

var getAllFiles = (cb) => {   //ovoj metod 
    File.find({}, (err, data) => { //prima kako parametar edna callback funkcija koja prima error i podatoci. {} praznite zagradi znaci da gi vrati site fajlovi. prima 2 parametri prviot e query a vtoriot e callback funkcija
        if(err){
            cb(err, null);
            return;
        }
            cb(null, data);  //(greska, podatoci)
        return;
    })
}

var getOneFile = (id,cb) => {
    File.findOne({_id: id}, (err, data) => {
        if(err) {
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    })
}

module.exports = {
    addFile,
    deleteFile,
    getAllFiles,
    getOneFile
}