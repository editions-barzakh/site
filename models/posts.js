var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Post = new keystone.List('Actualité', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	slug: { type: String, index: true },	
	photo:	{ label: 'Photo', type: Types.LocalFile, required: true, initial: false, dest: "public/images/parutions"},
	featured: { label: 'Page accueil', type: Types.Boolean},
	state:	{ label: 'Status', type: Types.Select, options: 'brouillon, publié, archivé', default: 'brouillon', index: true },
	publishedDate: { type: Types.Date, index: true, required: true, initial: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150, required: true, initial: true },
		extended: { type: Types.Html, wysiwyg: true, height: 400, required: true, initial: true }
	},
	categories: { type: Types.Relationship, ref: 'Types Actualité', many: true }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, publishedDate|20%';
Post.register();
