var router = Backbone.Router.extend({

	initialize: function() {


		var nav = new navbarView();
		nav.render();
		var honk = new countryModel();
		honk.fetchCountryData();
		/*var foo = new usageBandwidthModel();
		foo.fetchUsageAndBW();*/
	}
});

$(document).ready(function() {
	console.log("starting router...");
	$('select').material_select();
	Backbone.history.start();
	var app = new router();
	//var testModel = new audienceModel();
});