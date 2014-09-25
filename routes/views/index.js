var keystone = require('keystone'),
	nav = require('../../lib/nav');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);
	
	// Set locals
	locals.section = nav.HOME;
	
	// Render the view
	view.render('index');
}
