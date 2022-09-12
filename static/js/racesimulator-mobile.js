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

$(document).on('click', "#customcalculate", function() {
	var value1 = $("#slider1").roundSlider("getValue");
	var value2 = $("#slider2").roundSlider("getValue");
	var value3 = $("#slider3").roundSlider("getValue");
	var value4 = $("#slider4").roundSlider("getValue");
	var value5 = $("#slider5").roundSlider("getValue");
	var value6 = $("#slider6").roundSlider("getValue");
	var value7 = $("#slider7").roundSlider("getValue");
	var value8 = $("#slider8").roundSlider("getValue");
	
	console.log(value1, value2, value3, value4 , value5 , value6 , value7 , value8)
	
	var total  = value1 + value2 + value3 + value4 + value5 + value6 + value7 + value8;
	if(total != 100){
		console.log("tüm etki değerlerinin toplamı 100 olmalıdır.")
	}
	
});

$(document).on('click', "#closecalculate", function() {
	
});

$(document).on('click', ".settings", function() {
$("#slider1").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 12.5,
    	mouseScrollAction: true,
    	step: "0.5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider2").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 12.5,
    	mouseScrollAction: true,
    	step: "0.5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider3").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 12.5,
    	mouseScrollAction: true,
    	step: "0.5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider4").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 12.5,
    	mouseScrollAction: true,
    	step: "0.5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider5").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 12.5,
    	mouseScrollAction: true,
    	step: "0.5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	
	$("#slider6").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 12.5,
    	mouseScrollAction: true,
    	step: "0.5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider7").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 12.5,
    	mouseScrollAction: true,
    	step: "0.5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#slider8").roundSlider({
    	handleShape: "dot",
    	width: "50",
    	radius: 100,
    	value: 12.5,
    	mouseScrollAction: true,
    	step: "0.5",
    	sliderType: "min-range",
    	lineCap: "square",
		editableTooltip: false,
		tooltipFormat: function(args){ return "%"+args.value; }
	});
	
	$("#calculateModal").modal('show');

});

$(document).on('click', ".rivalanalysis", function() {
	
	var infoElement = $(this);
	$(infoElement).prop('disabled',true);
	$(infoElement).html('<i class="fa-solid fa-cog fa-spin"></i> <i class="fa-solid fa-cog fa-spin"></i> <i class="fa-solid fa-cog fa-spin"></i>');
	$(infoElement).addClass("disabled");
	var parentrow 	= $(this).parent().parent();
	var horsecode 	= $(parentrow).attr('horsecode');
	var racecode 	= $(parentrow).attr('racecode');
	var cityname 	= $(parentrow).attr('cityname');
	var dateinfo 	= $(parentrow).attr('dateinfo');
	
	$.ajax({
        	type: "GET",
        	async: true,
        	url: '/rivalstats/',
        	traditional : true,
        	data: {
            	horsecode 	: horsecode,
				racecode 	: racecode,
				cityname	: cityname,
				dateinfo	: dateinfo,
        	},
        	success: function(data) {
				$(infoElement).empty();
				for (var i=0; i<data.rival_stats.length; i++){
					$(infoElement).append('<span class="badge" style="float:left;">'+data.rival_stats[i]+'</span><br>');
				}
			}
			
    	});
	
});


$(document).on('click', ".velocities", function() {
	
	$(this).prop('disabled',true);
	var orderbtn		= $(this).next();
	var tbody 			= $(this).closest("table").find("tbody");
	var loadingrows 	= $(this).closest("table").find("tbody tr.loadingrow");
	var calculations	= $(this).closest("table").find("tbody tr.calculations");
	var finaldegreerows	= $(this).closest("table").find("tbody tr.finaldegree");
	var rivalspans		= $(this).closest("table").find("tbody tr.finaldegree span.rivalanalysis")
	var orderbuttons	= $(this).closest("table").find("thead div button");
	$(loadingrows).show();
	
	
	// Calculate Year Prizes
	$(calculations).each(function (){
		var prizeElement	= $(this).find("b.yearprize");
		var recordElement	= $(this).find("b.nextrecord");
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
				
				if(data.nextrecord == ""){
					$(recordElement).parent().hide();
				}else{
					$(recordElement).html("<span class='badge badge-pill badge-warning' style='font-size:large;'>"+data.nextrecord+" "+data.nextrecordtype+"</span>");
					$(recordElement).addClass("text-info");
				}
				
				var horsehp		= $($(prizeElement).closest("tr").prev().prev().find("span")[3]).text();
				var ruletext	= $(prizeElement).closest("table").parent().parent().prev().find("div").find("span.racerule").text();
				var temp		= $($(prizeElement).closest("table").parent().parent().prev().find("button").children()[2]).text();
				var racetype	= temp.split(",")[0];
				var horsetext	= temp.split(",")[1];
				var raceprizes	= $($(prizeElement).closest("table").parent().parent().prev().children())[0];
				var prize1		= parseFloat($($(raceprizes).children()[0]).text().trim().replace(".",""));
				var detailrow	= $(prizeElement).closest("tr").next();
				var cityname	= $("#citynameinput").val();
				compare_racerule(data.yearprize, horsehp, ruletext, racetype, prize1, detailrow, horsetext, cityname);
					
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
			$(loadingrows).hide();
		});
	});
	
	/*
	// Calculate Final Degree Seconds From Regression Analysis
	$(finaldegreerows).each(function (){
		flags.push($(this));
		var degreeElement 	= $(this).find("b.degreeinfo");
		var horsecode 		= $(this).attr("horsecode");
		var horsename 		= $(this).attr("horsename");
		var courtcode 		= $(this).attr("courtcode");
		var racecode 		= $(this).attr("racecode");
		var cityname 		= $(this).attr("cityname");
		var dateinfo 		= $(this).attr("dateinfo");
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
				horsename	: horsename,
				courtcode 	: courtcode,
				racecode	: racecode,
				cityname	: cityname,
				dateinfo	: dateinfo,
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
				$(degreeElement).parent().parent().show();
				flags.pop();
        	},
			error: function(){	},
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
	*/

}); // END OF VELOCITIES	

