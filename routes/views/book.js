var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'catalog';
	locals.filters = {
		book: req.params.book
	};
	

	view.on('init', function(next) {
		keystone.list('Livre').model.findOne()
			.where('state', 'publié')
			.where('slug', locals.filters.book)
			.exec(function(err, book) {
				if (err) return res.err(err);
				if (!book) return res.notfound('Livre non trouvé');
				locals.book = book;
				locals.book.populate('category', function(){
					locals.book.populate('author', next);
				});
				
			});

	});
	
	// Render the view
	view.render('book');	
};
