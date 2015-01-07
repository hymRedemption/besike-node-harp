module.exports = fileTransform;

var path = require('path');
var fs = require('fs');
var jade = require('jade');
var less = require('less');

var headType = { 
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8'
};
var targetType = {
    '.html': '.jade',
    '.css': '.less'
};

var processors ={
    ".html": function(data, head, callback){
        var html = jade.render(data);
        callback(null, html, head);
    },
    ".css": function(data, head, callback){
        less
            .render(data)
            .then(function(output){
                callback(null, output.css, head);
            });
    }
};

function fileTransform(root){

    return function(req, res, next){
        var extname = path.extname(req.url);
        processFile(root + req.url, extname, function(err, data, headContentTy){
            if(err) {
                next();
            }else {
                res.setHeader('Content-Type', headContentTy);
                res.setHeader('Content-Length', data.length);
                res.end(data);
            }
        });
    };
}

function processFile(file ,type, callback){


    if(type === ".html" || type === ".css") {
        var dir = path.dirname(file);
        var transFilePath = dir + '/' +path.basename(file, type) + targetType[type];

        fs.exists(transFilePath, function(exists){
            if(exists) {
                fs.readFile(file, {encoding: 'utf8'}, function(origErr, origFileData){
                    if(origErr) {
                        fs.readFile(transFilePath, {encoding: 'utf8'}, function(transErr, transFileData){
                            if(transErr) {
                                callback({ msg: "No file"});
                            }else {
                                var process = processors[type];
                                console.log("t");
                                process(transFileData, headType[type], callback);
                            }
                        });
                    }else {
                        callback(null, origFileData, headType[type]);
                    }
                });

            }else {
                callback({ msg: "Pass to the next"});
            }
        });
        

    }else {
        callback({msg: "Can not process this type"})
    }
}
