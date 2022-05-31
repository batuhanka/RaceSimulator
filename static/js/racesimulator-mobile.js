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

let flags 		= [];
let detailflags = [];
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
	
	/*
	$("#slider1").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 60,
    	mouseScrollAction: true,
    	step: "5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider2").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 60,
    	mouseScrollAction: true,
    	step: "5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider3").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 60,
    	mouseScrollAction: true,
    	step: "5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider4").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 60,
    	mouseScrollAction: true,
    	step: "5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider5").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 60,
    	mouseScrollAction: true,
    	step: "5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	
	$("#slider6").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 60,
    	mouseScrollAction: true,
    	step: "5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider7").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 60,
    	mouseScrollAction: true,
    	step: "5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider8").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 60,
    	mouseScrollAction: true,
    	step: "5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	*/
	
	//$("#calculateModal").modal('show');
	
	
	$(this).prop('disabled',true);
	var orderbtn		= $(this).next();
	var tbody 			= $(this).closest("table").find("tbody");
	var loadingrows 	= $(this).closest("table").find("tbody tr.loadingrow");
	var calculations	= $(this).closest("table").find("tbody tr.calculations");
	var finaldegreerows	= $(this).closest("table").find("tbody tr.finaldegree");
	var orderbuttons	= $(this).closest("table").find("thead div button");
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
				
				var horsehp		= $($(prizeElement).closest("tr").prev().prev().find("span")[3]).text();
				var ruletext	= $(prizeElement).closest("table").parent().parent().prev().find("span.racerule").text();
				var racetype	= $($(prizeElement).closest("table").parent().parent().prev().find("button").children()[2]).text().split(",")[0];
				var raceprizes	= $($(prizeElement).closest("table").parent().parent().prev().children())[1];
				var detailrow	= $(prizeElement).closest("tr").next();
				compare_racerule(data.yearprize, horsehp, ruletext, racetype, raceprizes, detailrow);
					
					/*
					if(condition){
						var temp = $($(prizeElement).closest("table").parent().parent().prev().find("span.racerule").text()).split(" TL")[0];
						var last = temp.split(" ");
						var rule = last[last.length - 1];
					}else{
						var temp = $($(prizeElement).closest("table").parent().parent().prev().find("span.racerule").text()).split("Puanları ")[1];
						var rule = temp.split(" arası")[0];
					}
					compare_racerule(data.yearprize, horsehp, rule);
					*/
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
		var temperature		= $(this).attr("temperature");
    	var humidity   		= $(this).attr("humidity");
    	var grassrate  		= $(this).attr("grassrate");
    	var dirtstate  		= $(this).attr("dirtstate");
    	var distance   		= $(this).attr("distance");
    	var weight     		= $(this).attr("weight");
    	var handycap   		= $(this).attr("handycap");
    	var kgs        		= $(this).attr("kgs");
    	var last20     		= $(this).attr("last20");
		var jockeycode 		= $(this).attr("jockeycode");
		var startno 		= $(this).attr("startno");
	
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
				last20		: last20,
				jockeycode	: jockeycode,
				startno		: startno,
        	},
        	success: function(data) {
				if(data.degree_predict == 0){
					$(degreeElement).text("");
				}else{
					$(degreeElement).text(data.degree_predict);
				}
				$(degreeElement).parent().parent().parent().next().hide();
				$(degreeElement).parent().parent().parent().show();
				flags.pop();
        	},
			complete: function() {
				if(flags.length == 0){ // all calculations are completed
					sortmytable(tbody, "degree");
					$(orderbuttons[0]).parent().prev().empty();
					$(orderbuttons[0]).parent().prev().append('<span class="fa-solid fa-sort fa-beat-fade"></span><b> Derece Sırala</b>');
					$(orderbuttons).each(function(){ $($(this).children()[0]).removeClass("sortDisplay").addClass("sorthide");	});
					$($(orderbuttons[0]).children()[0]).removeClass("sorthide").addClass("sortDisplay");
					$(orderbtn).show();
				}
			},
    	});

	}); // END OF FINAL DEGREE CALCULATIONS
	

}); // END OF VELOCITIES	
	

