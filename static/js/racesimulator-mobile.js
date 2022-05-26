$(document).ready(function(){
	
	
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

let flags = [];
$(document).ajaxStop(function() {
	
	/*
	try{
		var activeitem = $('.collapse.show')[0];	
		var scrollPos =  $($(activeitem).parent().parent()).offset().top - 10;
		$('html, body').animate({ scrollTop: scrollPos }, 2000);
	}catch(exp){}
	*/
	
	/*
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
	*/
});


$(document).on('click', ".velocities", function() {
	
	var orderbtn		= $(this).next();
	var tbody 			= $(this).closest("table").find("tbody");
	var loadingrows 	= $(this).closest("table").find("tbody tr.loadingrow");
	var calculations	= $(this).closest("table").find("tbody tr.calculations");
	var finaldegreerows	= $(this).closest("table").find("tbody tr.finaldegree");
	$(loadingrows).show();
	
	// Calculate Year Prizes
	$(calculations).each(function (){
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
        	}
    	}).done(function (){
			$(calculations).show();
		});
	});
	
	
	// Calculate Final Degree Seconds From Regression Analysis
	$(finaldegreerows).each(function (){
		flags.push($(this));
		var degreeElement 	= $(this).find("b.degreeinfo");
		var horsecode 		= $(this).attr("horsecode");
		var courtcode 		= $(this).attr("courtcode");
		var temperature		= $(this).attr("temperature")
    	var humidity   		= $(this).attr("humidity")
    	var grassrate  		= $(this).attr("grassrate")
    	var dirtstate  		= $(this).attr("dirtstate")
    	var distance   		= $(this).attr("distance")
    	var weight     		= $(this).attr("weight")
    	var handycap   		= $(this).attr("handycap")
    	var kgs        		= $(this).attr("kgs")
    	var last20     		= $(this).attr("last20")
		$.ajax({
        	type: "GET",
        	async: true,
        	url: '/degreepredict/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
				courtcode 	: courtcode,
				temperature : temperature,
				humidity	: humidity,
				grassrate	: grassrate,
				dirtstate	: dirtstate,
				distance  	: distance,
				weight	  	: weight,
				handycap	: handycap,
				kgs			: kgs,
				last20		: last20
        	},
        	success: function(data) {
				$(degreeElement).text(data.degree_predict);
				$(degreeElement).parent().parent().parent().next().hide();
				$(degreeElement).parent().parent().parent().show();
				flags.pop();
        	},
			complete: function() {
				if(flags.length == 0){ // all calculations are completed
					sortmytable(tbody, "degree");
					$(orderbtn).show();
				}
			},
    	});

	});

}); // END OF VELOCITIES	
	

$(document).on('click', ".sortfordegree", function() {
	var tbody = $(this).closest("table").find("tbody");
	sortmytable(tbody, "degree");
});

$(document).on('click', ".sortforagf", function() {
	var tbody = $(this).closest("table").find("tbody");
	sortmytable(tbody, "agf");
});

$(document).on('click', ".sortfornumber", function() {
	var tbody = $(this).closest("table").find("tbody");
	sortmytable(tbody, "number");
});

$(document).on('click', ".sortforgallop", function() {
	var tbody = $(this).closest("table").find("tbody");
	sortmytable(tbody, "gallop");
});

$(document).on('click', ".sortforyearprize", function() {
	var tbody = $(this).closest("table").find("tbody");
	sortmytable(tbody, "yearprize");
});

function sortmytable(tbody, sortoption){
	
	if(sortoption == "degree"){
	
		var allrows 		= $(tbody).find("tr");
		var sorted 		 	= []
		var ordered_rows 	= []
	
		for(i=4; i<allrows.length; i=i+6){
			var degree = $(allrows[i]).find("b.degreeinfo").text();
			sorted.push(degree);
		}
		
		sorted.sort();
		
		for(var i=0; i<sorted.length; i++){
			for(var j=4; j<allrows.length; j=j+6){
				
				if(sorted[i] == $(allrows[j]).find("b.degreeinfo").text()){
					
					ordered_rows.push($(allrows[j]).prev().prev().prev().prev());
					ordered_rows.push($(allrows[j]).prev().prev().prev());
					ordered_rows.push($(allrows[j]).prev().prev());
					ordered_rows.push($(allrows[j]).prev());
					ordered_rows.push($(allrows[j]));
					ordered_rows.push($(allrows[j]).next());
									
				}
			}
		}
		$(tbody).empty();
		$(tbody).append(ordered_rows);	
	
	} // end of degree sort
	
	if(sortoption == "agf"){
		
		var allrows 		= $(tbody).find("tr");
		var sorted 		 	= []
		var ordered_rows 	= []
		
		for(i=1; i<allrows.length; i=i+6){
			var spans 	= $($(allrows[i]).find("td")[2]).find("span");
			var agf1val	= $(spans[1]).text().substring(1);
			var agf2val	= $(spans[3]).text().substring(1);
			
			if(agf1val != "" && agf2val == ""){
				sorted.push(agf1val);
			}
			if(agf1val != "" && agf2val != ""){
				sorted.push(agf2val);
			}
			if(agf1val == "" && agf2val != ""){
				sorted.push(agf2val);
			}
		}
		
		sorted.sort(function(a,b) { return b - a;});
		
		for(var i=0; i<sorted.length; i++){
			for(var j=1; j<allrows.length; j=j+6){
				
				var spans 	= $($(allrows[j]).find("td")[2]).find("span");
				var agf1val	= $(spans[1]).text().substring(1);
				var agf2val	= $(spans[3]).text().substring(1);
				
				if(sorted[i] == agf1val || sorted[i] == agf2val){
					
					ordered_rows.push($(allrows[j]).prev().prev());
					ordered_rows.push($(allrows[j]).prev());
					ordered_rows.push($(allrows[j]));
					ordered_rows.push($(allrows[j]).next());
					ordered_rows.push($(allrows[j]).next().next());
					ordered_rows.push($(allrows[j]).next().next().next());
									
				}
			}
		}
		$(tbody).empty();
		$(tbody).append(ordered_rows);
		
		
	} // end of agf sort
	
	if(sortoption == "number"){
		
	} // end of number sort
	
	if(sortoption == "gallop"){
		
	} // end of gallop sort
	
	if(sortoption == "yearprize"){
		
	} // end of yearprize sort
	
	
}

