// Dom判別
var ua=0;
if(document.layers)
	ua='lay';
else if(document.getElementById)
	ua='dom';
else if(document.all)
	ua='msdom';
else{alert('This page is not suppoted by the browser')}
//alert(ua)

// ブラウザの判別
var ap = navigator.appName;
var uagent = navigator.userAgent;
var spstr=uagent.split(' ');
if(spstr[6]=='Opera'){
	ap='op'
}
else if(ap=='Netscape'){
	ap = 'nn';
}
else if(ap=='Microsoft Internet Explorer'){
	ap = 'ie';
}
else{
	ap='at';
}

var isMSIE4 = ( (uagent.toLowerCase()).indexOf('msie 4') != -1 ) ;

if(ua=='lay'){
	document.write('<style type="text/css">.valign-hdr{vertical-align:top;}<');
	document.write('/style>');
}

	function isNull( str ){
		if( str == null )	return true ;
		if( str == '' )	return true ;
		if( typeof( str ) == "undefined" )	return true ;
		return false ;
	}

	function SetCookie (name, value) {
		document.cookie = (name + '=' + escape(value) + "; path=/" );
	}

	function SetCookie2(name, value) {
		var nextyear = new Date();
		nextyear.setFullYear(nextyear.getFullYear() + 1);
		document.cookie = (name + '=' + escape(value) + "; path=/" +
				   "; expires=" + nextyear.toGMTString() );
	}

	function GetCookie (name) {
		var pos = document.cookie.indexOf(name + '=');
		if (pos != -1) {
			var start = pos + name.length + 1;
			var end = document.cookie.indexOf(';', start);
			if (end == -1) end = document.cookie.length;
			var value = document.cookie.substring(start, end);
			return unescape(value);
		}
	}

// search

	var path = /search_results.htm$/;
	var path2 = /$/;

	function getpathname () {
		// location.pathname for ie4 has bug.
		var iev;
		if (navigator.appName == "Microsoft Internet Explorer") {
			var apv   = navigator.appVersion;
			var iel   = "MSIE ";
			var iepos = apv.indexOf(iel);
			iev   = parseInt(apv.substring(iepos+iel.length));
		}
		if (iev != null && iev == 4) {
			var pathname = location.href;
			var p = pathname.indexOf('#');
			if (p != null && p != -1) {
				pathname = pathname.substring(0, p);
			}
			p = pathname.indexOf('?');
			if (p != null && p != -1) {
				pathname = pathname.substring(0, p);
			}
			return pathname;
		} else {
			return location.pathname;
		}
	}
		
	function SearchWord_ix(word) {
		var b = getpathname();
		var bookname = b.split(/[\\\/]/).slice(-3)[0];	
		if (b.match(path) == null) {
			SetCookie('backto', b);
		}
		location.href = "search_results.htm" + '?word=' + escape(word) + '&bookname=' + escape(bookname);
		}

	function SearchWord_manual() {
		var seek = document.getElementById("seek").value;
		var b = getpathname();
		var bookname = "";	
		if (b.match(path) == null /*&& b.match(path2) == null*/) {
			SetCookie('backto', b);
		}
		location.href = "search_results.htm" + '?seek=' + escape(seek) + '&bookname=' + escape(bookname);
	    }

	function SearchWord() {
		var seek = document.getElementById("seek").value;
		var b = getpathname();
		var bookname = b.split(/[\\\/]/).slice(-3)[0];	
		if (b.match(path) == null /*&& b.match(path2) == null*/) {
			SetCookie('backto', b);
		}
		location.href = "search_results.htm" + '?seek=' + escape(seek) + '&bookname=' + escape(bookname);
	    }
	    
//	function SearchWord(word) {
//		SetCookie('search', word);
//		var b = getpathname();
//		if (b.match(path) == null && b.match(path2) == null) {
//			SetCookie('backto', b);
//		}
//		location.href = '';
//      }
//
//	function SetWord_i () {
//		var value;
//		if (ua != 'lay') {
//			value = document.search.seek.value;
//		} else {
//			value = document.layers[ divname ].document.search.seek.value;
//		}
//		SetCookie('search', value);
//		var b = getpathname();
//		if (b.match(path) == null && b.match(path2) == null) {
//			SetCookie('backto', b);
//		}
//		return true;
//	}
//
//	function SetWord2_i () {
//		SetWord_i();
//		if (ua != 'lay') {
//			document.search.submit();
//		} else {
//			document.layers[ divname ].document.search.submit();
//		}
//	}

