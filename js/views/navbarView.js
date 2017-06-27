var navbarView = Backbone.View.extend({

    source: Handlebars.getTemplate('navbarTemplate'),
    template: null,
    el: 'nav',
    tagName:'nav',
    target: '.appViewContainer',

    /*
    events: {

        "input .searchBar": "fetchAutocomplete",
        "change #searchFilter": "userOptions",
        "change #moviesGenres": "userOptions",
        "change #tvshowsGenres": "userOptions",
        "input #searchLimit": "userOptions"
    },
    */
    initialize: function () {
        this.template = Handlebars.compile(this.source);
    },

    render: function () {
        console.log("rendering navbar");
        this.$el.html(this.template());
   }

});