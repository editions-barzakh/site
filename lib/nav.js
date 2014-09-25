var _ = require("underscore"),
	HOME = "home",
	ABOUT = "a-propos",
	CATALOG = "catalog",
	NEWS = "actualite";
	CONTACT = "contact",
	nav = {
		HOME : { label: 'Accueil',	href: '/'},
		ABOUT : { label: 'A propos', href: '/a-propos'},
		CATALOG : { label: 'Catalogue',	href: '/catalogue' },
		NEWS : { label: 'Actualité', href: '/actualite' },
		//{ label: 'Presse',		key: 'press',		href: '/' },
		CONTACT : { label: 'Contact',	href: '/contact' }
	};
exports.structure = nav;
_.each(nav, function(value, key) {
	exports[key] = key;
});