//	function SetWord_a () {
//		value = document.search.seek.value;
//		SetCookie('search', value);
//		var b = getpathname();
//		if (b.match(path) == null && b.match(path2) == null) {
//			SetCookie('backto', b);
//		}
//		return true;
//	}

//	function SetWord2_a (divname) {
//		SetWord_a();
//		document.search.submit();
//	}

	function back_to_index () {
		var s = GetCookie('where');
		back_to_index2(s,true,false);
	}

	function back_to_index_or_text () {
		var s = GetCookie('backto');
		back_to_index2(s,false,false );
	}

	function index_other_window () {
		var s = GetCookie('where');
		back_to_index2(s,true,true );
	}

	function back_to_index2 (s, flag, winFlag) {
		var p;
		if ( !isNull( s ) ) {
			if (s.indexOf("\\") >= 0) {
				p = s.lastIndexOf("\\");
			}
			else {
				p = s.lastIndexOf("/");
			}

			if (p != -1 && p != null) {
				s = s.substring(p+1, s.length);
			}
			if( flag ){
				var cnts , i ;
				var cntsFlag = false ;
				for( i = 1 ; i <= 0 ; i ++ ){
					cnts = 'contents_' ;
					if( i < 10 )	cnts += '0' ;
					cnts += ( i + '.htm' ) ;
					if( s == cnts ){
						cntsFlag = true ;
						break ;
					}
				}
				if( !cntsFlag ) s = 'index.htm' ;
			}
			if( winFlag ){
				window.open( s );
			}else{
				location.href = s ;
			}
		} else {
			if( winFlag ){
				window.open( 'index.htm' );
			}else{
				location.href = 'index.htm';
			}
		}
	}

//
//	function go_acc_or_int (dir) {
//		var w = getpathname();
//		var p;
//		if (w.indexOf("\\") >= 0) {
//			p = w.lastIndexOf("\\");
//		}
//		else {
//			p = w.lastIndexOf("/");
//		}
//		if (p != -1 && p != null) {
//			location.href = dir + w.substring(p+1, w.length);
//		} else {
//			location.href = dir;
//		}
//	}

	function getwhere () {
	        var w = getpathname();
		var p;
		if (w.indexOf("\\") >= 0) {
		    p = w.lastIndexOf("\\");
		} else {
		    p = w.lastIndexOf("/");
		}
//		if (p != -1 && p != null) {
//          	    w = w.substring(0, p+1) + filename; // filename is defined in HTML.
//		} else {
//		    w = filename;
//		}
		return w;
	}

	function go_older_version (toindex) {

	}

	function goto_preference (mode,prefhtml,fromix) {
		var color = GetCookie('color');
		if ( !isNull( color ) ) {
			SetCookie('color_orig', color);
		}
//		if (fromix) {SetCookie('from_ix', true);}
		if (mode == 'acc') {
			SetCookie('backto',getpathname());
			location.href = prefhtml;
		} else if (mode == 'int') {
			// preference
			window.open(prefhtml);
			return;
		}
	}

	function read_css() {
		if (!document.layers) {
			var color, has;
			color = GetCookie('color');
			if (color) {
				has = hasStyleSheet(color);
			}
			if ( isNull( color ) || !has) {
				var pref = getPreferredStyleSheet();
				if (pref) {
					color = pref;
				}
				else {
					color = 'default';
				}
			}
			setActiveStyleSheet(color);
		}
		return;
	}

function setActiveStyleSheet(color) {
	var i, a;
	if (document.getElementById) {
		for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
			if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
				a.disabled = true;
				if (a.getAttribute("title") == color) {
					a.disabled = false;
				}
			}
		}
	}
	else if (document.all) {
		for (i = 0; i < document.styleSheets.length; i++) {
			a = document.styleSheets[i];
			if (a.title) {
				a.disabled = true;
				if (a.title == color) {
					a.disabled = false;
				}
			}
		}
	}
}

function getActiveStyleSheet() {
	var i, a;
	if (document.getElementById) {
		for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
			if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) {
				return a.getAttribute("title");
			}
		}
	}
	else if (document.all) {
		for (i = 0; i < document.styleSheets.length; i++) {
			a = document.styleSheets[i];
			if (a.title && !a.disabled) {
				return a.title;
			}
		}
	}
	return null;
}

