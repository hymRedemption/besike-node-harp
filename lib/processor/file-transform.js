module.exports = fileTransform;

function fileTransform(root){

    return function(req, res, next){
        var extname = require('path').extname(req.url);

        processFile(root + req.url, extname, next, function(data, headContentTy){

            res.setHeader('Content-Type', headContentTy);
            res.setHeader('Content-Length', data.length);
            res.end(data);

        });

    };
}

function processFile(file ,type, failCall, succsCall){
    var path = require('path');
    var fs = require('fs');

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
                        failCall();
                    }
                    else{
                        console.log(type);
                        switch(type){
                            case '.html':
                                var jade = require('jade');

                                var html = jade.render(transFileData);
                                succsCall(html, headType[type]);
                                break;
                            case '.css':
                                var less = require('less');

                                less
                    .render(transFileData)
                    .then(function(output){
                        succsCall(output.css, headType[type]);
                    });
                        }
                    }
                });
            }
            else{
                succsCall(origFileData, headType[type]);
            }
        });
    }
    else{
        failCall();
    }
}
