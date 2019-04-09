		// DOM判別
		 ua=0;
		if(document.layers)
		ua='lay';
		else if(document.getElementById)
		ua='dom';
		else if(document.all)
		ua='msdom';
		else{alert('This page is not suppoted by the browser')}
		// alert(ua);

		// ブラウザの判別
		ap = navigator.appName;
		var uagent = navigator.userAgent
		spstr=uagent.split(' ')
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
		// alert(ap);
		
		// イメージ先読み。各btnXXオブジェクトにはロールオーバー(1)/ロールアウト(0)のイメージを代入
// ヘッダーメニュー

// 別画面中の「OK」
var btnbdy3 = new Array();	
	btnbdy3[0]= new Image();
	btnbdy3[0].src = "../../web/gen/zh-tw-ok.gif";
	btnbdy3[1]= new Image();
	btnbdy3[1].src = "../../web/gen/zh-tw-ok_r.gif";

// 別画面中の「キャンセル」
var btnbdy4 = new Array();	
	btnbdy4[0]= new Image();
	btnbdy4[0].src = "../../web/gen/zh-tw-cancel.gif";
	btnbdy4[1]= new Image();
	btnbdy4[1].src = "../../web/gen/zh-tw-cancel_r.gif";

// フッター
var btnfoot3 = new Array();	
	btnfoot3[0]= new Image();
	btnfoot3[0].src = "";
	btnfoot3[1]= new Image();
	btnfoot3[1].src = "";
	
	var type='type'
	var nam='nam'
	var num='num'
	var current='current'
	var child='child'

var ok = 0;

function color_change(intacc) {
	var d_col =document.pref_form.color.value;
	SetCookie2('color', d_col);
	setActiveStyleSheet(d_col);
	reset_value();
	if (intacc && window.opener != null) {
		window.opener.location.reload(true);
	}
}

function pref_ok(){
	ok = 1;
	var d_col =document.pref_form.color.value;
	SetCookie2('color', d_col);
	setActiveStyleSheet(d_col);
	reset_value();
}

function pref_cancel(intacc){
	if (intacc) {
		window.close();
	} else {
		var color_orig = GetCookie('color_orig');
		if ( isNull( color_orig ) ) {
			color_orig = getPreferredStyleSheet();
		}
		SetCookie2('color', color_orig);
		setActiveStyleSheet(color_orig);
		reset_value();
		back_to_index2(GetCookie('backto'),false,false);
	}
}

// function windowClose( intacc ){
// 	if (intacc) {
// 		if( window.opener != null ){
// 			window.opener.location.reload(true);
// 			window.close();
// 		} else {
// 			self.location.reload(true);
// 		}
// 	}else{
// 		history.back();
// 	}
// }

function reset_value () {
	var color = GetCookie('color');
	if ( !isNull( color ) ) {
		for (var i = 0; i < document.pref_form.color.options.length; i++) {
			if (document.pref_form.color.options[i].value == color) {
				document.pref_form.color.options[i].selected = true;
				break;
			}
		}
	}
}

function go_url (intacc) {
	var d = document.forms[0].index;
	if( isNull( d ) )	return ;
	if ( !isNull( d.length ) ) {
		for (var i = 0; i < d.length; i++) {
			if (d[i].checked) {
				SetCookie('where',d[i].value);
				if(!intacc)	window.location.href = d[i].value;
				return ;
			}
		}
	} else {
		if (d.checked) {
			SetCookie('where',d.value);
			if( !intacc)	window.location.href = d.value;
		}
	}
}

function set_value () {
	var s = GetCookie('where');
	var d = document.forms[0].index;
	if( !isNull( d ) ){
		if ( !isNull( s ) ) {
			if ( !isNull( d.length ) ) {
				for (var i = 0; i < d.length; i++) {
					var p = s.indexOf(d[i].value);
					if (p != -1 && p != null && !isNaN(parseInt(p)) &&
					    p + d[i].value.length == s.length) {
						d[i].checked = true;
						return ;
					}
				}
				d[0].checked = true;
				SetCookie('where',null);
			} else {
				var p = s.indexOf(d.value);
				if (p != -1 && p != null && !isNaN(parseInt(p)) &&
				    p + d.value.length == s.length) {
					d.checked = true;
				};
			}
		}else{
			if ( !isNull( d.length ) ) {
				d[0].checked = true;
			}else{
				d.checked = true;
			}
		}
	}
}

