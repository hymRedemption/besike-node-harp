#!/usr/bin/env node

var parseArgs = require('minimist');
var createMiniHarp = require('mini-harp');

var args = parseArgs(process.argv);

var port = 4000;
if(args["port"]){
	port = args["port"];
}

var root = process.cwd() + "/verify/assets";
if(args._.length > 2){
	root = process.cwd() + args._[2];
}

var app = createMiniHarp(root);

console.log("Starting mini-harp on http://localhost:%d", port);


app.listen(port);
