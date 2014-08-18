var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'catalog';
	
	locals.data = {
		books: []
	};
	
	// Load all books
	view.on('init', function(next) {
		keystone.list('Livre').model.find().exec(function(err, results) {			
			if (err || !results.length) {
				return next(err);
			}
			locals.data.books = results;	
			next();
		});		
	});
	
	// Render the view
	view.render('books');	
}