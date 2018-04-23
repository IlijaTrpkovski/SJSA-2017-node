var FileModel = require("../models/files");
var fs = require("fs");  //paket za rabota so filesystem odnosno za rabota so fajlovi
var path = require ("path");

var uploadFile = (req, res) => {
    // console.log(req.files.dokument);
    // console.log(req.files.dokument.name);
    // console.log(req.files.dokument.encoding);

    var file = req.files.dokument;

    file.mv(__dirname + "/../uploads/" + file.md5 + "_" +file.name, (err) => {
        if(err){
            console.error('Could not upload file!');
            return;
        }

        var fileData = {
            file_name: file.name,
            object_name: file.md5 + "_" +file.name,
            mime: file.mimetype,
            md5: file.md5
        };

        FileModel.addFile(fileData, function(err){
            if(err){
                res.status(500);
                res.send('Internal server error');
                return;
            }
            res.status(200);
            res.send('OK');
            return;
        });
        console.log('File uploaded!');
    });

    res.send("ok");
}

var getAllFiles = (req,res) => {
    FileModel.getAllFiles((err, data) => {
        if(err){
            res.status(500);
            res.send("Internal server error");
        }
        res.status(200);
        res.json(data);  //eve gi podatocite
    })
}

var deleteFile = (req,res) => {
    FileModel.getOneFile(req.params.id, (err,data) => {
        if(err) {
            res.status(500);
            res.send('Internal server error');
            return;
        }

        fs.unlink(path.join(__dirname + "/../uploads/" + data.object_name), (err) => {
            if(err){
                res.status(500);
                res.send('Internal server error');
                return;
            }
        })
       FileModel.deleteFile(req.params.id, (err) => {
           if(err){
               res.status(500);
               res.send("Internal server error. COuld not remove file from database.");
               return;
           }
           res.status(200);
           res.send(200);
           return;
       });
       
        var deleteFile = (req,res) => {
        FileModel.getOneFile(req.params.id, (err,data) => {
            if(err) {
                res.status(500);
                res.send('Internal server error');
                return;
            }
    
    
           FileModel.deleteFile(req.params.id, (err) => {
               if(err){
                   res.status(500);
                   res.send("Internal server error. COuld not remove file from database.");
                   return;
               }
               res.status(200);
               res.send(200);
               return;
           })   
        })
    };
    })
};

var downloadFile = (req, res) => {
    FileModel.getOneFile(req.params.id, function(err, data){
        if(err){
            res.status(500);
            res.send("Intrnal server error. Could not find file");
            return;
        };
        res.download(path.join(__dirname, "./../uploads/", data.object_name), data.file_name, function (err){
            if(err){
                res.status(500);
                res.send("Internal server error. Could not find file on storage");
            }
        })
    });    
};

module.exports = {
    uploadFile,
    getAllFiles,
    deleteFile,
    downloadFile
}