function compare_racerule(yearprize, horsehp, racerule, racetype, raceprizes, detailrow){
	
	var temp 		= racerule.split(" ");
	var prize1 		= parseFloat($($(raceprizes).children()[0]).text().trim().replace(".",""));
	//var prize2 		= parseFloat($($(raceprizes).children()[1]).text().trim().replace(".",""));
	//var prize3 		= parseFloat($($(raceprizes).children()[2]).text().trim().replace(".",""));
	//var prize4 		= parseFloat($($(raceprizes).children()[3]).text().trim().replace(".",""));
	//var prize5 		= parseFloat($($(raceprizes).children()[4]).text().trim().replace(".",""));
	var yearprize	= parseFloat(yearprize.replace(".",""));
	
	if(racetype.includes("ŞARTLI")){
		var prizemax 	= parseFloat(temp[4].replace(".",""));
		if( (yearprize + prize1) > prizemax ){
			$($(detailrow).children()[0]).prepend('<span class="badge badge-pill badge-warning"" style="float:left; font-size:larger;"><b>Kazanırsa tekrar bu grupta koşamaz.</b></span>');
		}
	}
	
	if(racetype.includes("Handikap")){
		var racehp = parseInt(temp[3]);
		var horsehp= parseInt(horsehp);
		if( (horsehp + 3) > racehp ){
			$($(detailrow).children()[0]).append('<span class="badge badge-pill badge-warning"" style="float:left; font-size:larger;"><b>Kazanırsa tekrar bu grupta koşamaz.</b></span>');
		}
		
	}


}


$(document).on('click', ".sortfornumber", function() {
	var tbody = $(this).closest("table").find("tbody");
	$($(tbody).prev().find("button")[1]).empty();
	$($(tbody).prev().find("button")[1]).append('<span class="fa-solid fa-sort fa-beat-fade"></span><b> Numara</b>');
	$($(tbody).prev().find("div button")).each(function(){ $($(this).children()[0]).removeClass("sortDisplay").addClass("sorthide");	});
	$($(this).children()[0]).removeClass("sorthide").addClass("sortDisplay");
	sortmytable(tbody, "number");
});

$(document).on('click', ".sortforagf", function() {
	var tbody = $(this).closest("table").find("tbody");
	$($(tbody).prev().find("button")[1]).empty();
	$($(tbody).prev().find("button")[1]).append('<span class="fa-solid fa-sort fa-beat-fade"></span><b> AGF</b>');
	$($(tbody).prev().find("div button")).each(function(){ $($(this).children()[0]).removeClass("sortDisplay").addClass("sorthide");	});
	$($(this).children()[0]).removeClass("sorthide").addClass("sortDisplay");
	sortmytable(tbody, "agf");
});

$(document).on('click', ".sortforhp", function() {
	var tbody = $(this).closest("table").find("tbody");
	$($(tbody).prev().find("button")[1]).empty();
	$($(tbody).prev().find("button")[1]).append('<span class="fa-solid fa-sort fa-beat-fade"></span><b> HP</b>');
	$($(tbody).prev().find("div button")).each(function(){ $($(this).children()[0]).removeClass("sortDisplay").addClass("sorthide");	});
	$($(this).children()[0]).removeClass("sorthide").addClass("sortDisplay");
	sortmytable(tbody, "hp");
});

$(document).on('click', ".sortforkgs", function() {
	var tbody = $(this).closest("table").find("tbody");
	$($(tbody).prev().find("button")[1]).empty();
	$($(tbody).prev().find("button")[1]).append('<span class="fa-solid fa-sort fa-beat-fade"></span><b> KGS</b>');
	$($(tbody).prev().find("div button")).each(function(){ $($(this).children()[0]).removeClass("sortDisplay").addClass("sorthide");	});
	$($(this).children()[0]).removeClass("sorthide").addClass("sortDisplay");
	sortmytable(tbody, "kgs");
});


$(document).on('click', ".sortforgallop", function() {
	var tbody = $(this).closest("table").find("tbody");
	$($(tbody).prev().find("button")[1]).empty();
	$($(tbody).prev().find("button")[1]).append('<span class="fa-solid fa-sort fa-beat-fade"></span><b> Galop</b>');
	$($(tbody).prev().find("div button")).each(function(){ $($(this).children()[0]).removeClass("sortDisplay").addClass("sorthide");	});
	$($(this).children()[0]).removeClass("sorthide").addClass("sortDisplay");
	sortmytable(tbody, "gallop");
});

