var _ = express = require("express"),
	path = require('path');

exports.disableDefaultSetup = function(keystone) {
	//set empty keystone static paths
	keystone.set('static',[]);
}
exports.setup = function(keystone) {
	//add a max-age for browser caching
	var libFullPath = module.paths[0],
		rootFullPath = libFullPath.substring(0,libFullPath.indexOf('/lib/node_modules')),
	 	staticPath = rootFullPath + '/public'
	keystone.app.use(express.static(staticPath, {
		maxAge: '8640000000'
	}));
};