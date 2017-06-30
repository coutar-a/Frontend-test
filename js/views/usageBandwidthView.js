var usageBandwidthView = Backbone.View.extend({

	source: Handlebars.getTemplate('usageBandwidthTemplate'),
	template: null,
	el: '.appViewContainer',
	model: null,
	initialize: function(newModel) {
		model = newModel;
		this.template = Handlebars.compile(this.source);
	},
	render: function() {
		console.log("rendering cdn and p2p charts");
		this.$el.empty().html(this.template());
		this.model.fetchUsageAndBW(this.renderCharts);
	},
	renderCharts: function(CDNSpec, P2PSpec) {
		var cdn = new vega.View(vega.parse(CDNSpec), {
			loader: vega.loader({baseURL: 'https://vega.github.io/vega/'}),
			logLevel: vega.Warn,
			renderer: 'canvas'
		}).initialize('#line-chart-cdn').hover().run();

		var p2p = new vega.View(vega.parse(P2PSpec), {
			loader: vega.loader({baseURL: 'https://vega.github.io/vega/'}),
			logLevel: vega.Warn,
			renderer: 'canvas'
		}).initialize('#line-chart-p2p').hover().run();
	}
});