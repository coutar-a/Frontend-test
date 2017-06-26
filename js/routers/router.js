var router = Backbone.Router.extend({

	routes: {

	},
	initialize: function() {

		var nav = new navbarView();
		nav.render();
	}
});

console.log("starting router...");
var app = new router;

Backbone.history.start();