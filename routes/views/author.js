var keystone = require('keystone'),
	async = require('async'),
	nav = require('../../lib/nav');


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = nav.CATALOG;
	locals.filters = {
		author: req.params.author
	};
	

	view.on('init', function(next) {
		keystone.list('Auteur').model.findOne()
			.where('state', 'publié')
			.where('slug', locals.filters.author)
			.exec(function(err, author) {
				if (err) return res.err(err);
				if (!author) return res.status('404').send('Auteur non trouvé');
				locals.author = author;
				locals.books = [];
				keystone.list('Livre').model.find()
					.where('state', 'publié')
					.where('author', author)
					.sort('publishedDate')
					.exec(function(err, books) {
						if (err || !books.length) {
							return next(err);
						}
						locals.books = books;
						next();
					});
			});
	});

	// Render the view
	view.render('author');	
};