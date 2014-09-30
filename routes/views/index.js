var keystone = require('keystone'),
	nav = require('../../lib/nav');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);
	
	// Set locals
	locals.section = nav.HOME;
	
	view.on('init', function(next) {
		keystone.list('Texte').model.findOne()
			.where('slug', 'banner')
			.exec(function(err, text) {
				if (!text) return res.status('404').send('Texte non trouvé');
				locals.banner = text;
				next(err);
			});
	});
	
	view.on('init', function(next) {
		keystone.list('Texte').model.findOne()
			.where('slug', 'citation-1')
			.exec(function(err, text) {
				if (!text) return res.status('404').send('Texte non trouvé');
				locals.citation1 = text;
				next(err);
			});
	});
	
	view.on('init', function(next) {
		keystone.list('Texte').model.findOne()
			.where('slug', 'citation-2')
			.exec(function(err, text) {				
				if (!text) return res.status('404').send('Texte non trouvé');
				locals.citation2 = text;
				next(err);
			});
	});
	
	// Render the view
	view.render('index');
}
