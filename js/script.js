$(function(){

	var location = "";
	var durationLength = "";
	var durationUnits = "";
	var parameters = new Array();

	// var geocoder = new GL

	// first screen
	$('#submitlocation').click(function(){ // button click
		if($('#location').val()){ // get input value
			location = $('#location').val();
			$('.screen2').show();

			// console.log("k,BFJKJDE");

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



});