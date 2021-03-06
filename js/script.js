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
			
		});

		
		var request = {
		    location: location,
		    radius: 500,
		    types: parameters
		};

		console.log(parameters);

		service.nearbySearch(request, function(results, status){
			console.log("SEARCHING");
			
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				
			    for (var i = 0; i < results.length; i++) {
			      var place = results[i];
			      

			      thingsToDo.push(place);

		    }

		    var random;
		    var multItems;
		    var itemCounter = 0;
		    $('.to-do').empty();

			for (var i = 0; i < durationLength; i++) {
				
				var day = i + 1;
				
				var item = $("<li class='item' id='"+itemCounter+"'><div class='day-header'>Day "+day+"</div></li>");
				$('.to-do').append(item);

				for (var a = 0; a < parameters.length; a++) {
					random = Math.floor(Math.random()*thingsToDo.length);
					// console.log(a);
					var vicinity = thingsToDo[random]['vicinity'];
					multItems = $("<div class='thing-wrapper'><div class='thing'>"+thingsToDo[random]['name']+"</div><div class='thing'>"+vicinity+"</div></div>");
					console.log(multItems);
					$(".item#"+itemCounter).append(multItems);
					thingsToDo.splice(random, 1);

				};

				itemCounter = itemCounter + 1;
				
			};

		  }
		});

	}

	// first screen
	$('#submitlocation').click(function(){ // button click
		if($('#location').val()){ // get input value
			var location = $('#location').val();
			$('.screen2').show();

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