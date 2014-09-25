var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Text = new keystone.List('Texte', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Text.add({
	name: { label: 'Nom', type: String, required: true },
	photo: { label: 'Photo', type: Types.LocalFile, initial: false, dest: "public/images/divers"},
	slug: { type: String, index: true},
	state: { label: 'Status', type: Types.Select, options: 'brouillon, publié, archivé', default: 'brouillon', index: true },		
	content: {
		extended: { label:'Texte', type: Types.Html, wysiwyg: true, height: 200 }
	}
});

Text.schema.virtual('content.full').get(function() {
	return this.content.extended;
});

Text.defaultColumns = 'name, state|20%';
Text.register();