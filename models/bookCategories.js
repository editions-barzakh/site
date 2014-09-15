var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Category = new keystone.List('Catégories', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Category.add({
	name:	{ label: 'Nom', type: String, required: true },
	slug:	{ type: String, index: true},
	singulier:	{ type: String, index: true},
	state:	{ label: 'Status', type: Types.Select, options: 'brouillon, publié, archivé', default: 'brouillon', index: true },
});

Category.defaultColumns = 'name, state|20%';
Category.register();