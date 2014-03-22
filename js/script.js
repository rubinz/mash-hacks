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
	var thingsToDo = new Array();

	var geocoder = new google.maps.Geocoder();
	
	service = new google.maps.places.PlacesService(map);

	function codeAddress(location) {
	    
	    geocoder.geocode( { 'address': location}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        

	    	// console.log(results[0].geometry.location);
	    	locationToSearch = results[0].geometry.location;

	      } else {
	        console.log("Geocode was not successful for the following reason: " + status);
	      }

	    });
	  }

	function searchPlaces(location) {


		$('[type=checkbox]').each(function(){
			if(this.checked){
				parameters.push(this.value);
			}
			// console.log(sThisVal);
		});

		// console.log(location);
		// var currentLoc = new google.maps.LatLng(location['k'], location['A']);
		// console.log(currentLoc);
		// var searchQuery = "https://maps.googleapis.com/maps/api/place/search/json?location="+location+"&radius=400&sensor=false&key="+key;

		var request = {
		    location: location,
		    radius: 500,
		    types: parameters
		};

		console.log(parameters);

		service.nearbySearch(request, function(results, status){
			console.log("SEARCHING");
			// console.log(google.maps.places.PlacesServiceStatus);
			// var status = "OK";
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				// console.log("OK");
			    for (var i = 0; i < results.length; i++) {
			      var place = results[i];
			      console.log(place);

			      thingsToDo.push(place);

			      // createMarker(results[i]);
		    }

		    var random;
			for (var i = 0; i < durationLength; i++) {
				
				var day = i + 1;
				// var header = $("<div class='day-header'>Day "+day+"</div>")
				
				var item = $("<li class='item'><div class='day-header'>Day "+day+"</div></li>");
				$('.to-do').append(item);
				for (var a = 0; a < parameters.length; a++) {
					random = Math.floor(Math.random()*thingsToDo.length);
					var vicinity = thingsToDo[random]['vicinity'];
					var multItems = $("<div class='thing'>"+thingsToDo[random]['name']+"</div><div class='thing'>"+vicinity+"</div>");
					$(".item").append(multItems);
				};
				
			};
		    // else {
		    // 	console.log("Status not ok");
		    // }
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

	// off to third screen
	$('#maketravelist').click(function(){
		$('.screen3').show();
		$('html, body').stop();
		// scroll to second div
		$('html, body').animate({
			scrollTop: $('.screen3').offset().top
		}, 'slow');

		searchPlaces(locationToSearch);
	});

});