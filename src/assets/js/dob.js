

$(document).ready(function(){
    $("#dob").focus( function() {
	    $(this).attr({type: 'date'});
      });
});