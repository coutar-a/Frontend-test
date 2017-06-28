var router = Backbone.Router.extend({

	initialize: function() {

		var nav = new navbarView();
		nav.render();
		var test = new audienceView({model : new audienceModel()});
		test.render();
	}
});

$(document).ready(function() {
	console.log("starting router...");
	Backbone.history.start();
	var app = new router();
	//var testModel = new audienceModel();
});