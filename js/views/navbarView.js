var navbarView = Backbone.View.extend({

    source: Handlebars.getTemplate('navbarTemplate'),
    template: null,
    el: 'nav',
    tagName:'nav',

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
        console.log($('body'));
        console.log($('.appViewContainer'));
        console.log(this.$el.html(this.template()));
        this.$el.html(this.template());
        //$("nav")[0].innerHTML = this.template();
        //$('.modal').modal();
        ///$(".button-collapse").sideNav();
        //$('select').material_select();
        //return this;
        // CSS and Ajax re-initialisation.
        //this._init();
       // return this;
   }

});