var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'catalog';
	locals.filters = {
		author: req.params.author
	};
	

	view.on('init', function(next) {
		keystone.list('Auteur').model.findOne()
			.where('state', 'publié')
			.where('slug', locals.filters.author)
			.exec(function(err, author) {
				if (err) return res.err(err);
				if (!author) return res.notfound('Auteur non trouvé');
				locals.author = author;
				next();
			});

	});
	
	// Render the view
	view.render('author');	
};