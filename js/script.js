$(function(){

	var location = "";
	var duration = "";
	var parameters = new Array();


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

	()


});