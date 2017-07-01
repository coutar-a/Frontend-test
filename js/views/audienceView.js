var audienceView = Backbone.View.extend({
	source: Handlebars.getTemplate('audienceTemplate'),
	template: null,
	graphView: null,
	el: '.appViewContainer',
	events: {
		"click .exportButton": "saveChart"
	},
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
		this.graphView = new vega.View(vega.parse(spec), {
			loader: vega.loader({baseURL: 'https://vega.github.io/vega/'}),
			logLevel: vega.Warn,
			renderer: 'canvas'
		}).initialize('#bar-chart').hover().run();
	},
	saveChart: function(event) {
		var type = event.target.id === "bar-chart-svg" ? 'svg' : 'png';
		vega.exportGraphAs(graphView, type, "bar-chart");
	}
});