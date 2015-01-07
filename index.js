module.exports = createMiniHarp;

function createMiniHarp(root){
	var connect = require('connect');
	var serveStatic = require('serve-static');
	var makeJade = require('./lib/processor/jade.js');
	var makeLess = require('./lib/processor/less.js');
	var rewriteUrl = require('./lib/processor/rewrite-url');
	var rejInvalidReq = require('./lib/processor/reject-invalid-request');
	var fileTrans = require('./lib/processor/file-transform');


	var app = connect();
	var currentTime = require('currenttime')

	app
	   .use(rewriteUrl)
	   .use(rejInvalidReq)
	   .use(currentTime)
	   .use(fileTrans(root))
	   .use(serveStatic(root));

	return app;
}
