navbarView = Backbone.View.extend({

    source: Handlebars.getTemplate('navbarTemplate'),
    template: null,
    el: 'nav',

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
        console.log(this.$el);
        this.template = Handlebars.compile(this.source);
        this.render();
    },

    render: function () {
        console.log("rendering navbar");
        this.$el.append(this.template());
        $('.modal').modal();
        $(".button-collapse").sideNav();
        $('select').material_select();
        return this;
        // CSS and Ajax re-initialisation.
        //this._init();
       // return this;
   }

});