function calculate_race_type(text){
	
	if(text.includes("ŞARTLI")){
		var level = text.split(" ")[1];
		if(level.includes("/")){
			level = level.split("/")[0];
		}
		return "S"+level;
	}
	if(text.includes("KV")){
		var level = text.split("-")[1];
		return "KV"+level+"-"
	}
	if(text.includes("Handikap")){
		var temp 	= text.split("/");
		var level 	= temp[0].split(" ")[1];
		
		if(text.includes("H1"))
			htype = "H1";
		
		if(text.includes("H2"))
			htype = "H2";
			
		if(text.includes("H3"))
			htype = "H3";
		
		return "H"+level+"-"+htype
	}
	
}


function calculate_city_type(text){
	
	if(text == "ANKARA" || text == "ISTANBUL")
		return "ANKIST";
	if(text == "ELAZIG" || text == "SANLIURFA" || text == "DIYARBAKIR")
		return "DOGU";
	if(text == "IZMIR" || text == "ADANA" || text == "ANTALYA" || text == "KOCAELI" || text == "BURSA")
		return "BATI";
}	


function calculate_horse_type(text){
	
	if(text == " 2 Yaşlı İngilizler" || text == " 3 Yaşlı Araplar")
		return "-A-";
	else
		return "-B-";
}


function find_other_race(yearprize, prize1, rulemap, horsetype, citytype){
	
	var msg 		= "";
	var targetprize = yearprize + prize1;
	var targetkey	= "";
	
	for (const [index, [key, value]] of Object.entries(Object.entries(rulemap))){
		if( key.includes(citytype) && key.includes(horsetype) && (targetprize > value)){
				targetkey = key;
		}
	}
	
	if(targetkey != ""){
		var racetype 	= targetkey.split("-")[0];
		var raceregion	= targetkey.split("-")[2];
		racetype 		= racetype.replace("S","ŞARTLI ");
		raceregion		= raceregion.replace("BATI","İzmir,Adana,Antalya,Kocaeli ve Bursa");
		raceregion		= raceregion.replace("ANKIST","Ankara ve İstanbul");
		raceregion		= raceregion.replace("DOGU","Diyarbakır,Urfa ve Elazığ");
		msg = raceregion+"'da <span class='badge badge-pill badge-warning'>"+racetype+"</span>";
	}
	
	return msg;
	
}

function compare_racerule(yearprize, horsehp, racerule, racetype, prize1, detailrow, horsetext, cityname){
	
	try{
		var rulemap		= JSON.parse($("#allrules").val());
		var horsetype	= calculate_horse_type(horsetext);
		var citytype	= calculate_city_type(cityname);
		var racetext	= calculate_race_type(racetype);
	}catch{ }
	
	
	if(yearprize != ""){
		var yearprize	= parseFloat(yearprize.replace(".",""));
	}
	
	
		
	msg = find_other_race(yearprize, prize1, rulemap, horsetype, citytype)
	var racehp = rulemap[racetext]
	
	if( parseInt(horsehp) >= racehp ){
		msg += ' ve <span class="badge badge-pill badge-warning" style="font-weight:bold;">'+racetype+'</span>'
	}
	
	if(msg != ""){
		$($(detailrow).children()[0]).prepend('<div style="font-weight:bold; text-align:start;">Kazanırsa '+msg+' koşamaz.</div>');
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
			if(spans.length == 3){  // there is only one agf value
				if($(spans[0]).text().includes("AGF1")){
					var agf1val = $(spans[1]).text().substring(1).trim();
					sorted.push(agf1val);
				}
				if($(spans[1]).text().includes("AGF2")){
					var agf2val = $(spans[2]).text().substring(1).trim();
					sorted.push(agf2val);
				}
			}
			
			if(spans.length == 4){  // there are two agf values
				if($(spans[0]).text().includes("AGF1")){
					var agf1val = $(spans[1]).text().substring(1).trim();
				}
				if($(spans[2]).text().includes("AGF2")){
					var agf2val = $(spans[3]).text().substring(1).trim();
					sorted.push(agf2val);
				}
			}
			
		}
		
		sorted.sort(function(a,b){ return b - a; });
		
		for(var i=0; i<sorted.length; i++){
			for(var j=1; j<allrows.length; j=j+6){
				
				var spans = $($(allrows[j]).find("td")[2]).find("span");
				
				if(spans.length == 3){  // there is only one agf value
					if($(spans[0]).text().includes("AGF1")){
						var agf1val = $(spans[1]).text().substring(1).trim();
					}
					if($(spans[1]).text().includes("AGF2")){
						var agf2val = $(spans[2]).text().substring(1).trim();
					}
				}
			
				if(spans.length == 4){  // there are two agf values
					if($(spans[0]).text().includes("AGF1")){
						var agf1val = $(spans[1]).text().substring(1).trim();
					}
					if($(spans[2]).text().includes("AGF2")){
						var agf2val = $(spans[3]).text().substring(1).trim();
					}
				}
				
				
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

