module.exports = createMiniHarp;

function createMiniHarp(root){
	var connect = require('connect');
	var serveStatic = require('serve-static');
	var makeJade = require('./lib/processor/jade.js');


	var app = connect();
	var currentTime = require('currenttime')

	app
	   .use(currentTime)
	   .use(makeJade(root))
	   .use(serveStatic(root));

	return app;
}
