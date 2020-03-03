var Data = function () {

    // preload and transform datasets
    var me = {};

	var years = [];

    me.init = function () {

		var dataDone = function () {
			EventBus.trigger(EVENT.preloadDone);
		};



		dataDone();
    };

	me.getYears = function () {
		return years;
	};

	me.featureCollection = function() {
		return {
			"type": "FeatureCollection",
			"crs": {
				"type": "name",
				"properties": {
					"name": "urn:ogc:def:crs:OGC:1.3:CRS84"
				}
			},
			"features": []
		}
	};

	me.featurePoint = function(lat, lon) {
		return {
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "Point",
				"coordinates": [lon, lat]
			}
		}
	};

	me.featureLine = function(lat1,lon1,lat2,lon2){
		return {
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "LineString",
				"coordinates": [[lon1,lat1],[lon2,lat2]]
			}
		}
	};
	
	
    return me;


}();
