var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Book = new keystone.List('Livre', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Book.add({
	name:	{ label: 'Nom', type: String, required: true },
	slug:	{ type: String, index: true},
	photo:	{ label: 'Photo', type: Types.LocalFile, required: true, initial: false, dest: "public/images/parutions"},
	publishedDate:	{ type: Types.Date, index: true, required: true, initial: true },
	tags:	{ type: String, index: true, many: true},
	author:	{ type: Types.Relationship, ref: 'Auteur', many: true },
	state:	{ label: 'Status', type: Types.Select, options: 'brouillon, publié, archivé', default: 'brouillon', index: true },
	category:	{ type: Types.Relationship, ref: 'Catégories', index: true },
	content: 	{
		brief: { label:'Chapeau',type: String, required: true, initial: true },
		extended: { label:'Description', type: Types.Html, wysiwyg: true, height: 300, required: true, initial: true }		
	},
	details: {		
		width: 	{ label: 'Largeur', type: Types.Number},
		height: { label: 'Hauteur', type: Types.Number},
		nbPages:{ label: 'Nb Pages', type: Types.Number},
		rights: { label: 'Droits', type: String},
		isbn: 	{ label: 'ISBN', type: String}
	}
});

Book.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Book.defaultColumns = 'name, author|20%, state|20%';
Book.register();