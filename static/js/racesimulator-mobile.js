$(document).ready(function(){
	
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
	
				//var horsetd		= $(thistd).prev().prev();
				var horsespan 	= $(thistd).parent().prev().find("span")[0];
				var horsecolor 	= $(horsespan).text().split(" ")[1];
				// set horse don colour
				if(horsecolor == 'a'){
					$(horsespan).addClass("badge-danger");
				}
				if(horsecolor == 'd'){
					$(horsespan).addClass("badge-warning");
				}
				if(horsecolor == 'k'){
					$(horsespan).addClass("badge-secondary");
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
	
	
}); // document ready end

/*
var datatable;
$(document).ajaxStop(function() {
	try{
  		$(datatable).DataTable().destroy();
		$(datatable).DataTable(tableOptions2);
		$(".simulation").each(function (){
			$(this).prop('disabled', false);
		});
		$(".showracelist").each(function (){
			$(this).prop('disabled', false);
		});
	}catch(exp){	}
});
*/

$(document).on('click', ".velocities", function() {
	
	//Show Loading Row
	var loadingrows 	= $(this).closest("table").find("tbody tr.loadingrow");
	var calculations	= $(this).closest("table").find("tbody tr.calculations");
	var finaldegreerows	= $(this).closest("table").find("tbody tr.finaldegree");
	
	// Calculate Year Prizes
	$(calculations).each(function (){
		$(loadingrows).show();
		var prizeElement	= $(this).find("b.yearprize");
		var horsecode		= $(this).attr('horsecode');
		
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/yearprize/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
        	},
        	success: function(data) {
				if(data.yearprize == 0){
					$(prizeElement).text("");
				}else{
					$(prizeElement).text(data.yearprize+"  ₺");
					$(prizeElement).addClass("text-info");
				}
        	}
    	});
	});
	
	
	// Calculate Gallop Seconds
	$(calculations).each(function (){
		$(loadingrows).show();
		var gallopElement 	= $(this).find("b.gallop");
		var horsename 		= $(this).attr('horsename');
		var kgs 			= $(this).attr('kgs');
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/gallop/',
        	traditional : true,
        	data: {
				horsename 	: horsename,
				kgs 		: kgs,
        	},
        	success: function(data) {
				if(data.gallop_avg_degree == 0){
					$(gallopElement).text("");
				}else{
					$(gallopElement).text(data.gallop_avg_degree);
					$(gallopElement).addClass("text-info");
				}
        	},
			complete: function(){
				$(loadingrows).hide();
				$(calculations).show();
			}
    	});
	});
	
	
	// Calculate Final Degree Seconds
	$(finaldegreerows).each(function (){
		$(loadingrows).show();
		var degreeElement 	= $(this).find("b.degreeinfo");
		var horsecode 		= $(this).attr("horsecode");
		var courtcode 		= $(this).attr("courtcode");
		var distance 		= $(this).attr("distance");
		var weight 			= $(this).attr("weight");
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
					$(degreeElement).text("");
				}else{
					$(degreeElement).text(data.prize_avg_degree);
				}
        	},
			complete: function(){
				$(loadingrows).hide();
				$(finaldegreerows).show();
			}
    	});
	});
	
	
	/*
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
	*/
	
	
	/*
	// Horse Year Prize Calculations
	$(this).parent().parent().find('table').find('.yearprize').each(function (){
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/yearprize/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
        	},
        	success: function(data) {
				if(data.yearprize == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h7");
					$(thisbtn).parent().text(data.yearprize+"  ₺")
				}
        	}
    	});
		
	});
	*/
	
	/*
	// Show Simulation Button
	$(this).prev().show();
	$(this).prev().prop('disabled',true);
	
	// Show Race List Button 
	$(this).prev().prev().show();
	$(this).prev().prev().prop('disabled',true);
	
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
	
	
	// Horse Gallop Calculations
	$(this).parent().parent().find('table').find('.gallop').each(function (){
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		var weight 		= $(this).attr("weight");
		var horsename	= $(this).attr("horsename");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/gallop/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
				weight	  : weight,
				horsename : horsename,
        	},
        	success: function(data) {
				if(data.gallop_avg_degree == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h6");
					$(thisbtn).parent().text(data.gallop_avg_degree)
				}
        	}
    	});
		
	});
	
	
	
	// Horse Year Prize Calculations
	$(this).parent().parent().find('table').find('.yearprize').each(function (){
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/yearprize/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
        	},
        	success: function(data) {
				if(data.yearprize == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h7");
					$(thisbtn).parent().text(data.yearprize+"  ₺")
				}
        	}
    	});
		
	});
	*/
	
});

