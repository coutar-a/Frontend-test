var countryView = Backbone.View.extend({
	source: Handlebars.getTemplate('countryTemplate'),
	template: null,
	graphView: null,
	el: '.appViewContainer',
	model: null,
	events: {
		"click .exportGrp": "saveTrafficGraph"
	},
	initialize: function(newModel) {
		model = newModel;
		this.template = Handlebars.compile(this.source);
	},
	render: function() {
		console.log("rendering country traffic view");
		this.$el.empty().html(this.template());
		this.model.fetchCountryData(this.renderGraph);
	},
	renderGraph: function(spec) {
		this.graphView = new vega.View(vega.parse(spec), {
			loader: vega.loader({baseURL: 'https://vega.github.io/vega/'}),
			logLevel: vega.Warn,
			renderer: 'canvas'
		}).initialize('#grouped-bar-chart').hover().run();
	},
	saveTrafficGraph: function(event) {
		var type = event.target.id === "grp-chart-svg" ? 'svg' : 'png';
		vega.exportGraphAs(graphView, type, "grp-chart");
	}
});