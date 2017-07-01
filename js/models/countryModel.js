var countryModel = Backbone.Model.extend({
	spec: {
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",
  "width": 900,
  "height": 720,
  "padding": 5,

  "data": [
    {
      "name": "table",
      "values": []
    }
  ],

  "scales": [
    {
      "name": "yscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "height",
      "padding": 0.2
    },
    {
      "name": "xscale",
      "type": "linear",
      "domain": {"data": "table", "field": "value"},
      "range": "width",
      "round": true,
      "zero": true,
      "nice": true
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "table", "field": "position"},
      "range": {"scheme": "category20"}
    }
  ],

  "axes": [
    {"orient": "left", "scale": "yscale", "tickSize": 0, "labelPadding": 4, "zindex": 1},
    {"orient": "bottom", "scale": "xscale"}
  ],

  "marks": [
    {
      "type": "group",

      "from": {
        "facet": {
          "data": "table",
          "name": "facet",
          "groupby": "category"
        }
      },

      "encode": {
        "enter": {
          "y": {"scale": "yscale", "field": "category"}
        }
      },

      "signals": [
        {"name": "height", "update": "bandwidth('yscale')"}
      ],

      "scales": [
        {
          "name": "pos",
          "type": "band",
          "range": "height",
          "domain": {"data": "facet", "field": "position"}
        }
      ],

      "marks": [
        {
          "name": "bars",
          "from": {"data": "facet"},
          "type": "rect",
          "encode": {
            "enter": {
              "y": {"scale": "pos", "field": "position"},
              "height": {"scale": "pos", "band": 1},
              "x": {"scale": "xscale", "field": "value"},
              "x2": {"scale": "xscale", "value": 0},
              "fill": {"scale": "color", "field": "position"}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "bars"},
          "encode": {
            "enter": {
              "x": {"field": "x2", "offset": 5},
              "y": {"field": "y", "offset": {"field": "height", "mult": 0.5}},
              "fill": {"value": "black"},
              "align": {"value": "left"},
              "baseline": {"value": "middle"},
              "text": {"field": "datum.value"}
            }
          }
        }
      ]
    }
  ]
},
	initialize: function() {

	},
	fetchCountryData: function(callback) {
		this.url = "http://127.0.0.1:8081/js/data/country.json";
		var self = this;

		return $.ajax({
			url: self.url,
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
			},
			success: function(data, textStatus, xhr) {

				for (var i = 0 ; i < (data.length / 6) ; i++) {
					var tmp = data[i];
					/*self.spec.data[0].values.push({"x": tmp.country, "y": tmp.cdn, "c": 0});
					self.spec.data[0].values.push({"x": tmp.country, "y": tmp.p2p, "c": 1});*/


					self.spec.data[0].values.push({"category": tmp.country, "position": 0, "value": parseInt(tmp.cdn)});
					self.spec.data[0].values.push({"category": tmp.country, "position": 1, "value": parseInt(tmp.p2p)});
					//self.spec.data[0].values.push({"category": tmp.country, "position": 3, "amount": tmp.percentage});
				}

				console.log(self.spec);
				if (callback != undefined)
					callback(self.spec);
			},
			error: function(xhr, textStatus, errorThrown) {
		    //called when there is an error
		}
	});
	}
});