$(document).on('click', ".sortforyearprize", function() {
	var tbody = $(this).closest("table").find("tbody");
	$($(tbody).prev().find("button")[1]).empty();
	$($(tbody).prev().find("button")[1]).append('<span class="fa-solid fa-sort fa-beat-fade"></span><b> Yıllık Kazanç</b>');
	$($(tbody).prev().find("div button")).each(function(){ $($(this).children()[0]).removeClass("sortDisplay").addClass("sorthide");	});
	$($(this).children()[0]).removeClass("sorthide").addClass("sortDisplay");
	sortmytable(tbody, "yearprize");
});

$(document).on('click', ".sortfordegree", function() {
	var tbody = $(this).closest("table").find("tbody");
	$($(tbody).prev().find("button")[1]).empty();
	$($(tbody).prev().find("button")[1]).append('<span class="fa-solid fa-sort fa-beat-fade"></span><b> Derece</b>');
	$($(tbody).prev().find("div button")).each(function(){ $($(this).children()[0]).removeClass("sortDisplay").addClass("sorthide");	});
	$($(this).children()[0]).removeClass("sorthide").addClass("sortDisplay");
	sortmytable(tbody, "degree");
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
		
		sorted.sort(function(a,b) { 
			
			if (a === b) {
        		return 0;
    		}

			// nulls sort after anything else
    		else if (a === '') {
        		return 1;
    		}
    		else if (b === '') {
        		return -1;
    		}

			return a < b ? -1 : 1;
		});
		
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
		
		if(ordered_rows.length > 0){
			$(tbody).empty();
			$(tbody).append(ordered_rows);
		}
	
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
		
		sorted.sort(function(a,b){ return b - a; });
		
		for(var i=0; i<sorted.length; i++){
			for(var j=1; j<allrows.length; j=j+6){
				
				var spans 	= $($(allrows[j]).find("td")[2]).find("span");
				var agf1val	= $(spans[1]).text().substring(1);
				var agf2val	= $(spans[3]).text().substring(1);
				
				if(sorted[i] == agf1val || sorted[i] == agf2val){
					
					ordered_rows.push($(allrows[j]).prev());
					ordered_rows.push($(allrows[j]));
					ordered_rows.push($(allrows[j]).next());
					ordered_rows.push($(allrows[j]).next().next());
					ordered_rows.push($(allrows[j]).next().next().next());
					ordered_rows.push($(allrows[j]).next().next().next().next());
									
				}
			}
		}
		
		if(ordered_rows.length > 0){
			$(tbody).empty();
			$(tbody).append(ordered_rows);
		}
		
		
	} // end of agf sort
	
	
	if(sortoption == "hp"){
		
		var allrows 		= $(tbody).find("tr");
		var sorted 		 	= []
		var ordered_rows 	= []
		
		for(i=1; i<allrows.length; i=i+6){
			var hpspan 	= $($(allrows[i]).find("td")[1]).find("span")[3];
			var hpval	= $(hpspan).text();
			sorted.push(hpval);
		}
		
		sorted.sort(function(a,b){ return b - a; });
		
		for(var i=0; i<sorted.length; i++){
			for(var j=1; j<allrows.length; j=j+6){
				
				var hpspan 	= $($(allrows[j]).find("td")[1]).find("span")[3];
				var hpval	= $(hpspan).text();
				
				if(sorted[i] == hpval){
					
					ordered_rows.push($(allrows[j]).prev());
					ordered_rows.push($(allrows[j]));
					ordered_rows.push($(allrows[j]).next());
					ordered_rows.push($(allrows[j]).next().next());
					ordered_rows.push($(allrows[j]).next().next().next());
					ordered_rows.push($(allrows[j]).next().next().next().next());
									
				}
			}
		}
		
		if(ordered_rows.length > 0){
			$(tbody).empty();
			$(tbody).append(ordered_rows);
		}
		
		
	} // end of hp sort
	
	
	
	if(sortoption == "kgs"){
		
		var allrows 		= $(tbody).find("tr");
		var sorted 		 	= []
		var ordered_rows 	= []
		
		for(i=1; i<allrows.length; i=i+6){
			var kgsspan = $($(allrows[i]).find("td")[1]).find("span")[5];
			var kgsval	= $(kgsspan).text();
			sorted.push(kgsval);
		}
		
		sorted.sort(function(a,b){ return a - b; });
		
		for(var i=0; i<sorted.length; i++){
			for(var j=1; j<allrows.length; j=j+6){
				
				var kgsspan = $($(allrows[j]).find("td")[1]).find("span")[5];
				var kgsval	= $(kgsspan).text();
				
				if(sorted[i] == kgsval){
					
					ordered_rows.push($(allrows[j]).prev());
					ordered_rows.push($(allrows[j]));
					ordered_rows.push($(allrows[j]).next());
					ordered_rows.push($(allrows[j]).next().next());
					ordered_rows.push($(allrows[j]).next().next().next());
					ordered_rows.push($(allrows[j]).next().next().next().next());
									
				}
			}
		}
		
		if(ordered_rows.length > 0){
			$(tbody).empty();
			$(tbody).append(ordered_rows);
		}
		
		
	} // end of kgs sort
	
	
	
	if(sortoption == "number"){
		
		var allrows 		= $(tbody).find("tr");
		var sorted 		 	= []
		var ordered_rows 	= []
		
		for(i=0; i<allrows.length; i=i+6){
			var number 	= $(allrows[i]).find("td button").text();
			sorted.push(number);
		}
		
		sorted.sort(function(a,b){ return a - b; });
		
		for(var i=0; i<sorted.length; i++){
			for(var j=0; j<allrows.length; j=j+6){
				
				var number 	= $(allrows[j]).find("td button").text();
				if(sorted[i] == number){
					
					ordered_rows.push($(allrows[j]));
					ordered_rows.push($(allrows[j]).next());
					ordered_rows.push($(allrows[j]).next().next());
					ordered_rows.push($(allrows[j]).next().next().next());
					ordered_rows.push($(allrows[j]).next().next().next().next());
					ordered_rows.push($(allrows[j]).next().next().next().next().next());
									
				}
			}
		}
		
		if(ordered_rows.length > 0){
			$(tbody).empty();
			$(tbody).append(ordered_rows);
		}
		
		
	} // end of number sort
	
	if(sortoption == "gallop"){
		
		var allrows 		= $(tbody).find("tr");
		var sorted 		 	= []
		var ordered_rows 	= []
		
	
		for(i=3; i<allrows.length; i=i+6){
			var gallop = $(allrows[i]).find("b.gallop").text();
			sorted.push(gallop);
		}
		
		sorted.sort(function(a,b) { 
			
			if (a === b) {
        		return 0;
    		}

			// nulls sort after anything else
    		else if (a === '') {
        		return 1;
    		}
    		else if (b === '') {
        		return -1;
    		}

			return a < b ? -1 : 1;
		});
		
		for(var i=0; i<sorted.length; i++){
			for(var j=3; j<allrows.length; j=j+6){
				
				if(sorted[i] == $(allrows[j]).find("b.gallop").text()){
					
					
					ordered_rows.push($(allrows[j]).prev().prev().prev());
					ordered_rows.push($(allrows[j]).prev().prev());
					ordered_rows.push($(allrows[j]).prev());
					ordered_rows.push($(allrows[j]));
					ordered_rows.push($(allrows[j]).next());
					ordered_rows.push($(allrows[j]).next().next());
									
				}
			}
		}
		
		if(ordered_rows.length > 0){
			$(tbody).empty();
			$(tbody).append(ordered_rows);
		}
		
		
		
	} // end of gallop sort
	
	if(sortoption == "yearprize"){
		
		var allrows 		= $(tbody).find("tr");
		var sorted 		 	= []
		var ordered_rows 	= []
		
	
		for(i=3; i<allrows.length; i=i+6){
			var yearprize = $(allrows[i]).find("b.yearprize").text();
			yearprize = yearprize.split("  ₺")[0];
			sorted.push(yearprize);
		}
		
		sorted.sort(function(a,b) { 
			
			if (a === b) {
        		return 0;
    		}

			// nulls sort after anything else
    		else if (a === '') {
        		return 1;
    		}
    		else if (b === '') {
        		return -1;
    		}

			return b - a;
			
		});
		
		for(var i=0; i<sorted.length; i++){
			for(var j=3; j<allrows.length; j=j+6){
				
				if(sorted[i]+"  ₺" == $(allrows[j]).find("b.yearprize").text()){
					
					
					ordered_rows.push($(allrows[j]).prev().prev().prev());
					ordered_rows.push($(allrows[j]).prev().prev());
					ordered_rows.push($(allrows[j]).prev());
					ordered_rows.push($(allrows[j]));
					ordered_rows.push($(allrows[j]).next());
					ordered_rows.push($(allrows[j]).next().next());
									
				}
			}
		}
		
		if(ordered_rows.length > 0){
			$(tbody).empty();
			$(tbody).append(ordered_rows);
		}
		
		
	} // end of yearprize sort
	
	
}

