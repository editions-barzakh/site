var keystone = require('keystone'),
	async = require('async'),
	nav = require('../../lib/nav');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = nav.CATALOG;
	
	locals.data = {
		books: {
			results : []
		}
	};
	
	// Load all books
	view.on('init', function(next) {
		keystone.list('Livre').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 9
			}).where('state', 'publié')
			.sort('publishedDate')			
			.exec(function(err, results) {			
				locals.data.books = results;
				next(err);
			});		
	});
	
	// Render the view
	view.render('books');	
}