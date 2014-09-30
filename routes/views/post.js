var keystone = require('keystone'),
	async = require('async'),
	nav = require('../../lib/nav'),
	date = require('../../lib/date'),

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = nav.NEWS;
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};
		
	view.on('init', function(next) {
		keystone.list('Actualité').model.findOne()
			.where('state', 'publié')
			.where('slug', locals.filters.post)
			.exec(function(err, post) {
				if (err) return res.err(err);
				if (!post) return res.status('404').send('Actualité non trouvée');
				locals.post = post;
				locals.post.date = date.displayDate(post.publishedDate);
				locals.post.populate('category', function(){
					locals.post.populate('author', next);
				});				
			});
	});
	
	// Render the view
	view.render('post');
	
}
