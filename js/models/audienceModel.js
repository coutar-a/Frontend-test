var audienceModel = Backbone.Model.extend({
	audienceData: null,
	fetchAudienceData: function() {
		this.url = "http://127.0.0.1:8081/js/data/audience.json";
		var self = this;
		return this.fetch({
			method:"GET",
    		dataType: 'jsonp'
		}).success(function _data, success, result) {
			console.log(result);
			self.audienceData = result;
		}
	}
});