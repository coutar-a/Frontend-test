var router = Backbone.Router.extend({

	routes: {

	},
	initialize: function() {

		var nav = new navbarView();
		nav.render();
	}
});

$(document).ready(function() {
	console.log("starting router...");
	Backbone.history.start();
	console.log($('nav'));
	var app = new router();
	var testModel = new audienceModel();
	var test = audienceModel.fetchAudienceData();
	console.log(test);
});