var audienceModel = Backbone.Model.extend({
	spec: {
		"$schema": "https://vega.github.io/schema/vega/v3.0.json",
		"width": 1200,
		"height": 400,
		"padding": 5,
		"autosize": "pad",

		"data": [
		{
			"name": "table",
			"values": []
		}
		],

		"signals": [
		{
			"name": "tooltip",
			"value": {},
			"on": [
			{"events": "rect:mouseover", "update": "datum"},
			{"events": "rect:mouseout",  "update": "{}"}
			]
		}
		],

		"scales": [
		{
			"name": "xscale",
			"type": "band",
			"domain": {"data": "table", "field": "category"},
			"range": "width",
			"padding": 0.05,
			"round": true
		},
		{
			"name": "yscale",
			"domain": {"data": "table", "field": "amount"},
			"nice": true,
			"range": "height"
		}
		],

		"axes": [
		  { "orient": "bottom", "scale": "xscale", "labelOverlap": true},
		//{ "orient": "bottom", "scale": "xscale", "labels": false, "ticks": false},
		{ "orient": "left", "scale": "yscale" }
		],

		"marks": [
		{
			"type": "rect",
			"from": {"data":"table"},
			"encode": {
				"enter": {
					"x": {"scale": "xscale", "field": "category"},
					"width": {"scale": "xscale", "band": 1},
					"y": {"scale": "yscale", "field": "amount"},
					"y2": {"scale": "yscale", "value": 0}
				},
				"update": {
					"fill": {"value": "steelblue"}
				},
				"hover": {
					"fill": {"value": "red"}
				}
			}
		},
		{
			"type": "text",
			"encode": {
				"enter": {
					"align": {"value": "center"},
					"baseline": {"value": "bottom"},
					"fill": {"value": "#333"}
				},
				"update": {
					"x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
					"y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
					"text": {"signal": "tooltip.amount"},
					"fillOpacity": [
					{"test": "datum === tooltip", "value": 0},
					{"value": 1}
					]
				}
			}
		}
		]
	},
	audienceData: [],
	initialize: function() {
		//this.fetchAudienceData();
	},
	fetchAudienceData: function(callback) {
		this.url = "http://127.0.0.1:8081/js/data/audience.json";
		var self = this;

		return $.ajax({
			url: self.url,
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
			},
			success: function(data, textStatus, xhr) {

				for (var i = 0 ; i < data.audience.length ; i++) {
					var tmp = data.audience[i];
					var date = new Date(tmp[0]);
					var timestamp = (date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString());
					self.spec.data[0].values.push({"category": timestamp, "amount": tmp[1]});
				}
				//console.log(self.spec.data[0].values);
				callback(self.spec);
			},
			error: function(xhr, textStatus, errorThrown) {
		    //called when there is an error
		}
	});
		
	}
});