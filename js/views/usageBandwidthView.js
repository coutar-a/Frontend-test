var usageBandwidthView = Backbone.View.extend({

	source: Handlebars.getTemplate('usageBandwidthTemplate'),
	template: null,
	el: '.appViewContainer',
	model: null,
	cdn: null,
	p2p: null,
	events: {
		"click .export": "saveCharts"
	},
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
		this.cdn = new vega.View(vega.parse(CDNSpec), {
			loader: vega.loader({baseURL: 'https://vega.github.io/vega/'}),
			logLevel: vega.Warn,
			renderer: 'canvas'
		}).initialize('#line-chart-cdn').hover().run();

		this.p2p = new vega.View(vega.parse(P2PSpec), {
			loader: vega.loader({baseURL: 'https://vega.github.io/vega/'}),
			logLevel: vega.Warn,
			renderer: 'canvas'
		}).initialize('#line-chart-p2p').hover().run();
		$('select').material_select();
	},
	saveCharts: function(event) {
		var view = event.target.id.indexOf('cdn') != (-1) ? cdn : p2p;
		var type = event.target.id.indexOf('png') != (-1) ? 'png' : 'svg';
		vega.exportGraphAs(view, type, "line-chart");
	}
});