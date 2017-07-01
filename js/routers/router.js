var router = Backbone.Router.extend({

	initialize: function() {

		var nav = new navbarView();
		nav.render();
		var honk = new countryModel();
		honk.fetchCountryData();
	}
});

$(document).ready(function() {
	console.log("starting router...");
	Backbone.history.start();
	var app = new router();
});