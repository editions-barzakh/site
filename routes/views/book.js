var keystone = require('keystone'),
	async = require('async'),
	nav = require('../../lib/nav'),
	date = require('../../lib/date');


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = nav.CATALOG;
	locals.filters = {
		book: req.params.book
	};
	

	view.on('init', function(next) {
		keystone.list('Livre').model.findOne()
			.where('state', 'publié')
			.where('slug', locals.filters.book)
			.populate('author category')
			.exec(function(err, book) {
				if (err) return res.err(err);
				if (!book) return res.status('404').send('Livre non trouvé');
				locals.book = book;
				locals.book.date = date.displayDate(book.publishedDate);
				next();
			});
	});
	
	// Render the view
	view.render('book');	
};
