
var tableOptions = {
			paging: false,
			searching: false,
			info:false,
			order: [0,'asc'],
        	columnDefs: [
            	{ orderable: true, className: 'reorder', targets: [0,2,4,5,7,10,12,13,14] },
            	{ orderable: false, targets: '_all' },
        	]
}

var tableOptions2 = {
			paging: false,
			searching: false,
			info:false,
			order: [13,'asc'],
        	columnDefs: [
            	{ orderable: true, className: 'reorder', targets: [0,2,4,5,7,10,12,13,14] },
            	{ orderable: false, targets: '_all' },
        	]
}


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
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/prgchange/',
        	traditional : true,
        	data: {
            	programdate : programdate,
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
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/prgchange/',
        	traditional : true,
        	data: {
            	programdate : programdate,
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
		window.location = "/fixture/?programdate="+programdate+"&cityname="+$(this).attr("sehir");
	});
	
	$(".racetable").each(function() {
		var tableid = $(this).attr("id")
		$("#"+tableid).DataTable( tableOptions );
	});

	try{
		var activeitem = $('.collapse.show')[0];
		var scrollPos =  $($(activeitem).parent().parent()).offset().top - 10;
		$('html, body').animate({ scrollTop: scrollPos }, 2000);
	}catch(exception){	}


}); // document ready end


var datatable;
$(document).ajaxStop(function() {
	try{
  		$(datatable).DataTable().destroy();
		$(datatable).DataTable(tableOptions2);
	}catch(exp){	}
});

$(document).on('click', ".velocities", function() {
	
	// Horse Power Calculations
	datatable = $(this).parent().parent().find('table')
	$(this).parent().parent().find('table').find('.horsepower').each(function (){
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsepower/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
        	},
        	success: function(data) {
				$(thisbtn).text(data.avg_speed);
				//$(thisbtn).parent().text(data.avg_speed)
        	}
    	});
		
	});
	

	
	// Horse Speed Calculations
	$(this).parent().parent().find('table').find('.horsespeed').each(function (){
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsespeed/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
        	},
        	success: function(data) {
            	$(thisbtn).text(data.prize_avg_speed);
        	}
    	});
		
	});
	
	
	// Horse Last 800 Speed Calculations
	$(this).parent().parent().find('table').find('.last800').each(function (){
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/last800/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
        	},
        	success: function(data) {
            	$(thisbtn).text(data.last_avg_speed);
        	}
    	});
		
	});
	
	
});


$(document).on('click', ".gamepage", function() {
	
	var racecode 	= $(this).attr("racecode");
	var cityname 	= $(this).attr("cityname");
	window.location = "/gamepage/?cityname="+cityname+"&racecode="+racecode
	
});

$(document).on('click', ".startrace", function() {
	var racecode 	= $(this).attr("racecode");
	var cityname 	= $(this).attr("cityname");
	window.location = "/startrace/"
});


$(document).on('click', ".horsepower", function() {
		var thisbtn	 	= $(this);
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsepower/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
        	},
        	success: function(data) {
            	$(thisbtn).text(data.avg_speed)
        }
    	});
});


$(document).on('click', ".horsespeed", function() {
		var thisbtn	 	= $(this);
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsespeed/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
        	},
        	success: function(data) {
            	$(thisbtn).text(data.prize_avg_speed)
        }
    	});
		
});

$(document).on('click', ".last800", function() {
		var thisbtn	 	= $(this);
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/last800/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
        	},
        	success: function(data) {
            	$(thisbtn).text(data.last_avg_speed)
        }
    	});
		
});


$(document).on('click', ".statsinfo", function() {
		var horsecode 	= $(this).attr("id");
		var horseinfo 	= $(this).attr("horseinfo");
		var racecode 	= $(this).attr("racecode");
		var cityname 	= $(this).attr("cityname");
		var dateinfo 	= $(this).attr("dateinfo");
		$("#rivalstatsinfo tbody").empty();
		$("#rivalstatsinfo").hide();
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/statsinfo/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
				racecode	: racecode,
				cityname	: cityname,
				dateinfo	: dateinfo,
        	},
        	success: function(data) {
				$("#statsModalLongTitle").text("İstatistikler");
				$("#statsinfodiv").empty();
				$("#rivalstatsinfo").hide();
				for (let i = 0; i < data.stats.length; i++) {
					$("#statsinfodiv").append(data.stats[i])
				}
				
				for (let [key, value] of Object.entries(data.rivalsinfo)){
					$("#rivalstatsinfo tbody").append(	'<tr>'+
														'<td style="text-align:center"><a href="https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?1=1&QueryParameter_AtId='+key+'">'+value[0]+'</a></td>'+
														'<td style="text-align:center">'+value[1]+'</td>'+
														'<td style="text-align:center">'+value[2]+'</td>'+
														'<td style="text-align:center">'+(parseInt(value[1]) + parseInt(value[2]))+'</td>'+
														'</tr>')
				}
				$("#rivalstatsinfo").show();
				$("#statsModalLongTitle").text(horseinfo);
			}
    	});
		
});

$(document).on('click', "#statsclosebtn", function() {
	$("#statsModalLongTitle").text("İstatistikler");
	$("#statsinfodiv").empty();
	$("#statsinfodiv").append(	'<div id="loadingdiv" style="text-align: center;"><button class="btn btn-white text-info" type="button" disabled>'+
  								'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><b> Yükleniyor . . .</b></button></div>');
});

$(document).on('click', ".close", function() {
	$("#statsModalLongTitle").text("İstatistikler");
	$("#statsinfodiv").empty();
	$("#statsinfodiv").append(	'<div id="loadingdiv" style="text-align: center;"><button class="btn btn-white text-info" type="button" disabled>'+
  								'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><b> Yükleniyor . . .</b></button></div>');
});



