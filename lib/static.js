var _ = require("underscore"),
	express = require("express"),
	path = require('path');

exports.disableDefaultSetup = function(keystone) {
	//set empty keystone static paths
	keystone.set('static',[]);
}
exports.setup = function(keystone) {
	//override express static for finer cache controls
	var rootOptions = {
			index: false,
			maxAge: '1d',
			redirect: false,
			setHeaders: function (res, path) {
				res.set('x-timestamp', Date.now())
			}
		},
		overlays = {
			img: {
				maxAge: '30d'
			},
		},
		publicTree = {
			fonts: "default",
			js:"default",
			styles: "default",
			images: "img"
		};

	
	//define app's own set of static dirs.
	_.each(publicTree, function(optionsKey, dir) {
		var options = _.extend(rootOptions, overlays[optionsKey]),
			dirPath = __dirname + path.sep + '..' + path.sep + 'public' + path.sep + dir;
		if (keystone.get('logger')) {
			console.log('Serving ' + dirPath + ' as static directory, with following max-age ' + options.maxAge);
		}
		keystone.app.use('/keystone', express.static(dirPath, options));
	});	
};