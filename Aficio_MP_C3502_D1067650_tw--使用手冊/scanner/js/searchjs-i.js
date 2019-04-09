var btnsea1 = new Array();	
	btnsea1[0]= new Image();
	btnsea1[0].src = "../../web/gen/zh-tw-search.gif";
	btnsea1[1]= new Image();
	btnsea1[1].src = "../../web/gen/zh-tw-search_r.gif";

var totop = new Array();
	totop[0] = new Image();
	totop[0].src = "../../web/gen/i_top_t.gif";
	totop[1] = new Image();
	totop[1].src = "../../web/gen/i_top_t_r.gif";

function initState () {
   return;
}

window.onload=initState;
if (navigator.appName == "Netscape" &&
    parseInt(navigator.appVersion) <= 4) {
    window.onresize=function(){location.reload();};
}

