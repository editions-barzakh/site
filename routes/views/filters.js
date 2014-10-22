var keystone = require('keystone'),
	_ = require("underscore");
	nav = require("../../lib/nav");
	
exports = module.exports = function(view, locals, req, res) {
	if (req.query.filter) {
		locals.data.currentFilter = req.query.filter;
	} else if (req.url.indexOf("/" + nav.AUTEURS) == 0) {
		locals.data.currentFilter = "auteurs";
	}
	
	locals.data.filters = [
			{"name":"Tous", "href":"/catalogue", "slug": "tous"},
			{"name":"Auteurs", "href":"/" + nav.AUTEURS, "slug": "auteurs"}
		];

	// Load all categories
	view.on('init', function(next) {
		keystone.list('Catégories').model.find()
			.sort('name')			
			.exec(function(err, results) {
				_.each(results, function(model) {
					locals.data.filters.push({"name": model.get("name"), "slug": model.get("slug")});
				});
				locals.data.filters.push(results);
				next(err);
			});
	});
};