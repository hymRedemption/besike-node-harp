module.exports = fileTransform;

var path = require('path');
var fs = require('fs');
var jade = require('jade');
var less = require('less');

function fileTransform(root){

    return function(req, res, next){
        var extname = path.extname(req.url);
        asyncProcessFile(root + req.url, extname, function(err, data, headContentTy){
            if(err){
                next();
            }
            else{
                res.setHeader('Content-Type', headContentTy);
                res.setHeader('Content-Length', data.length);
                res.end(data);
            }
        });
    };
}

function asyncProcessFile(file ,type, callback){

    var headType = { 
        '.html': 'text/html; charset=UTF-8',
        '.css': 'text/css; charset=UTF-8'
    };
    var targetType = {
        '.html': '.jade',
        '.css': '.less'
    };

    if(type === ".html" || type === ".css"){
        var dir = path.dirname(file);
        var transFilePath = dir + '/' +path.basename(file, type) + targetType[type];
        

        fs.readFile(file, {encoding: 'utf8'}, function(origErr, origFileData){
            if(origErr){
                fs.readFile(transFilePath, {encoding: 'utf8'}, function(transErr, transFileData){
                    if(transErr){
                        callback({ msg: "No file"});
                    }
                    else{
                        var processors ={
                            ".html": function(){
                                var html = jade.render(transFileData);
                                callback(null, html, headType[type]);
                            },
                            ".css": function(){
                                less
                                    .render(transFileData)
                                    .then(function(output){
                                        callback(null, output.css, headType[type]);
                                    });
                            }

                        }
                        var process = processors[type];
                        process();
                    }
                });
            }
            else{
                callback(null, origFileData, headType[type]);
            }
        });
    }
    else{
        callback({msg: "Can not process this type"})
    }
}
