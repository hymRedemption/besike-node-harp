module.exports = makeJade;

function makeJade(root){

	return function(req, res, next){

		var jade = require('jade');
		var fs = require('fs');
		var path = require('path');

		if(path.extname(req.url) === ".html"){
			var dir = path.dirname(root + req.url);
			var jadeFilePath = dir + "/" + path.basename((root + req.url), '.html') + '.jade';
			fs.readFile(root + req.url, {encoding: "utf8"}, function(errHtml, htmlFile){
				if(errHtml){
					fs.readFile(jadeFilePath, {encoding: "utf8"}, function(errJade, jadeFile){
						if(errJade){
							next();
						}
						else{
							var html = jade.render(jadeFile);
							
							res.setHeader('Content-Length', html.length);
							res.setHeader('Content-Type', 'text/html; charset=UTF-8');
							res.end(html);
						}
					});
				}
				else{
					res.setHeader('Content-Length', htmlFile.length);
					res.setHeader('Content-Type', 'text/html; charset=UTF-8');
					res.end(htmlFile);
				}
			});
		}
		else{
			next();
		}
	};
}
