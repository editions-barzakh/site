var keystone = require('keystone'),
	async = require('async'),
	nav = require('../../lib/nav'),
	filters = require('./filters');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = nav.CATALOG;
	
	locals.data = {
		authors: []
	};
	
	filters(view, locals, req, res);
	
	// Load all authors
	view.on('init', function(next) {
		locals.data.page = req.query.page || "A";
		keystone.list('Auteur').model.find()
		.where('name', new RegExp('^[A-Za-z]+ ' + locals.data.page))
		.where('state', 'publié')
		.exec(function(err, results) {			
			if (err || !results.length) {
				return next(err);
			}
			locals.data.authors = results;	
			next();
		});		
	});
	
	// Render the view
	view.render('authors');	
}