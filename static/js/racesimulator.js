jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	
    "non-empty-string-asc": function (str1, str2) {
        if(str1 == "" && str2 != "")
            return 1;
        if(str2 == "" && str1 != "")
            return -1;
        if(str1 == "" && str2 == "")
        		return 0;
        return ((str1 < str2) ? -1 : ((str1 > str2) ? 1 : 0));
    },
 
    "non-empty-string-desc": function (str1, str2) {
        if(str1 == "" && str2 != "")
            return -1;
        if(str2 == "" && str1 != "")
            return 1;
        if(str1 == "" && str2 == "")
        		return 0;
        return ((str1 < str2) ? 1 : ((str1 > str2) ? -1 : 0));
    }
});

var tableOptions = {
			paging: false,
			searching: false,
			info:false,
			order: [0,'asc'],
			autoWidth: false,
        	columnDefs: [
            	{ orderable: true,  targets: [0,2,3,4,5,7,8,10,17,18] },
				{ orderable: true,  type:'non-empty-string', targets: [13,14,15] },
            	{ orderable: false, targets: '_all' },
        	]
}

var tableOptions2 = {
			paging: false,
			searching: false,
			info:false,
			order: [15,'asc'],
			autoWidth: false,
        	columnDefs: [
            	{ orderable: true, targets: [0,2,3,4,5,7,8,10,17,18] },
				{ orderable: true, type:'non-empty-string', targets: [13,14,15] },
            	{ orderable: false, targets: '_all' },
        	]
}


$(document).ready(function(){
	
	$(".progress").each(function() {

    var value 	= $(this).attr('data-value');
    var left 	= $(this).find('.progress-left .progress-bar');
    var right 	= $(this).find('.progress-right .progress-bar');

    if (value > 0) {
    	if (value <= 50) {
        	right.css('transform', 'rotate(' + (value) / 100 * 360 + 'deg)')
      	} else {
        	right.css('transform', 'rotate(180deg)')
        	left.css('transform', 'rotate(' + (value - 50) / 100 * 360 + 'deg)')
      	}
    }

  	});
	
	
	$(".racetable").each(function() {
		var tableid = $(this).attr("id");
		$('#'+tableid).DataTable( tableOptions );
	});

	try{
		var activeitem = $('.collapse.show')[0];	
		var scrollPos =  $($(activeitem).parent().parent()).offset().top - 10;
		$('html, body').animate({ scrollTop: scrollPos }, 2000);
	}catch(exp){}


	$(".racerule").each(function(){
		var thisspan	= $(this);
		var raceid 		= $(this).attr("raceid");
		var racedate 	= $(this).attr("racedate");
		var cityinfo 	= $(this).attr("cityinfo");
		var citycode 	= $(this).attr("citycode");
		
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/racerule/',
        	traditional : true,
        	data: {
            	raceid 		: raceid,
				racedate 	: racedate,
				cityinfo  	: cityinfo,
				citycode	: citycode,
        	},
        	success: function(data) {
				$(thisspan).text(data.rule);
        	}
    	});
		
		
	});
	
	
	
	$(".parent").each(function(){
		var thistd 		= $(this);
		var horsecode	= $(this).attr("horsecode");
		
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsetype/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
        	},
        	success: function(data) {
	
				var horsetd		= $(thistd).prev().prev();
				var horsecolor 	= $(horsetd).text().split(" ")[1];
				// set horse don colour
				if(horsecolor == 'a'){
					$((horsetd).children()[0]).addClass("badge-danger");
				}
				if(horsecolor == 'd'){
					$((horsetd).children()[0]).addClass("badge-warning");
				}
				if(horsecolor == 'k'){
					$((horsetd).children()[0]).addClass("badge-secondary");
				}
	
				// set father don colour
				if(data.fathertype == 'a'){
					$($(thistd).children()[0]).addClass("badge-danger");
				}
				if(data.fathertype == 'd'){
					$($(thistd).children()[0]).addClass("badge-warning");
				}
				if(data.fathertype == 'k'){
					$($(thistd).children()[0]).addClass("badge-secondary");
				}
				
				// set mother don colour
				if(data.mothertype == 'a'){
					$($(thistd).children()[2]).addClass("badge-danger");
				}
				if(data.mothertype == 'd'){
					$($(thistd).children()[2]).addClass("badge-warning");
				}
				if(data.mothertype == 'k'){
					$($(thistd).children()[2]).addClass("badge-secondary");
				}
        	}
    	});
	});
	
	
	
	$(".yearprize").each(function(){
		var thisdiv		= $(this);
		var horsecode	= $(this).attr("horsecode");
		
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/yearprize/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
        	},
        	success: function(data) {
				$(thisdiv).parent().empty().append(data.yearprize+' &#8378;');
        	}
    	});
	});
	
	
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
	datatable = $(this).parent().parent().find('.racetable')
	$(this).parent().parent().find('table').find('.horsepower').each(function (){
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		var weight 		= $(this).attr("weight");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsepower/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
				weight	  : weight,
        	},
        	success: function(data) {
				if(data.avg_degree == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h6");
					$(thisbtn).parent().text(data.avg_degree)
					//$(thisbtn).text(data.avg_degree);
				}
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
		var weight 		= $(this).attr("weight");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsespeed/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
				weight	  : weight,
        	},
        	success: function(data) {
				if(data.prize_avg_degree == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h6");
					$(thisbtn).parent().text(data.prize_avg_degree)
				}
        	}
    	});
		
	});
	
	
	// Horse Last 800 Speed Calculations
	/*
	$(this).parent().parent().find('table').find('.last800').each(function (){
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		var weight 		= $(this).attr("weight");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/last800/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
				weight	  : weight,
        	},
        	success: function(data) {
            	if(data.last_avg_degree == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).text(data.last_avg_degree);
				}
        	}
    	});
		
	});
	*/
	
});


