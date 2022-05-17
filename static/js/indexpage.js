$(document).ready(function(){
	
	try{
		$('#programdate').datepicker({
            dateFormat: 'd MM yy DD',
			monthNames: [ "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" ],
			dayNamesMin:[ "Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt" ],
			dayNames:   ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
 			firstDay: 	1,
 		});
	
		$('#programdate').datepicker('setDate', new Date());
	
	}catch(exp){	}
	

	$(document).on('click', "#prevdate", function() {
		var date = $('#programdate').datepicker('getDate');
       	date.setDate(date.getDate() - 1)
       	$('#programdate').datepicker('setDate', date);

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
				$("#races").empty();
				for(let i=0; i<data.races.length; i++){
					$("#races").append('<a class="racefixture" style="cursor:pointer" id='+data.races[i].fields.raceid+' sehir='+data.races[i].fields.key+'>'+data.races[i].fields.key+'</a>');
				}
    	   	}

    	});


	});
	
	$(document).on('click', "#nextdate", function() {
		var date = $('#programdate').datepicker('getDate');
       	date.setDate(date.getDate() + 1)
       	$('#programdate').datepicker('setDate', date);

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
				$("#races").empty();
				for(let i=0; i<data.races.length; i++){
					$("#races").append('<a class="racefixture" style="cursor:pointer" id='+data.races[i].fields.raceid+' sehir='+data.races[i].fields.key+'>'+data.races[i].fields.key+'</a>');
				}
    	   	}

    	});

	});
	
    $(document).on('click', ".racefixture", function() {
		var programdate = $('#programdate').datepicker('getDate');
		var mobile		= $("#mobilecheck").is(':checked');
		window.location = "/fixture/?mobile="+mobile+"&programdate="+programdate+"&cityname="+$(this).attr("sehir");
	});
	

}); // document ready end

