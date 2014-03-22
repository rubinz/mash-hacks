$(function(){

	var key = "AIzaSyDxkvEZeeOg3-mlkcHpdkCUC5ws5Ltqhgc";

	// set div to screen size
	$('.screen1, .screen2').css({ height: $(window).innerHeight() });
	$(window).resize(function(){
	  $('.screen1, .screen2').css({ height: $(window).innerHeight() });
	});

	var locationToSearch;
	var durationLength = "";
	var durationUnits = "";
	var parameters = new Array();

	var geocoder = new google.maps.Geocoder();

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

		console.log("LOCATION: "+location);

		// var searchQuery = "https://maps.googleapis.com/maps/api/place/search/json
		// 				  ?location="+location+"
		// 				  &radius=400
		// 				  &sensor=false
		// 				  &key="+key;

		console.log(searchQuery);
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