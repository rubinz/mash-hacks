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

			// scroll to second div
			$('body,html').animate({
				scrollTop: $('.screen2').position.top()
			}, 'slow');

		} else {
			alert("Please enter a location");
		}
	});

	// get vacation duration
	$('#lengthofstay').change(function(){
		durationLength = $('#lengthofstay').val();
	});

	$('.units').change(function(){
		durationUnits = $('#units').val();
	});



});