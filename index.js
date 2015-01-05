module.exports = createMiniHarp;

function createMiniHarp(){
	var connect = require('connect');
	var app = connect();
	return app;
}
