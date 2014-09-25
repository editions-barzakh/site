var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals,
		section = req.url.substr(1);
	
	// Set locals
	locals.section = section;

	view.on('init', function(next) {
		keystone.list('Texte').model.findOne()
			.where('slug', section)
			.exec(function(err, text) {
				if (err) return res.err(err);
				if (!text) return res.status('404').send('Non achevé');
				locals.text = text;
				next();
			});
	});

	// Render the view
	view.render('text');	
};