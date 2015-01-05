module.exports = createMiniHarp;

function createMiniHarp(root){
	var connect = require('connect');
	var serveStatic = require('serve-static');


	var app = connect();
	var currentTime = require('currenttime')

	app
	   .use(currentTime)
	   .use(serveStatic(root));

	return app;
}