function getPreferredStyleSheet() {
	var i, a;
	if (document.getElementById) {
		for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
			if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) {
				return a.getAttribute("title");
			}
		}
	}
	else if (document.all) {
		for (i = 0; i < document.styleSheets.length; i++) {
			a = document.styleSheets[i];
			if (a.title == 'default') {
				return a.title;
			}
		}
	}
	return null;
}

function hasStyleSheet(color) {
	var i, a;
	if (document.getElementById) {
		for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
			if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") == color) {
				return true;
			}
		}
	}
	else if (document.all) {
		for (i = 0; i < document.styleSheets.length; i++) {
			a = document.styleSheets[i];
			if (a.title == color) {
				return true;
			}
		}
	}
	return false;
}

var type='type'
var nam='nam'
var num='num'
var current='current'
var child='child'

//  ロールオーバーのスクリプト
function Mover(type,nam,num){
	// NN4x
	if(ua=='lay'){
		if(type == 'btn'){
			document.layers['areacontentm'].document.images[type + nam+num].src = eval(type + nam +num+ '[1].src');
		}
		if(type == 'totop'){
			document.layers['areacontentm'].document.images[type + nam].src = totop[1].src;
		}
		if(type == 'num'){
			document.layers['areacontentm'].document.images[type + num].src = eval(type +'_r[num].src');
		}
		if(type == 'chap'){
			document.layers['areacontentm'].document.images[type + nam].src = chap[1].src ;
		}
	}
	// NN4x以外
	else{
		if(type == 'btn'){
			document.images[type + nam+num].src = eval(type + nam +num+ '[1].src');
		}
		if(type == 'totop'){
			document.images[type + nam].src = totop[1].src;
		}
		if(type == 'num'){
			document.images[type + num].src = eval(type +'_r[num].src');
		}
		if(type == 'chap'){
			document.images[type + nam].src = chap[1].src ;
		}
		if(type == 'topich2'){
			document.images[type + nam].src = topich2[1].src ;
		}
		if(type == 'topich3'){
			document.images[type + nam].src = topich3[1].src ;
		}
	}
}
//  ロールアウトのスクリプト
function Mout(type,nam,num){
	// NN4x
	if(ua=='lay'){
		if(type == 'btn'){
			document.layers['areacontentm'].document.images[type + nam+num].src = eval(type + nam +num+ '[0].src');
		}
		if(type == 'totop'){
			document.layers['areacontentm'].document.images[type + nam].src = totop[0].src;
		}
		if(type == 'num'){
			document.layers['areacontentm'].document.images[type + num].src = eval(type +'_n[num].src');
		}
		if(type == 'chap'){
			document.layers['areacontentm'].document.images[type + nam].src = chap[0].src ;
		}
	}
	// NN4x以外
	else{
		if(type == 'btn'){
			document.images[type + nam+num].src = eval(type + nam +num+ '[0].src');
		}
		if(type == 'totop'){
			document.images[type + nam].src = totop[0].src;
		}
		if(type == 'num'){
			document.images[type + num].src = eval(type +'_n[num].src');
		}
		if(type == 'chap'){
			document.images[type + nam].src = chap[0].src ;
		}
		if(type == 'topich2'){
			document.images[type + nam].src = topich2[0].src ;
		}
		if(type == 'topich3'){
			document.images[type + nam].src = topich3[0].src ;
		}
	}
}

if (!window.Node) {
    var Node = {
	ELEMENT_NODE : 1,
	ATTRIBUTE_NODE : 2,
	TEXT_NODE : 3,
	CDATA_SECTION_NODE : 4,
	ENTITY_REFERENCE_NODE : 5,
	ENTITY_NODE : 6,
	PROCESSING_INSTRUCTIONS_NODE : 7,
	COMMENT_NODE : 8,
	DOCUMENT_NODE : 9,
	DOCUMENT_TYPE_NODE : 10,
	DOCUMENT_FRAGMENT_NODE : 11,
	NOTATION_NODE : 12
    }						
}						
						
function get_key_from_url() {						
	var qsParm = new Array();					
	var query = window.location.search.substring(1);
	var parms = query.split('&');					
	for (var i=0; i<parms.length; i++) {					
		var pos = parms[i].indexOf('=')
			if (pos > 0) {
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos+1);
			qsParm[key] = unescape(val);			
		}				
	}					
	return qsParm;
}						
						
