module.exports = makeJade;

function makeJade(root){

	return function(req, res, next){

		var jade = require('jade');
		var fs = require('fs');
		var path = require('path');

		if(path.extname(req.url) === ".html"){
			var dir = path.dirname(root + req.url);
			var jadefile = dir + "/" + path.basename((root + req.url), '.html') + '.jade';
			fs.readFile(root + req.url, {encodeing: "utf8"}, function(errHtml, htmlFile){
				if(errHtml){
					fs.readFile(jadefile, {encodeing: "utf8"}, function(errJade, jadeFile){
						if(errJade){
							next();
						}
						else{
							var html = jade.render(jadeFile);
							res.end(html);
						}
					});
				}
				else{
					res.end(htmlFile);
				}
			});
		}
		else{
			next();
		}
	};
}
