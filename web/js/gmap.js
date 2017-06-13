/* Google Maps interface */
gmap = {

  mapDivID: "map-canvas",
  
  setMapElementID : function(elementID) {
	gmap.mapDivID = elementID;  
  },
  
  // Display Google Map with marker using supplied div ID & co-ordinates
  setup: function(latitude, longitude, zoom) {
	var pin = true;
  	// create a JSON object with the values to mark the position
	if (latitude == null || longitude == null) {
		latitude = 0;
		longitude = 0;
		zoom = 2;
		pin = false;
	}
	var _position = new google.maps.LatLng(latitude, longitude);

	// add our default mapOptions
	var mapOptions = {
	  zoom: zoom,           // zoom level of the map
	  center: _position     // position to center
	}

	// load a map within the "map" div and display
	var map = new google.maps.Map(document.getElementById(gmap.mapDivID), mapOptions);

	// add a marker to the map with the position of the longitude and latitude
	if (pin) {
		var marker = new google.maps.Marker({
		position: mapOptions.center,
		map: map
		});
	}
	
  },

  // Use Google Geocoder to convert address to longitude and latitude and make callback
  getPosition: function(addr, callback) {
	// set up our geoCoder
	gmap.address = addr;
	if (addr == "") {
		callback({latt: null, long: null});
	} 
	else {
		var geocoder = new google.maps.Geocoder();

		//send value to google to get a longitude and latitude value 
		geocoder.geocode({'address': addr}, function(results, status)
		{   
			// callback with a status and result
			if (status == google.maps.GeocoderStatus.OK) 
			{
			// send the values back in a JSON string
			callback({
				latt: results[0].geometry.location.lat(),
				long: results[0].geometry.location.lng()
			  });
			}
		
		});
	}
  },

  setPosition: function(position){
	  gmap.setup(position.latt, position.long, 16);
  }
  
};
