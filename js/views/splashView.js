var splashView = Backbone.View.extend({
	source: Handlebars.getTemplate('splashTemplate'),
	template: null,
	el: '.appViewContainer',
	initialize: function() {
		this.template = Handlebars.compile(this.source);
	},
	render: function() {
		this.$el.empty().html(this.template());
	}
});