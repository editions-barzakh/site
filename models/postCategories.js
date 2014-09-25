var keystone = require('keystone'),
	Types = keystone.Field.Types;

var PostCategory = new keystone.List('Types Actualité', {
	autokey: { from: 'name', path: 'key' }
});

PostCategory.add({
	name: { type: String, required: true }
});

PostCategory.register();