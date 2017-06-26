appView = Backbone.View.extend({

    el: '.appViewContainer',

    views: {

        navbarView: new navbarView()
    },

    /*
    events: {
        "click .link": "route", // Route with data-href attribute
        "click .searchResultsItemButton": "route", // Route with data-action attribute
        "keyup .searchBar": "search", // Starts the search query
        "click .buttonSettings": "settings", // Opens the search settings modal
        "click .buttonLogin": "authenticate",
        "click .buttonRegister": "register",
        "click .buttonLogout": "logout",
        "click .buttonAddToWatchlist" : "addToWatchlist",
        "click .buttonFollowUser" : "followUser",
        "click .buttonUnfollowUser" : "unfollowUser",
        "click .buttonCreateWatchlist" : "createWatchlist"
    },

    */
    initialize: function () {
        Backbone.history.start();
        this.views.navbarView.render();
    }
});

