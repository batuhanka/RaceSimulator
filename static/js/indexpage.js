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
	
	$(document).on('click', "#register", function() {
		$(this).prev().hide(1000);
		$(this).show(1000);
		$(this).parent().next().hide(1000);
		$(this).parent().prev().animate({
        'opacity' : 0
    	}, 1000, function(){
        	$(this).html('<div class="input-group mb-2"><div class="input-group-append">'+
					'<span class="input-group-text"><i class="fas fa-envelope"></i></span></div>'+
					'<input id="email" type="email" class="form-control input_email" placeholder="email"></div>').animate({'opacity': 1}, 1000);});
	});
	
	$(document).on('click', "#register", function() {
		$(this).hide(1000);
		$(this).parent().hide(1000);
		$(this).parent().next().hide(1000);
		$(this).parent().prev().animate({
        'opacity' : 0
    	}, 1000, function(){
        	$(this).html('<div class="input-group mb-2"><div class="input-group-append">'+
					'<span class="input-group-text"><i class="fas fa-envelope"></i></span></div>'+
					'<input id="email" type="email" class="form-control input_email" placeholder="email"></div>').animate({'opacity': 1}, 1000);});
	});

}); // document ready end

