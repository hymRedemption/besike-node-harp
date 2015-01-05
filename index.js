module.exports = createMiniHarp;

function createMiniHarp(){
	var connect = require('connect');
	var app = connect();
	var currentTime = require('currenttime')

	app.use(currentTime);

	return app;
}
