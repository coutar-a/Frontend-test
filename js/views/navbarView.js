var navbarView = Backbone.View.extend({

    source: Handlebars.getTemplate('navbarTemplate'),
    template: null,
    el: 'nav',
    graphViews: {
        audience:  null,
        usageBW: null
    },
    events: {

        "click .audienceButton": "renderAudienceGraph",
        "click .usageBWButton": "renderUsageBWGraph"
    },
    
    initialize: function () {
        this.template = Handlebars.compile(this.source);
        this.graphViews.audience = new audienceView({model: new audienceModel()});
        this.graphViews.usageBW = new usageBandwidthView({model: new usageBandwidthModel()});
    },

    render: function () {
        console.log("rendering navbar");
        this.$el.html(this.template());
   },
   renderAudienceGraph: function(event) {
    console.log(event);
     event.preventDefault();
    this.graphViews.audience.render();
   },
   renderUsageBWGraph: function(event) {
    console.log(event);
     event.preventDefault();
    this.graphViews.usageBW.render();
   }
});