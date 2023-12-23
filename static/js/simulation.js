requestPool = [];

function add_keyframes(rows){
	
	$(rows).each(function(){
	
	var horsedegree		= $(this).attr("horsedegree");
	var finalposition	= $(this).attr("finalposition");
	var horsecode 		= $(this).attr("horsecode");
	const keyframesname = `moveRight_${horsecode}`;
				$(this).css({"position":"relative", "animation":`${keyframesname} 6s ease-in-out forwards`});
				//$(this).find("td").css({"position":"relative"});
	
	const keyframesstyle = `@keyframes ${keyframesname} {
        0% {	left: 0;	}
        100% {  left: ${finalposition}%;  }
    }`;

    $('<style>').attr('type', 'text/css').text(keyframesstyle).appendTo('head');
	
	});
	
}

function add_key_frames(horses){

	$(horses).each(function(){
		
	var horsecode 		= $(this).attr("horsecode");
	var horsedegree		= $(this).attr("horsedegree");
	var finalposition	= $(this).attr("finalposition");
	
	const keyframesname = `move_right_${horsecode}`;
				$(this).css({"animation":`${keyframesname} 6s linear forwards`});
	
	const keyframesstyle = `@keyframes ${keyframesname} {
        from {	transform: translateX(0%);	}
    	to {	transform: translateX(calc(${finalposition}vw - 100%));	}
    }`;

    $('<style>').attr('type', 'text/css').text(keyframesstyle).appendTo('head');

	});
	
}

function terminate_running_requests(){
	// kill all running requests
	for(var i=0; i<requestPool.length; i++){
		var request = requestPool[i];
		var indexToRemove = requestPool.indexOf(request);
		requestPool.splice(indexToRemove, 1);
		request.abort();
	}
}

$(window).on('load', function(){
	$('.collapse').on('show.bs.collapse', function () {
  		terminate_running_requests();

		var racelist	= {}
		var horses 		= $(this).find(".horseitem");
		var columns		= $(this).find(".horseitem").parent();
		
		$(this).find(".horseitem").each(function(){ 

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
		
		$(this).remove();
		
		var ajaxCall = $.ajax({
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
				
				racelist[horsecode] = data.degree_predict
				
				for(var i=0; i<horses.length; i++){
					if( startno == $(horses[i]).attr('startno') ){
						$(horses[startno - 1]).attr('horsedegree', data.degree_predict);
						$(horses[startno - 1]).attr('finalposition', 90 - startno*2);
						$(columns[startno - 1]).append(horses[i]).hide().show(2000);
					}
				}
				
				if(horses.length == Object.keys(racelist).length){
					console.log("all calculated");
					add_key_frames(horses);
				}else{
					console.log("positioning to starting box...")
				}
				
        	}
    	});

		requestPool.push(ajaxCall);	

		});
		
	});
	
});

$(document).ready(function(){
	
	$(".table tbody").each(function(){
		sortmytable(this, "number");
	});
	
}); // document ready end

	

let flags 		= [];
let detailflags = [];


$(document).on('click', ".raceresult", function() {
	var p_url 	= $(this).attr("photourl");
	var v_url 	= $(this).attr("videourl");
	var divs 	= $(this).parent().find("div");
	$(divs).remove();
	
	if(p_url != undefined && v_url == undefined){
		$(this).parent().append('<div><img style="max-width: 100%; margin-top:1rem;" src='+p_url+'></div>');
	}
	
	if(p_url == undefined && v_url != undefined){
		$(this).parent().append('<div class="section d-flex justify-content-center embed-responsive embed-responsive-16by9" style="margin-top:1rem;">'+
  							'<video class="embed-responsive-item" autoplay playsinside controls><source src='+v_url+' type="video/mp4"></video></div>');
	}
	
});




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
		msg = raceregion+"'da <span class='badge badge-pill badge-warning' style='font-size:large'>"+racetype+"</span>";
	}
	
	return msg;
	
}

function compare_racerule(yearprize, horsehp, racetype, prize1, detailrow, horsetext, cityname){
	
	try{
		var rulemap		= JSON.parse($("#allrules").val());
		var horsetype	= calculate_horse_type(horsetext);
		var citytype	= calculate_city_type(cityname);
		var racetext	= calculate_race_type(racetype);
	}catch{ }
	
	
	if(yearprize != ""){
		var yearprize	= parseFloat(yearprize.replaceAll(".",""));
	}
	
	
		
	msg = find_other_race(yearprize, prize1, rulemap, horsetype, citytype)
	var racehp = rulemap[racetext]
	
	if( parseInt(horsehp) >= racehp ){
		msg += ' ve <span class="badge badge-pill badge-warning" style="font-weight:bold; font-size:large;">'+racetype+'</span>'
	}
	
	if(msg != ""){
		$(detailrow).append('<br><span style="font-weight:bold; text-align:start; margin-left:1%;">Kazanırsa '+msg+' koşamaz.</span>');
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
    		else if (a === '' || a == 0) {
        		return 1;
    		}
    		else if (b === '' || b == 0) {
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
		
		sorted.sort(function(a,b){
			if(a.includes("-")){
				return 1;
			}
			else if(b.includes("-")){
				return -1;
			}
			else{
				return a - b;
			} 
		});
		
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



