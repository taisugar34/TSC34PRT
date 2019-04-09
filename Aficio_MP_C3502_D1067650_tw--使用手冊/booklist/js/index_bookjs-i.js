var btnsea1 = new Array();	
	btnsea1[0]= new Image();
	btnsea1[0].src = "../../web/gen/zh-tw-search.gif";
	btnsea1[1]= new Image();
	btnsea1[1].src = "../../web/gen/zh-tw-search_r.gif";

var btnsea2 = new Array();	
	btnsea2[0]= new Image();
	btnsea2[0].src = "../../web/gen/i_book.gif";
	btnsea2[1]= new Image();
	btnsea2[1].src = "../../web/gen/i_book_r.gif";

var btnsea3 = new Array();	
	btnsea3[0]= new Image();
	btnsea3[0].src = "../../web/gen/i_book.gif";
	btnsea3[1]= new Image();
	btnsea3[1].src = "../../web/gen/i_book_r.gif";

var btnsea4 = new Array();	
	btnsea4[0]= new Image();
	btnsea4[0].src = "../../web/gen/i_book.gif";
	btnsea4[1]= new Image();
	btnsea4[1].src = "../../web/gen/i_book_r.gif";

var btnsea5 = new Array();	
	btnsea5[0]= new Image();
	btnsea5[0].src = "../../web/gen/i_book.gif";
	btnsea5[1]= new Image();
	btnsea5[1].src = "../../web/gen/i_book_r.gif";

var btnsea6 = new Array();	
	btnsea6[0]= new Image();
	btnsea6[0].src = "../../web/gen/i_book.gif";
	btnsea6[1]= new Image();
	btnsea6[1].src = "../../web/gen/i_book_r.gif";

var btnsea7 = new Array();	
	btnsea7[0]= new Image();
	btnsea7[0].src = "../../web/gen/i_book.gif";
	btnsea7[1]= new Image();
	btnsea7[1].src = "../../web/gen/i_book_r.gif";

var btnsea8 = new Array();	
	btnsea8[0]= new Image();
	btnsea8[0].src = "../../web/gen/i_book.gif";
	btnsea8[1]= new Image();
	btnsea8[1].src = "../../web/gen/i_book_r.gif";

var btnsea9 = new Array();	
	btnsea9[0]= new Image();
	btnsea9[0].src = "../../web/gen/i_book.gif";
	btnsea9[1]= new Image();
	btnsea9[1].src = "../../web/gen/i_book_r.gif";

var btnsea10 = new Array();	
	btnsea10[0]= new Image();
	btnsea10[0].src = "../../web/gen/i_book.gif";
	btnsea10[1]= new Image();
	btnsea10[1].src = "../../web/gen/i_book_r.gif";

var btnsea11 = new Array();	
	btnsea11[0]= new Image();
	btnsea11[0].src = "../../web/gen/i_book.gif";
	btnsea11[1]= new Image();
	btnsea11[1].src = "../../web/gen/i_book_r.gif";

function initState () {

	SetCookie('where', 'index.htm');
	SetCookie('imgmode', 'block');

//	if (ua == 'dom') {
//			document.getElementById('areacontenth').style.position = 'static';
//	}
        // 2007.6.13 for V1.4
        if (document.search.seek) {
	    document.search.seek.focus();
        }
}

window.onload=initState;
if (navigator.appName == "Netscape" &&
    parseInt(navigator.appVersion) <= 4) {
	window.onresize=function(){location.reload();};
}

