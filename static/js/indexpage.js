$(document).ready(function(){
	
	try{
		$('#programdate').datepicker({
            dateFormat: 'd MM yy, DD',
			monthNames: [ "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" ],
			dayNamesMin:[ "Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt" ],
			dayNames:   ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
 			firstDay: 	1,
 		});
	
		$('#programdate').datepicker('setDate', new Date());
		$('#programdate').prop('disabled',true);
	
	}catch(exp){	}
	

	$(document).on('click', "#prevdate", function() {
		var date = $('#programdate').datepicker('getDate');
       	date.setDate(date.getDate() - 1)
       	$('#programdate').datepicker('setDate', date);
		$("#races").empty();
		$("#loadraces").show();
		var programdate = $('#programdate').datepicker('getDate');
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/prgchange/',
        	traditional : true,
        	data: {
            	programdate : programdate,
        	},
        	success: function(data) {
				
				for(let i=0; i<data.races.length; i++){
					$("#loadraces").hide();
					$("#races").append('<button type="button" class="btn btn-outline-info racefixture" style="margin:3%" id='+data.races[i].fields.raceid+' sehir='+data.races[i].fields.key+'>'+data.races[i].fields.key+'</button>');
				}
    	   	}

    	});


	});
	
	$(document).on('click', "#nextdate", function() {
		var date = $('#programdate').datepicker('getDate');
       	date.setDate(date.getDate() + 1)
       	$('#programdate').datepicker('setDate', date);
		$("#races").empty();
		$("#loadraces").show();
		var programdate = $('#programdate').datepicker('getDate');
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/prgchange/',
        	traditional : true,
        	data: {
            	programdate : programdate,
        	},
        	success: function(data) {
				$("#loadraces").hide();
				for(let i=0; i<data.races.length; i++){
					$("#races").append('<button type="button" class="btn btn-outline-info racefixture" style="margin:3%" id='+data.races[i].fields.raceid+' sehir='+data.races[i].fields.key+'>'+data.races[i].fields.key+'</button>');
				}
    	   	}

    	});

	});
	
    $(document).on('click', ".racefixture", function() {
		var programdate = $('#programdate').datepicker('getDate');
		window.location = "/fixture/?programdate="+programdate+"&cityname="+$(this).attr("sehir");
	});
	
	
	
	var register_inputs = $(".needs-validation").find("input.form-control");
	$(register_inputs).each(function(){
		$(this).change(function(){
			var type 	= $(this).attr("id");
			var value 	= $(this).val();
			var valid	= true;
			switch(type) {
  				case "email":
				valid = value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    			break;

				case "phone":
				valid = value.match(/^5{1}[0-9]{9}$/);
    			break;
				
				case "firstname":
    			valid = value.match(/^[a-zA-Z]{3,}$/);
    			break;
  			
				case "surname":
    			valid = value.match(/^[a-zA-Z]{3,}$/);
    			break;

				case "username":
    			valid = value.match(/^[a-zA-Z\-0-9]{3,}$/);
    			break;

				case "password":
				valid = value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
    			break;

			} // switch case end
			
			if(valid){
				$(this).removeClass("is-invalid");
				$(this).addClass("is-valid");
			}else{
				$(this).removeClass("is-valid");
				$(this).addClass("is-invalid");
			}
		});		
	});
	
	
	// REGISTER BUTTON CLICK
	$(document).on('click', "#register", function() {
	
		var email 		= $("#email").val();	
		var phone 		= $("#phone").val();
		var firstname 	= $("#firstname").val();	
		var surname 	= $("#surname").val();	
		var username 	= $("#username").val();	
		var password 	= $("#password").val();
		
		if(!email)
			$("#email").addClass("is-invalid");	
		if(!username)
			$("#username").addClass("is-invalid");	
		if(!password)
			$("#password").addClass("is-invalid");	
			
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/registeruser/',
        	traditional : true,
        	data: {
            	email 		: email,
				phone		: phone,
				firstname	: firstname,
				surname		: surname,
				username	: username,
				password	: password,
        	},
        	success: function(data) {
				
    	   	}

    	});
	
	});
	
	
	
}); // document ready end

