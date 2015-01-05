#!/usr/bin/env node

var parseArgs = require('minimist');
var createMiniHarp = require('mini-harp');

var port = 4000;
var args = parseArgs(process.argv);
var app = createMiniHarp();

if(args["port"]){
	port = args["port"];
}

console.log("Starting mini-harp on http://localhost:%d", port);
app.listen(port);
