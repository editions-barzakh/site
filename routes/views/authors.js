var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'catalog';
	
	locals.data = {
		authors: []
	};
	
	// Load all authors
	view.on('init', function(next) {
		keystone.list('Auteur').model.find()			
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