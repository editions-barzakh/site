var keystone = require('keystone'),
	async = require('async'),
	nav = require('../../lib/nav');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = nav.NEWS;
	
	locals.data = {
		posts: []
	};
	
	// Load all books
	view.on('init', function(next) {
		keystone.list('Actualité').model.find()
			.where('state', 'publié')
			.sort({'publishedDate':'-1'})	
			.exec(function(err, results) {			
				if (err || !results.length) {
					return next(err);
				}
				locals.data.posts = results;	
				next();
			});		
	});
	
	// Render the view
	view.render('posts');	
}