// イメージ先読み。各btnXXオブジェクトにはロールオーバー(1)/ロールアウト(0)のイメージを代入
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

// 目次の数字ボタン
var num_n = new Array();
var num_r = new Array();

	num_n[1]= new Image();
	num_n[1].src = "01";
	num_r[1]= new Image();
	num_r[1].src = "01";

	num_n[2]= new Image();
	num_n[2].src = "02";
	num_r[2]= new Image();
	num_r[2].src = "02";

	num_n[3]= new Image();
	num_n[3].src = "03";
	num_r[3]= new Image();
	num_r[3].src = "03";

	num_n[4]= new Image();
	num_n[4].src = "04";
	num_r[4]= new Image();
	num_r[4].src = "04";

	num_n[5]= new Image();
	num_n[5].src = "05";
	num_r[5]= new Image();
	num_r[5].src = "05";

	num_n[6]= new Image();
	num_n[6].src = "06";
	num_r[6]= new Image();
	num_r[6].src = "06";

	num_n[7]= new Image();
	num_n[7].src = "07";
	num_r[7]= new Image();
	num_r[7].src = "07";

	num_n[8]= new Image();
	num_n[8].src = "08";
	num_r[8]= new Image();
	num_r[8].src = "08";

	num_n[9]= new Image();
	num_n[9].src = "09";
	num_r[9]= new Image();
	num_r[9].src = "09";

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

var totop = new Array();
totop[0] = new Image();
totop[0].src = "../../web/gen/i_top_t.gif";
totop[1] = new Image();
totop[1].src = "../../web/gen/i_top_t_r.gif";

function initialize(){
  initState(true, true);
}

window.onload=initialize;

