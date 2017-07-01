var navbarView = Backbone.View.extend({

    source: Handlebars.getTemplate('navbarTemplate'),
    template: null,
    el: 'nav',
    graphViews: {
        splash: null,
        audience: null,
        usageBW: null,
        country: null
    },
    events: {

        "click .pageButton": "renderGraph",
        "click .brand-logo": "renderSplash"
    },
    
    initialize: function () {
        this.template = Handlebars.compile(this.source);
        this.graphViews.splash = new splashView();
        this.graphViews.audience = new audienceView({model: new audienceModel()});
        this.graphViews.usageBW = new usageBandwidthView({model: new usageBandwidthModel()});
        this.graphViews.country = new countryView({model: new countryModel()});
    },

    render: function () {
        console.log("rendering navbar");
        this.$el.html(this.template());
        this.graphViews.splash.render();
    },
    renderGraph: function(event) {

        console.log(event.target.id);
        switch(event.target.id) {
            case "audienceButton":
            this.graphViews.audience.render();
            break;
            case "usageBWButton":
            this.graphViews.usageBW.render();
            break;
            case "countryButton":
            this.graphViews.country.render();
            break;
        }
    },
    renderSplash: function() {
        this.graphViews.splash.render();
    }
});