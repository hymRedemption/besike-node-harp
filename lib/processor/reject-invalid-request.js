module.exports = rejectInvalidReq;

function rejectInvalidReq(req, res, next){
	var path = require('path');

	var extname = path.extname(req.url);

	if(extname === ".jade" || extname === ".less"){
		res.statusCode = 404;
		res.end();
	}
	else{
		next();
	}
}