/*
$(document).on('click', ".simulation", function() {
	
	var cardbody	= $(this).parent().next().children();
	var racetable 	= $(this).parent().parent().find("table")[0];
	var datatable	= $(racetable).DataTable();
	
	var bestdegree 	= $($($(racetable).find("tbody tr")[0]).find("td")[13]).text();
	var temp 		= bestdegree.split('.'); // split it at the colons
	var bestseconds = ( (+temp[0] * 60) + (+temp[1]) + (+temp[2] / 100) ); 
	
	datatable.order([18,'asc']).draw();
	var rows 		= $(racetable).find("tbody tr");
	var racers 		= [];
	
	
	for(var i=0; i<rows.length; i++){
		var horse			= {};
		var cols 			= $(rows[i]).find("td");
		horse["jersey"]		= $(cols[1]).children()[0];
		var jerseybg		= $($(cols[1]).children()[0]).attr('jerseybg');
		horse["number"] 	= $(cols[2]).children()[0];
		horse["name"] 		= $(cols[3]).children()[0];
		var temp 			= $(cols[13]).text().split(".");
		var horseseconds 	= ( (+temp[0] * 60) + (+temp[1]) + (+temp[2] / 100) );
		var calcwidth		= (bestseconds * 100 / horseseconds) + '%';
		horse["progress"]	= '<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" calc="'+calcwidth+'" style="width: 0%; background-color:'+jerseybg+';"></div></div>';
		racers.push(horse);
	};
	
	$(racetable).fadeOut(2000, function(){ 
		
	$(this).hide(); 
	
	$(cardbody).append('<table id="'+racetable.id+'-racers" class="table racers">'+
						'<thead class="thead-light">'+
						'<tr class="row align-items-center" style="display:revert;">'+
							'<th class="col-sm-1">Forma</th>'+
							'<th class="col-sm-1">No</th>'+
							'<th class="col-sm-2">At İsmi</th>'+
							'<th class="col-sm-8" style="text-align: center;">Yarış Simulasyonu</th>'+
						'</tr>'+
						'</thead>'+
						'<tbody>'+
						'</tbody>'+
						'</table>');
	
	
	for(var i=0; i<racers.length; i++){
		
		$("#"+racetable.id+"-racers tbody").append('<tr class="row align-items-center" style="display:revert;">'+
								 '<td class="col-sm-1" style="vertical-align: middle;">'+racers[i]["jersey"].outerHTML+'</td>'+
								 '<td class="col-sm-1" style="vertical-align: middle;">'+racers[i]["number"].outerHTML+'</td>'+
								 '<td class="col-sm-2" style="vertical-align: middle;">'+racers[i]["name"].outerHTML+'</td>'+
								 '<td class="col-sm-8" style="vertical-align: middle;">'+racers[i]["progress"]+'</td>'+
								 '</tr>');
							
	}
	
	$("#"+racetable.id+"-racers").find(".progress-bar").each(function(){
		$(this).animate({width: $(this).attr('calc') }, 8000);
	});
	
	//$(".progress-bar").animate({width: "100%"}, 3500);
	
	}); // race table clear animate completed
	
});


$(document).on('click', ".showracelist", function() {
	var racetable 	= $(this).parent().parent().find("table")[0];
	var racers 		= $(this).parent().parent().find("table")[1];
	$(racers).remove();
	$(racetable).show();
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


$(document).on('click', ".gallop", function() {
		var thisbtn	 	= $(this);
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var horsecode 	= $(this).attr("id");
		var courtcode 	= $(this).attr("courtcode");
		var distance 	= $(this).attr("distance");
		var weight 		= $(this).attr("weight");
		var horsename	= $(this).attr("horsename");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/gallop/',
        	traditional : true,
        	data: {
            	horsecode : horsecode,
				courtcode : courtcode,
				distance  : distance,
				weight    : weight,
				horsename : horsename,
        	},
        	success: function(data) {
            	if(data.gallop_avg_degree == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h6");
					$(thisbtn).parent().text(data.gallop_avg_degree)
				}
        	}
    	});
		
});



$(document).on('click', ".yearprize", function() {
		$(this).html("");
		$(this).append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
		var thisbtn	 	= $(this);
		var horsecode 	= $(this).attr("id");
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/yearprize/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
        	},
        	success: function(data) {
				if(data.yearprize == 0){
					$(thisbtn).remove();
				}else{
					$(thisbtn).parent().addClass("text-info font-weight-bold h7");
					$(thisbtn).parent().text(data.yearprize+"  ₺");
				}
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

*/

