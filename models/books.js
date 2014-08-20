var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Book = new keystone.List('Livre', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Book.add({
	name: { label: 'Nom', type: String, required: true },
	slug: { type: String, index: true},
	photo: { label: 'Photo', type: Types.LocalFile, required: true, initial: false, dest: "public/images"},
	publishedDate: { type: Types.Date, index: true },
	author: { type: Types.Relationship, ref: 'Auteur', index: true },
	state: { label: 'Status', type: Types.Select, options: 'brouillon, publié, archivé', default: 'brouillon', index: true },	
	content: {
		brief: { label:'Chapeau',type: String },
		extended: { label:'Description', type: Types.Html, wysiwyg: true, height: 300 },
		details: { label:'Détails', type: Types.Html, wysiwyg: true, height:100}
	}
});

Book.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Book.defaultColumns = 'name, author|20%, state|20%';
Book.register();