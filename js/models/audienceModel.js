var audienceModel = Backbone.Model.extend({
	audienceData: null,
	fetchAudienceData: function() {
		this.url = "http://127.0.0.1:8081/js/data/audience.json";
		var self = this;

		return $.ajax({
		  url: 'http://127.0.0.1:8081/js/data/audience.json',
		  type: 'GET',
		  dataType: 'json',
		  complete: function(xhr, textStatus) {
		    //called when complete
		  },
		  success: function(data, textStatus, xhr) {
		    //called when successful
		    console.log(data);
		  },
		  error: function(xhr, textStatus, errorThrown) {
		    //called when there is an error
		  }
		});
		
	}
});