$(document).on('click', ".horsepower", function() {
		var thisbtn	 	= $(this);
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		var weight 		= $(this).attr("weight");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsepower/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
				weight	  : weight,
        	},
        	success: function(data) {
				if(data.avg_degree == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h6");
					$(thisbtn).parent().text(data.avg_degree)
				}
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
		var weight 		= $(this).attr("weight");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/horsespeed/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
				weight    : weight,
        	},
        	success: function(data) {
            	if(data.prize_avg_degree == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h6");
					$(thisbtn).parent().text(data.prize_avg_degree)
				}
        	}
    	});
		
});


/*
$(document).on('click', ".last800", function() {
		var thisbtn	 	= $(this);
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		var weight 		= $(this).attr("weight");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/last800/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
				weight    : weight,
        	},
        	success: function(data) {
            	if(data.last_avg_degree == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).text(data.last_avg_degree);
				}
        	}
    	});
		
});
*/

$(document).on('click', ".statsinfo", function() {
		var horsecode 	= $(this).attr("id");
		var horseinfo 	= $(this).attr("horseinfo");
		var racecode 	= $(this).attr("racecode");
		var cityname 	= $(this).attr("cityname");
		var dateinfo 	= $(this).attr("dateinfo");
		$("#rivalstatsinfo tbody").empty();
		$("#siblinginfodiv").empty();
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
				$("#siblinginfodiv").empty();
				$("#rivalstatsinfo").hide();
				for (let i = 0; i < data.stats.length; i++) {
					$("#statsinfodiv").append(data.stats[i])
				}
				
				for (let i = 0; i < data.siblinginfo.length; i++) {
					$("#siblinginfodiv").append(data.siblinginfo[i])
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
	$("#siblinginfodiv").empty();
	$("#statsinfodiv").append(	'<div id="loadingdiv" style="text-align: center;"><button class="btn btn-white text-info" type="button" disabled>'+
  								'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><b> Yükleniyor . . .</b></button></div>');
});

$(document).on('click', ".close", function() {
	$("#statsModalLongTitle").text("İstatistikler");
	$("#statsinfodiv").empty();
	$("#siblinginfodiv").empty();
	$("#statsinfodiv").append(	'<div id="loadingdiv" style="text-align: center;"><button class="btn btn-white text-info" type="button" disabled>'+
  								'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><b> Yükleniyor . . .</b></button></div>');
});