function get_keywords( query ) {						
//    query = query.replace( /([\/\\\.\*\+\?\|\(\)\[\]\{\}\$\^])/g, "\\$1" );
    query = query.replace( /([^A-Za-z0-9])/g, "\\$1" );						
    query = query.replace( /( +|　+)/, ' ' );						
    query = query.replace( /( |　)$/, '' );						
    var keywords = query.split(/ |　/);						
    return keywords;						
}						
						
						
function change() {
	var key = get_key_from_url();
	var w = key['seek'] == undefined ? key['word'] : key['seek'];
	
	if ( w == null || w == '' || w == undefined) {
    return;
    }
	
	w = w.replace(/　/g," ");
	w = w.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");															
    															
    var d = document.getElementById("replace");															
															
    var a = new Array();																				
	traverseDom(d, a);						
    var n;						
    while(n = a.pop()){						
	rep(n, w);					
    }						
						
}

function traverseDom (root, a) {
    var c = root, n = null;
    var it = 0;
    do {
	n = c.firstChild;

	if (n == null || (c.nodeType == Node.ELEMENT_NODE && c.className == "relation") || (c.id != null && c.id.match("^bookname"))) {
	    // visit c
	    if (c.nodeType == Node.TEXT_NODE) {
		a.push(c);
	    }																	
	    // done visit c																	
	    n = c.nextSibling;																	
	}																	
						
	if (n == null) {					
	    var tmp = c;					
	    do {					
		n = tmp.parentNode;				
		if (n == root)				
		    break;				
						
		// visit n				
		if (n.nodeType == Node.TEXT_NODE) {				
		    a.push(n)				
		}				
		// done visit n				
		tmp = n;				
		n = n.nextSibling;				
	    } while (n == null)					
	}					
	c = n;					
    } while (c != root);						
    return;						
}						
						
function rep (n, w) {

    var b = w.split(' ');
    for (var i=0; i < b.length; i++) {
      b[i] = quotemeta(b[i])
    }
    
    var ww = b.join('|');
    
    var a = n.nodeValue.split(new RegExp("(" + ww + ")","i"));						
						
    var f = document.createDocumentFragment();						
						
    for(var i = 0; i < a.length; i++) {						
	var e;					
	if (a[i].match(new RegExp(ww,"i"))) {					
	    e = document.createElement('span');					
	    					
	    //use browser sniffing to determine if IE or Opera (ugly, but required)					
	    var isOpera, isIE = false;					
	    if(typeof(window.opera) != 'undefined') isOpera = true;					
	    if(!isOpera && navigator.userAgent.indexOf('MSIE') != -1) isIE = true;					
	    					
	    var styleData; 
	    if (!findParent(n, 'div', 'important')) {
	      styleData = "background-color: #B4EBFA;";
	    } else {
	      styleData = "color: black; background-color: #B4EBFA;";
	    }
	    					
	    if (!isIE) e.setAttribute('style', styleData);					
	    else e.style.setAttribute('cssText', styleData);					
	    					
	    e.appendChild(document.createTextNode(a[i]));					
	} else {					
	    e = document.createTextNode(a[i]);					
	}					
	f.appendChild(e);					
    }						
    n.parentNode.replaceChild(f, n);						
}

function findParent(node, tag, classname) {
	 var n = node;
	 while (n != null) {
	       var p = n.parentNode;
	       if (p != null && p.nodeType == Node.ELEMENT_NODE &&
	       	   p.nodeName.match(new RegExp(tag, "i")) && p.className == classname) {
		   	      return true;
	       }
	       n = p;
	 }
	 return false;
}
						
function escapeHTML(w) {						
	w = w.replace(/&/g, "&amp;");					
	w = w.replace(/"/g, "&quot;");					
	w = w.replace(/</g, "&lt;");					
	w = w.replace(/>/g, "&gt;");					
	return w;					
}						
						
function unescapeHTML(w) {						
	w = w.replace(/&gt;/g, ">");					
	w = w.replace(/&lt;/g, "<");					
	w = w.replace(/&quot;/g, "\"");					
	w = w.replace(/&amp;/g, "&");					
	return w;					
}						
						
function quotemeta(w) {						
	w = w.replace(/\W/g, "\\$&");					
	return w;					
}						
