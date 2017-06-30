var usageBandwidthModel = Backbone.Model.extend({
	CDNspec: {
		"$schema": "https://vega.github.io/schema/vega/v3.0.json",
		"width": 600,
		"height": 300,
		"padding": 5,

		"signals": [
		{
			"name": "interpolate",
			"value": "linear",
			"bind": {
				"input": "select",
				"options": [
				"basis",
				"cardinal",
				"catmull-rom",
				"linear",
				"monotone",
				"natural",
				"step",
				"step-after",
				"step-before"
				]
			}
		}
		],

		"data": [
		{
			"name": "table",
			"values": []
		}
		],

		"scales": [
		{
			"name": "x",
			"type": "point",
			"range": "width",
			"domain": {"data": "table", "field": "x"}
		},
		{
			"name": "y",
			"type": "linear",
			"range": "height",
			"nice": true,
			"zero": true,
			"domain": {"data": "table", "field": "y"}
		},
		{
			"name": "color",
			"type": "ordinal",
			"range": "category",
			"domain": {"data": "table", "field": "c"}
		}
		],

		"axes": [
		{"orient": "bottom", "scale": "x"},
		{"orient": "left", "scale": "y"}
		],

		"marks": [
		{
			"type": "group",
			"from": {
				"facet": {
					"name": "series",
					"data": "table",
					"groupby": "c"
				}
			},
			"marks": [
			{
				"type": "line",
				"from": {"data": "series"},
				"encode": {
					"enter": {
						"x": {"scale": "x", "field": "x"},
						"y": {"scale": "y", "field": "y"},
						"stroke": {"scale": "color", "field": "c"},
						"strokeWidth": {"value": 2}
					},
					"update": {
						"interpolate": {"signal": "interpolate"},
						"fillOpacity": {"value": 1}
					},
					"hover": {
						"fillOpacity": {"value": 0.5}
					}
				}
			}
			]
		}
		]
	},
	P2Pspec: {
		"$schema": "https://vega.github.io/schema/vega/v3.0.json",
		"width": 600,
		"height": 300,
		"padding": 5,

		"signals": [
		{
			"name": "interpolate",
			"value": "linear",
			"bind": {
				"input": "select",
				"options": [
				"basis",
				"cardinal",
				"catmull-rom",
				"linear",
				"monotone",
				"natural",
				"step",
				"step-after",
				"step-before"
				]
			}
		}
		],

		"data": [
		{
			"name": "table",
			"values": []
		}
		],

		"scales": [
		{
			"name": "x",
			"type": "point",
			"range": "width",
			"domain": {"data": "table", "field": "x"}
		},
		{
			"name": "y",
			"type": "linear",
			"range": "height",
			"nice": true,
			"zero": true,
			"domain": {"data": "table", "field": "y"}
		},
		{
			"name": "color",
			"type": "ordinal",
			"range": "category",
			"domain": {"data": "table", "field": "c"}
		}
		],

		"axes": [
		{"orient": "bottom", "scale": "x"},
		{"orient": "left", "scale": "y"}
		],

		"marks": [
		{
			"type": "group",
			"from": {
				"facet": {
					"name": "series",
					"data": "table",
					"groupby": "c"
				}
			},
			"marks": [
			{
				"type": "line",
				"from": {"data": "series"},
				"encode": {
					"enter": {
						"x": {"scale": "x", "field": "x"},
						"y": {"scale": "y", "field": "y"},
						"stroke": {"scale": "color", "field": "c"},
						"strokeWidth": {"value": 2}
					},
					"update": {
						"interpolate": {"signal": "interpolate"},
						"fillOpacity": {"value": 1}
					},
					"hover": {
						"fillOpacity": {"value": 0.5}
					}
				}
			}
			]
		}
		]
	},
	rawUsage : [],
	rawBW: [],
	initialize: function() {

	},
	fetchUsageAndBW: function(callback) {
		var self = this;
		//console.log(callback);
		var usage = $.ajax({
			url: 'http://127.0.0.1:8081/js/data/usage.json',
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				self.rawUsage = data;
			}
		});

		var bw = $.ajax({
			url: 'http://127.0.0.1:8081/js/data/bandwidth.json',
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				self.rawBW = data;
			}
		});

		$.when(usage, bw).done(function() {
			
			for (var i = 0 ; i != self.rawUsage.cdn.length ; i++) {

				var tmp1 = self.rawUsage.cdn[i];
				var tmp2 = self.rawBW.cdn[i]; 
				var date = new Date(tmp1[0]);	
				var timestamp = (date.getHours() < 10 ? '0' + date.getHours().toString() :
					date.getHours().toString()) + ':' + (date.getMinutes() < 10 ? '0' +
					date.getMinutes().toString() : date.getMinutes().toString());
					self.CDNspec.data[0].values.push({"x": timestamp, "y": tmp1[1], "c": 0});
					self.CDNspec.data[0].values.push({"x": timestamp, "y": tmp2[1], "c": 1});
				}

				for (var i = 0 ; i != self.rawUsage.p2p.length ; i++) {

					var tmp1 = self.rawUsage.p2p[i];
					var tmp2 = self.rawBW.p2p[i]; 
					var date = new Date(tmp1[0]);	
					var timestamp = (date.getHours() < 10 ? '0' + date.getHours().toString() :
						date.getHours().toString()) + ':' + 
					(date.getMinutes() < 10 ? '0' +
						date.getMinutes().toString() :
						date.getMinutes().toString());
					self.P2Pspec.data[0].values.push({"x": timestamp, "y": tmp1[1], "c": 0});
					self.P2Pspec.data[0].values.push({"x": timestamp, "y": tmp2[1], "c": 1});
				}

			//console.log(callback);
			callback(self.CDNspec, self.P2Pspec);
		});
	}
});