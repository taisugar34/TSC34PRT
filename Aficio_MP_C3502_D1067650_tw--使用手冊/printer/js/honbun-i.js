// イメージ有無 cookieキー文字列
var imgMode = 'imgmode' ;

//イメージ先読み。各btnXXオブジェクトにはロールオーバー(1)/ロールアウト(0)のイメージを代入
// ヘッダーメニュー
var btnhead1 = new Array();
	btnhead1[0] = new Image();
	btnhead1[0].src = "";
	btnhead1[1]= new Image();
	btnhead1[1].src = "";

var btnhead2 = new Array();
	btnhead2[0] = new Image();
	btnhead2[0].src = "";
	btnhead2[1]= new Image();
	btnhead2[1].src = "";

var btnhead3 = new Array();
	btnhead3[0] = new Image();
	btnhead3[0].src = "";
	btnhead3[1]= new Image();
	btnhead3[1].src = "";

var btnhead4 = new Array();
	btnhead4[0] = new Image();
	btnhead4[0].src = "";
	btnhead4[1]= new Image();
	btnhead4[1].src = "";

var btnhead5 = new Array();
	btnhead5[0] = new Image();
	btnhead5[0].src = "";
	btnhead5[1]= new Image();
	btnhead5[1].src = "";

var btnhead6 = new Array();
	btnhead6[0] = new Image();
	btnhead6[0].src = "";
	btnhead6[1]= new Image();
	btnhead6[1].src = "";

var btnhead7 = new Array();
	btnhead7[0] = new Image();
	btnhead7[0].src = "";
	btnhead7[1]= new Image();
	btnhead7[1].src = "";

var btnhead8 = new Array();
	btnhead8[0] = new Image();
	btnhead8[0].src = "";
	btnhead8[1]= new Image();
	btnhead8[1].src = "";

// 検索バー
var btnsea1 = new Array();	
	btnsea1[0]= new Image();
	btnsea1[0].src = "../../web/gen/zh-tw-search.gif";
	btnsea1[1]= new Image();
	btnsea1[1].src = "../../web/gen/zh-tw-search_r.gif";
	
var btnsea2 = new Array();	
	btnsea2[0]= new Image();
	btnsea2[0].src = "";
	btnsea2[1]= new Image();
	btnsea2[1].src = "";

var btnsea3 = new Array();	
	btnsea3[0]= new Image();
	btnsea3[0].src = "";
	btnsea3[1]= new Image();
	btnsea3[1].src = "";

// 「目次へ」ボタン
var btnbdy1 = new Array();	
	btnbdy1[0]= new Image();
	btnbdy1[0].src = "";
	btnbdy1[1]= new Image();
	btnbdy1[1].src = "";

// フッター
var btnfoot1 = new Array();	
	btnfoot1[0]= new Image();
	btnfoot1[0].src = btnhead1[0].src;
	btnfoot1[1]= new Image();
	btnfoot1[1].src =btnhead1[1].src;

var btnfoot2 = new Array();	
	btnfoot2[0]= new Image();
	btnfoot2[0].src = btnhead2[0].src;
	btnfoot2[1]= new Image();
	btnfoot2[1].src =btnhead2[1].src;
	
var btnfoot3 = new Array();	
	btnfoot3[0]= new Image();
	btnfoot3[0].src = "";
	btnfoot3[1]= new Image();
	btnfoot3[1].src = "";

// 本文中の「このページのトップへ」ボタン
	var totop= new Array();
		totop[0] = new Image();
		totop[0].src = "";
		totop[1]= new Image();
		totop[1].src = "";

// フォルダアイコン
	var btnc = new Array();
		btnc[0] = new Image();
		btnc[0].src = "";
		btnc[1]= new Image();
		btnc[1].src = "";
		btnc[2] = new Image();
		btnc[2].src = "";
		btnc[3]= new Image();
		btnc[3].src = "";

// 大目次の章アイコン
	var chap = new Array();
		chap[0] = new Image();
		chap[0].src = "../../web/gen/i_chap.gif";
		chap[1]= new Image();
		chap[1].src = "../../web/gen/i_chap_r.gif";

// トピックアイコン
var topich2 = new Array();
topich2[0] = new Image();
topich2[0].src = "../../web/gen/i_m2.gif";
topich2[1] = new Image();
topich2[1].src = "../../web/gen/i_m2_r.gif";

var topich3 = new Array();
topich3[0] = new Image();
topich3[0].src = "../../web/gen/i_m3.gif";
topich3[1] = new Image();
topich3[1].src = "../../web/gen/i_m3_r.gif";

// イメージ表示切替

function hideImages( mode ) {
  // mode is 'block' or 'none'.
  if(ua!='lay') {
    var d;
    if(ua=='dom') {
      d = document.getElementsByTagName('p');
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
  SetCookie( imgMode, mode );
}

// ページ初期化
function initialize(){
  initState(false, true);
  change();
}
