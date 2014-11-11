var keystone = require('keystone'),
	nav = require('../../lib/nav');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);
	
	// Set locals
	locals.section = nav.HOME;
	
	view.on('init', function(next) {
		keystone.list('Actualité').model.find()
			.where('state', 'publié')
			.where('featured', true)
			.sort('-publishedDate')
			.limit(2)
			.exec(function(err, posts) {				
				locals.posts = posts;
				next(err);
			});
	});	
	
	view.on('init', function(next) {
		keystone.list('Texte').model.findOne()
			.where('slug', 'banner')
			.exec(function(err, text) {
				locals.banner = text;
				next(err);
			});
	});	
	
	view.on('init', function(next) {
		keystone.list('Texte').model.findOne()
			.where('slug', 'citation-1')
			.exec(function(err, text) {
				locals.citation1 = text;
				next(err);
			});
	});
	
	view.on('init', function(next) {
		keystone.list('Texte').model.findOne()
			.where('slug', 'citation-2')
			.exec(function(err, text) {				
				locals.citation2 = text;
				next(err);
			});
	});
	
	// Render the view
	view.render('index');
}
