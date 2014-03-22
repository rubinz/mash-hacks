$(function(){

	var key = "AIzaSyDxkvEZeeOg3-mlkcHpdkCUC5ws5Ltqhgc";

	// set div to screen size
	$('.screen1, .screen2').css({ height: $(window).innerHeight() });
	$(window).resize(function(){
	  $('.screen1, .screen2').css({ height: $(window).innerHeight() });
	});

	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	  });
	var locationToSearch;
	var durationLength = "";
	var durationUnits = "";
	var parameters = new Array();

	var geocoder = new google.maps.Geocoder();
	
	service = new google.maps.places.PlacesService(map);

	function codeAddress(location) {
	    
	    geocoder.geocode( { 'address': location}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        

	    	console.log(results[0].geometry.location);
	    	locationToSearch = results[0].geometry.location;

	      } else {
	        console.log("Geocode was not successful for the following reason: " + status);
	      }

	    });
	  }

	function searchPlaces(location) {


		$('[type=checkbox]').each(function(){
			var sThisVal = (this.checked ? $(this).val() : "");
			console.log(sThisVal);
		});

		console.log(location);
		// var currentLoc = new google.maps.LatLng(location['k'], location['A']);
		// console.log(currentLoc);
		// var searchQuery = "https://maps.googleapis.com/maps/api/place/search/json?location="+location+"&radius=400&sensor=false&key="+key;

		var request = {
		    location: location,
		    radius: 500,
		    types: ['restaurant']
		};

		service.nearbySearch(request, function(results, status){
			console.log("SEARCHING");
			console.log(google.maps.places.PlacesServiceStatus);
			// var status = "OK";
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				console.log("OK");
			    for (var i = 0; i < results.length; i++) {
			      var place = results[i];
			      console.log(place);
			      // createMarker(results[i]);
		    }
		  }
		});

		// console.log(searchQuery);
	}

	// first screen
	$('#submitlocation').click(function(){ // button click
		if($('#location').val()){ // get input value
			var location = $('#location').val();
			$('.screen2').show();

			// console.log("k,BFJKJDE");
			codeAddress(location);

			$('html, body').stop();
			// scroll to second div
			$('html, body').animate({
				scrollTop: $('.screen2').offset().top
			}, 'slow');

		} else {
			alert("Please enter a location");
		}

		return false;
	});

	// get vacation duration
	$('#lengthofstay').change(function(){
		durationLength = $('#lengthofstay').val();
	});

	$('.units').change(function(){
		durationUnits = $('#units').val();
	});

	$('#maketravelist').click(function(){

		$('html, body').stop();
		// scroll to second div
		$('html, body').animate({
			scrollTop: $('.screen3').offset().top
		}, 'slow');

		searchPlaces(locationToSearch);
	});

});