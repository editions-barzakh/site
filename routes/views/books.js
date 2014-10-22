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
		books: {
			results : []
		}
	};
	
	filters(view, locals, req, res);
	
	// Load all books
	view.on('init', function(next) {
		var query = keystone.list('Livre').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 9
			})
			.where('state', 'publié')
			.sort('-publishedDate');
		
		if (locals.data.currentFilter) {		
			keystone.list('Catégories').model.findOne()				
				.where('slug', locals.data.currentFilter)
				.exec(function(err, category) {
					query.where('category', category)
						.exec(function(err, results) {			
							locals.data.books = results;
							locals.data.books.filterString = locals.data.currentFilter ? 'filter=' + locals.data.currentFilter + '&' : ''; 
							next(err);
						});
					});			
		} else {			
			query.exec(function(err, results) {			
				locals.data.books = results;
				next(err);
			});
		}
	});
	
	// Render the view
	view.render('books');	
}