function set_value_imgMode() {
	var s = GetCookie('imgmode');
	var d = document.forms[0].disp_on;
	if ( !isNull( d ) ) {
		d[0].checked = ( isNull( s ) || s != "none" ) ;
		d[1].checked = !d[0].checked ;
	}
}

function changeImgMode(){
	var d = document.forms[0].disp_on;
	if( !isNull( d ) ){
		hideImages( d[1].checked ? 'none' : 'block' );
	}
}

function initialize(){
  hideImages( GetCookie( 'imgmode' ) == 'none' ? 'none' : 'block' );
}

// イメージ表示切替
function hideImages( mode ) {
  // mode is 'block' or 'none'.
  if(ua!='lay') {
    var d;
    if(ua=='dom') {
      d = document.getElementsByTagName('img');
      for(var i = 0; i < d.length; i++) {
        if(d[i].id.match(/^delete/)) {
          d[i].style.display=mode;
        }
      }
      d = document.getElementsByTagName('object');
      for(var i = 0; i < d.length; i++) {
        if(d[i].id.match(/^delete/)) {
          d[i].style.display=mode;
        }
      }
    } else if(ua=='msdom') {
      d = document.all;
      for(var i = 0; i < d.length; i++) {
        if(d[i].id.match(/^delete/)) {
          d[i].style.display=mode;
        }
      }
    }
  }
  SetCookie( 'imgmode', mode );
}

window.onload = initState;
function initState () {

	initialize();
	reset_value();
	set_value();
	set_value_imgMode();
}

window.onunload = finalState;
function finalState () {
	if (ok != 1) {
		var color_orig = GetCookie('color_orig');
		if ( isNull( color_orig ) ) {
			color_orig = getPreferredStyleSheet();
		}
		SetCookie2('color', color_orig);
		setActiveStyleSheet(color_orig);
		reset_value();
	}
	// for IE6 Bug.
	var parWin = window.opener ;
	if ( !isNull( parWin ) ) {
		if( !parWin.closed ){
			var imgmode = GetCookie('imgmode');
			var w = GetCookie('where');
			if( isNull( w ) )	w = "index.htm" ;
			if (navigator.appName == "Microsoft Internet Explorer") {
				var apv = navigator.appVersion;
				if (parseInt(apv.substring(apv.indexOf("MSIE ")+"MSIE ".length)) >= 5) {
					if (document.indexFlag == 1 && ok == 1) {
						// do not separate following code.
						parWin.location.href = w;
						parWin.where = w;
						parWin.imgmode = imgmode;
					} else {
						// do not separate following code.
						parWin.location.reload(true);
						parWin.where = w;
						parWin.imgmode = imgmode;
					}
					return;
				}
			}

			// non-IE6.
			if (document.indexFlag == 1 && ok == 1) {
				parWin.location.href = w ;
			} else {
				parWin.location.reload(true);
			}
		}
	}
}

function prefIndex( intacc , cont ){
	pref_ok();

//	var ix = GetCookie('from_ix');
//	if( ix ){
//		SetCookie('where', "ix.htm");
//		SetCookie('from_ix', false);
//		if( intacc ) {
//			window.close();
//		} else {
//			location.href = "ix.htm";
//		}
//		return;
//	}

	if( cont )	go_url( intacc );
	if( intacc ){
		window.close();
	}else{
		if( !cont )	location.href = "index.htm" ;
	}
}

function prefBody( intacc ){
	pref_ok();
//	windowClose( intacc );
	if (intacc) {
		window.close();
	} else {
		back_to_index2(GetCookie('backto'),false,false);
	}

}
