var audienceView = Backbone.View.extend({
	source: Handlebars.getTemplate('audienceTemplate'),
	template: null,
	el: '.appViewContainer',
	model:null,

	initialize: function(newModel) {
		model = newModel;
		this.template = Handlebars.compile(this.source);
	},
	render: function() {
		console.log("rendering audience view");
		this.$el.empty().html(this.template());
		this.model.fetchAudienceData(this.renderAudienceChart);
	},
	renderAudienceChart: function(spec) {
		var view = new vega.View(vega.parse(spec), {
			loader: vega.loader({baseURL: 'https://vega.github.io/vega/'}),
			logLevel: vega.Warn,
			renderer: 'canvas'
		}).initialize('#bar-chart').hover().run();
	}
});