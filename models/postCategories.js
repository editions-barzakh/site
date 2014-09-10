var keystone = require('keystone'),
	Types = keystone.Field.Types;

var BookCategory = new keystone.List('CategorieLivre', {
	autokey: { from: 'name', path: 'key' }
});

BookCategory.add({
	name: { type: String, required: true }
});

BookCategory.relationship({ ref: 'Livre', path: 'categories' });

BookCategory.register();
