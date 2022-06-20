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
		//var mobile		= $("#mobilecheck").is(':checked');
		var mobile		= true;
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/prgchange/',
        	traditional : true,
        	data: {
            	programdate : programdate,
				mobile		: mobile,
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
		var mobile		= $("#mobilecheck").is(':checked');
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/prgchange/',
        	traditional : true,
        	data: {
            	programdate : programdate,
				mobile		: mobile,
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
		var mobile		= $("#mobilecheck").is(':checked');
		window.location = "/fixture/?mobile=true&programdate="+programdate+"&cityname="+$(this).attr("sehir");
	});
	

}); // document ready end

