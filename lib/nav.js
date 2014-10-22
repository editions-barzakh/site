var _ = require("underscore"),
	nav = {};
exports.HOME = "home",
exports.ABOUT = "a-propos",
exports.CATALOG = "catalog",
exports.NEWS = "actualite";
exports.CONTACT = "contact",
	
nav [exports.HOME] = { label: 'Accueil',	href: '/'};
nav [exports.ABOUT] = { 	label: 'À propos', href: '/a-propos'};
nav [exports.CATALOG] = { label: 'Catalogue',	href: '/catalogue' };
nav [exports.NEWS] = { label: 'Actualité', href: '/actualite' };
nav [exports.CONTACT] = { label: 'Contact',	href: '/contact' };

exports.structure = nav;