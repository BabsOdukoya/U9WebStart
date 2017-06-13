lmap = {

	map : null,		// Map Object
	feature : null,	// Map feature, e.g. binding box	
	pos : null,		// Current Latitude & Longitude
	resultsSelector : '#georesults',
	hideResultsBtn  : '#hidebtn',

    loadMap: function(divID, latitude, longitude, zoom) {
		lmap.map = new L.Map(divID, {zoomControl: true});

		var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
			osmAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});

		lmap.map.setView(new L.LatLng(latitude, longitude), zoom).addLayer(osm);
	},

	mapSearch: function(addrID) {
		var inp = document.getElementById(addrID).value;
		lmap._addrSearch(inp);
    },
	
	hideResults: function() {
		$(lmap.resultsSelector).empty();
		$(lmap.hideResultsBtn).addClass('hidden');
	},

	chooseAddr: function (lat, lon, lat1, lng1, lat2, lng2, osmType) {
		lmap.pos  = new L.LatLng(lat, lon);
		var loc1 = new L.LatLng(lat1, lng1);
		var loc2 = new L.LatLng(lat2, lng2);
		var bounds = new L.LatLngBounds(loc1, loc2);

		if (lmap.feature) {
			lmap.map.removeLayer(lmap.feature);
		}
		if (osmType == "node") {
			lmap.feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(lmap.map);
			lmap.map.fitBounds(bounds);
			lmap.map.setZoom(18);
		} else {
			var loc3 = new L.LatLng(lat1, lng2);
			var loc4 = new L.LatLng(lat2, lng1);
			lmap.feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(lmap.map);
			lmap.map.setView(lmap.pos, 16, { animation: true});
			var marker = L.marker(lmap.pos).addTo(lmap.map);
			lmap.map.fitBounds(bounds);
		}
	},
	
	geoLocate : function(noGeoID, mapID) {
		// called when we have the location
		var onHaveLocation = function(pos){
			lmap.showGeoLocation(pos.coords);
		};

		// called when getCurrentPosition fails
		var onNoLocation = function(message){
			alert('getCurrentPosition Failed: ' + message);
		};

		var nogeoSelect = '#' + noGeoID;
		var mapSelect   = '#' + mapID;
		if (navigator.geolocation) {
			$(nogeoSelect).addClass('hidden');
			$(mapSelect).removeClass('hidden');
			navigator.geolocation.getCurrentPosition(onHaveLocation, onNoLocation);
		} else {
			$(nogeoSelect).removeClass('hidden');
			$(mapSelect).addClass('hidden');
		}
	},
	
	showGeoLocation: function(crd) {
		lmap.pos = new L.LatLng(crd.latitude, crd.longitude);
		//var marker = new L.marker(lmap.pos).addTo(lmap.map);
		var circle = new L.circle(lmap.pos, crd.accuracy/2, {
			weight: 1,
			color: 'blue',
			fillColor: '#cacaca',
			fillOpacity: 0.2
		});
		lmap.map.addLayer(circle);
		lmap.map.setView(lmap.pos, 8);
		lmap.map.flyToBounds(circle.getBounds());
	},

	_addrSearch: function(addr) {
		$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + addr, function(data) {
			var items = [];

			$.each(data, function(key, val) {
				bb = val.boundingbox;
				items.push("<li><a href='#' onclick='lmap.chooseAddr(" + val.lat + "," + val.lon + "," + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osmType + "\");return false;'>" + val.display_name + '</a></li>');
			});

			$(lmap.resultsSelector).empty();
			if (items.length != 0) {
				$('<p>', { html: "Search results:" }).appendTo(lmap.resultsSelector);
				$('<ul/>', {
					'class': 'mapSearchResults',
					html: items.join('')
				}).appendTo(lmap.resultsSelector);
			} else {
				$('<p>', { html: "No results found" }).appendTo(lmap.resultsSelector);
			}
			$(lmap.hideResultsBtn).removeClass('hidden');
		});
	}
};
