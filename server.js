// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv')().load();

// Require keystone
var keystone = require('keystone'),
	_ = require("underscore"),
	static = require("./lib/static"),
	rootOptions = {
		index: false,
		maxAge: '1d',
		redirect: false,
		setHeaders: function (res, path) {
			res.set('x-timestamp', Date.now())
		}
	},
	imgOptions = _.extend(rootOptions, {maxAge: '30d'}),
	staticPaths = {
		'public/fonts': rootOptions,
		'public/images': imgOptions,
		'public/styles': rootOptions,
		'public/js': rootOptions
	};
		

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	
	'name': 'barzakh',
	'brand': 'barzakh',
	
	'less': 'public',
	'compress': true,
	'static': 'public', //staticPaths,
	'favicon': 'public/favicon.ico',	
	'views': 'templates/views',
	'view engine': 'jade',
	'auto update': true,
	'port': 8080, 
	'env': 'production',
	'session': 'mongo',
	'auth': true,
	'user model': 'User',
	'cookie secret': '7sO(?Zq+E|gvK^4xBK>VF$0OkbgM&oKb8>([1v8=bs=IHi/tvw-}-!V2fG)FP.Rv'
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'users': 'users'
});

static.disableDefaultSetup(keystone);

// Start Keystone to connect to your database and initialise the web server
keystone.start();

static.setup(keystone);
