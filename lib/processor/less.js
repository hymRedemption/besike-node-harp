module.exports = makeLess;

function makeLess(root){

	return function(req, res, next){

		var less = require('less');
		var fs = require('fs');
		var path = require('path');

		if(path.extname(req.url) === ".css"){
			var dir = path.dirname(root + req.url);
			var lessFilePath = dir + "/" + path.basename((root + req.url), '.css') + '.less';
			fs.readFile(root + req.url, {encoding: "utf8"}, function(errCss, cssFile){
				if(errCss){
					fs.readFile(lessFilePath, {encoding: "utf8"}, function(errLess, lessFile){
						if(errLess){
							next();
						}
						else{
							less
								.render(lessFile) 
								.then(function(output){

									res.setHeader('Content-Type', 'text/css; charset=UTF-8');
									res.setHeader('Content-Length', output.css.length);
									res.end(output.css);
						});
						}
					});
				}
				else{
					res.setHeader('Content-Type', 'text/css; charset=UTF-8');
					res.setHeader('Content-Length', cssFile.length);
					res.end(cssFile);
				}
			});
		}
		else{
			next();
		}
	};

}
