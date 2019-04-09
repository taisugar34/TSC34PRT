//慡懱曄悢丗儁乕僕儞僌偡傞懳徾
var paging = new showPages("paging");

/**
 * 専嶕夋柺偺儊僀儞娭悢
 */
function searchBooks()
{
	try {
		var searchWords = getKeyWords();
		var searchBookName = get_key_from_url()["bookname"];
		var searchRange = get_key_from_url()["fromSeachResultPage"];
		
		// 専嶕儚乕僪曄悢偺庢摼
		var w = window.location.search.substring(0,5);
		
		//専嶕儚乕僪偲専嶕懳徾暘嶜傪婛偵昞帵偡傞丅
		if (w == "?word")
		{
			var wordDisplay = get_key_from_url()["word"];
			if (wordDisplay == null || typeof(wordDisplay) == "undefined") 
			{
				wordDisplay = "";
			}
			document.getElementById("seek").value = wordDisplay;
		}
		else
		{
			var seekDisplay = get_key_from_url()["seek"];
			if (seekDisplay == null || typeof(seekDisplay) == "undefined") 
			{
				seekDisplay = "";
			}
			document.getElementById("seek").value = seekDisplay;
		}
		//儅僯儏傾儖堦棗偁傞応崌丄暘嶜僾儖僟僂儞傪昞帵偡傞丅
		
		displayBooks();
		for (i = 0; i < document.getElementById("selectbook").options.length; i++)
		{
			if ((document.getElementById("selectbook").options[i].value == searchBookName) && (searchRange == 1))
			{
				document.getElementById("selectbook").options[i].selected = "selected";
				break;
			}
		}
		
		//専嶕儚乕僪傪惓婯壔偡傞丅
		var regSearchWords = new Array();
		var noRegSearchWords = new Array();
		for (y = 0; y < searchWords.length; y++)
		{
			
			var tmp = searchWords[y].toLowerCase();
			tmp =  removeSpace(tmp);
			// 婰崋偺張棟
			tmp = dealOtherLanguageMark(tmp);
			
			if (tmp.length > 0) 
			{
				regSearchWords[regSearchWords.length] = tmp;
				noRegSearchWords[noRegSearchWords.length] = searchWords[y];
			}
		}
		//専嶕儚乕僪偑4儚乕僪埲忋丄嬻敀丄傑偨偼僗儁乕僗偺傒偺応崌丄僄儔乕傪昞帵偡傞丅
		if (regSearchWords.length >= 4 || regSearchWords.length == 0)
		{
			document.getElementById("errorMessage").style.display = "block";
			var innerHtml = '';
			if (regSearchWords.length >= 4)
			{
				var messages = "關鍵字過多。\n請以最多三個關鍵字來搜尋。";
				var messArray = messages.split("\n");
				for (i = 0; i < messArray.length; i++)
				{
					innerHtml += '<p>' + escapeHTML(messArray[i]) + '</p>';
				}
			}
			else  if (regSearchWords.length == 0 && document.getElementById("seek").value.length != 0) 
			{
				var messages = "輸入搜尋關鍵字。";
				var messArray = messages.split("\n");
				for (i = 0; i < messArray.length; i++)
				{
					innerHtml += '<p>' + escapeHTML(messArray[i]) + '</p>';
				}
				
			}
			else if (regSearchWords.length == 0 && document.getElementById("seek").value.length == 0) 
			{
				var messages = "輸入搜尋關鍵字。";
				var messArray = messages.split("\n");
				for (i = 0; i < messArray.length; i++)
				{
					innerHtml += '<p>' + escapeHTML(messArray[i]) + '</p>';
				}
			}
			document.getElementById("errorMessage").innerHTML = innerHtml;
			document.getElementById("searchResultText").style.visibility = "hidden";
			return;
		}
		//娭楢岅丒椶媊岅偺昞帵(専嶕儚乕僪偑1偮偺応崌偺傒昞帵偡傞)
		//娭楢岅丒椶媊岅偺僉乕偼惓婯壔偝傟偰偄傞丅
		if (regSearchWords.length ==1 && regSearchWords[0].length != 0) 
		{
			// 専嶕夋柺偐傜専嶕偡傞応崌
			if (searchRange == 1)
			{
				relatedAndSynonym(regSearchWords[0], searchBookName, searchRange, noRegSearchWords[0]);
			} 
			// 専嶕夋柺埲奜偺応崌偼慡暘嶜偺専嶕偵側傞
			else 
			{
				relatedAndSynonym(regSearchWords[0], "", searchRange, noRegSearchWords[0]);
			}
		}
		//専嶕儚乕僪偑暋悢偺応崌昞帵偟側偄
		else if (regSearchWords.length > 1)
		{
			document.getElementById("relatedAndSynonym").style.display = "none";
		}
		//専嶕寢壥傪庢摼
		var searchresult = new Array();
		// 専嶕夋柺偐傜専嶕偡傞応崌
		if (searchRange == 1)
		{
			searchresult = search(regSearchWords, searchBookName);
		} 
		// 専嶕夋柺埲奜偺応崌偼慡暘嶜偺専嶕偵側傞
		else 
		{
			searchresult = search(regSearchWords, "");
		}
		//専嶕寢壥審悢偺昞帵
		document.getElementById("pageCount").innerHTML = searchresult.length;
		//僄儔乕儊僢僙乕僕偺昞帵丒旕昞帵:嵟戝審悢埲忋埥偄偼0審偺応崌僄儔乕傪昞帵偡傞
		if ((searchresult.length == 0) || (searchresult.length == 200 && overMaxCountFlag))
		{
			document.getElementById("errorMessage").style.display = "block";
			var innerHtml = '';
			if (searchresult.length == 0)
			{
				var messages = "沒有找到任何包含此關鍵字的頁面。";
				var messArray = messages.split("\n");
				for (i = 0; i < messArray.length; i++)
				{
					innerHtml += '<p>' + escapeHTML(messArray[i]) + '</p>';
				}
				document.getElementById("errorMessage").innerHTML = innerHtml;
				return;
			}
			else if (searchresult.length == 200 && overMaxCountFlag) 
			{
				var messages = "找到超過 % 個結果。\n已顯示 % 個最相關的結果。\n為了縮小您的搜尋範圍，請輸入更多關鍵字，或以不同的關鍵字搜尋。";
				var re = new RegExp("%", "g");
				messages = messages.replace(re, "200");
				var messArray = messages.split("\n");
				for (i = 0; i < messArray.length; i++)
				{
					innerHtml += '<p>' + escapeHTML(messArray[i]) + '</p>';
				}
				document.getElementById("errorMessage").innerHTML = innerHtml;
			}
		}
		else
		{
			document.getElementById("errorMessage").style.display = "none";
		}
		//寢壥傪僜乕僩偡傞丅
		searchresult = sortResult(searchresult);
		//梫栺傪庢摼偡傞
		var summarys = getTextSummary(searchresult, regSearchWords, noRegSearchWords);
		//専嶕寢壥昞帵
		paging.pageCount = Math.ceil(searchresult.length / 10);
		paging.showpage = 5;
		paging.searchResult = searchresult;
		paging.summarys = summarys;
		paging.printHtml();
		//僴僀儔僀僩昞帵
		change();
	} catch (error) {
	} finally {
		adjust();
	}
}
/*
* adjust the width of the select box
*/
function adjust() {

    var MacFireFox = false;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("mac") != -1 && ua.indexOf("firefox") != -1) {
	MacFireFox = true;
    }
    var isOpera, isIE = false;
    if(typeof(window.opera) != 'undefined') isOpera = true;					
    if(!isOpera && navigator.userAgent.indexOf('MSIE') != -1) isIE = true;					
    var tmp_s = document.getElementById("selectbook");
    setTimeout(function(){
	var m = $(tmp_s).innerWidth();
	if (isIE) m+= 2;
	m = Math.min(m, 395);
	if (!MacFireFox) 
	    $(tmp_s).width(m + 'px').css({"box-sizing": "content-box"}); // need content-box for Safari
	else {
	    m = Math.min($(tmp_s).outerWidth(), 395);
	    $(tmp_s).width(m + 'px');
	}
    }, 0 * 1000); // need setTimeout for IE6.

    // To fix cursor. 
    $(".linkimage").css('cursor', 'pointer');

    return;
}

/**
 * 儅僯儏傾儖堦棗偁傞応崌丄暘嶜僾儖僟僂儞傪昞帵偡傞丅
 *books.length
 */
function displayBooks()
{
	document.getElementById("selectbook").options[0] = new Option('所有手冊', '');
	document.getElementById("selectbook").options[0].selected = "selected";
	for (var i = 0; i < books.length; i++)
	{
		document.getElementById("selectbook").options[i + 1] = new Option(books[i].bookname, books[i].bookFolderName);
	}
}
/**
 * 娭楢岅丒椶媊岅偺昞帵(専嶕儚乕僪偑1偮偺応崌偺傒昞帵偡傞)
 */
function relatedAndSynonym(searchWord, searchBookName, searchRange, noRegSearchWord)
{
	var relatedWord = searchRelatedWord(searchWord, searchBookName);
	var synonym = searchSynonym(searchWord, searchBookName);
	if (relatedWord.length > 0 || synonym.length > 0)
	{
		document.getElementById("relatedAndSynonym").style.display = "block";
	}
	else if(relatedWord.length == 0 && synonym.length == 0)
	{
		document.getElementById("relatedAndSynonym").style.display = "none";
	}
	var bannerInnerHTML = "";
	//娭楢岅偺昞帵
	if (synonym.length > 0)
	{
		bannerInnerHTML += '<dl class="synonym"><dt>';
		bannerInnerHTML += escapeHTML('以相似的關鍵字搜尋');
		bannerInnerHTML += '</dt>';
		for (i = 0; i < synonym.length; i++)
		{
			bannerInnerHTML += '<dd><a href="';
			if (searchRange == 1) 
			{
				bannerInnerHTML += "search_results.htm?seek=" + escape(synonym[i]) + "&bookname=" + escape(searchBookName) + "&fromSeachResultPage=1";
			}
			else
			{
				bannerInnerHTML += "search_results.htm?seek=" + escape(synonym[i]) + "&bookname=" + escape(searchBookName);
			}	
			
			//bannerInnerHTML += '" onclick=javascript:searchBooks();';
			bannerInnerHTML += '"';
			
			bannerInnerHTML += '>';
			bannerInnerHTML += escapeHTML(synonym[i]);
			bannerInnerHTML += '</a></dd>';
		}
		bannerInnerHTML += '</dl>';
	}
	//椶媊岅偺昞帵
	if (relatedWord.length > 0)
	{
		bannerInnerHTML += '<dl class="related"><dt>';
		bannerInnerHTML += escapeHTML('在結果中搜尋');
		bannerInnerHTML += '</dt>';
		for (i = 0; i < relatedWord.length; i++)
		{
			bannerInnerHTML += '<dd><a href="';
			if (searchRange == 1) 
			{
				bannerInnerHTML += "search_results.htm?seek=" + escape(noRegSearchWord) + escape(" ") + escape(relatedWord[i]) + "&bookname=" + escape(searchBookName) + "&fromSeachResultPage=1";
			}
			else
			{
				bannerInnerHTML += "search_results.htm?seek=" + escape(noRegSearchWord) + escape(" ") + escape(relatedWord[i]) + "&bookname=" + searchBookName;
			}
			
			//bannerInnerHTML += '" onclick=javascript:searchBooks();';
			bannerInnerHTML += '"';
			
			bannerInnerHTML += '>';
			bannerInnerHTML += escapeHTML(noRegSearchWord);
			bannerInnerHTML += ' ';
			bannerInnerHTML += escapeHTML(relatedWord[i]);
			bannerInnerHTML += '</a></dd>';
		}
		bannerInnerHTML += '</dl>';
	}
	document.getElementById("relatedAndSynonym").innerHTML = bannerInnerHTML;
}
/**
 * 専嶕寢壥夋柺偱専嶕偡傞帪偺URL傪惗惉
 */
function send_message_search() {
	//儅僯儏傾儖堦棗偑側偄応崌丄bookname偼帺暘偺暘嶜柤偵偡傞丅
	var bookname = "";
	if (document.getElementById("selectbook") != null)
	{
		bookname = document.getElementById("selectbook").value;
	} 
	else
	{
		bookname = get_key_from_url()["bookname"];
	}
	var word = document.getElementById("seek").value;
	location.href = "search_results.htm?seek=" + escape(word) + "&bookname=" + escape(bookname) + "&fromSeachResultPage=1";
}

/**
 * 儁乕僕儞僌僆僽僕僃僋僩傪掕媊偡傞丅
 */
function showPages(name,location)
{
	//弶婜壔
	this.name = name; //儁乕僕儞僌偡傞懳徾偺柤徧
	//崱偺儁乕僕No傪媮傔傞
	this.page = 1; 
	this.pageCount = 1; //憤儁乕僕悢
	this.showpage = 5; //堦妵偱昞帵偱偒傞儁乕僕悢
	this.id = "searchResult";// 寢壥昞帵椞堟偺ID
	this.searchResult = null;//専嶕寢壥
	this.summarys = null;//梫栺
}

/**
 * 儁乕僕儞僌昞帵丗崱偺儁乕僕悢偲憤儁乕僕悢偺専嵏
 */ 
showPages.prototype.checkPages = function()
{
	//isNaN 偼丄搉偝傟偨堷悢傪悢偵曄姺偱偒傞偐偳偆偐傪帋傒傑偡丅
	//偦偺堷悢偑曄姺偱偒側偐偭偨応崌丄true 傪曉偟傑偡丅偦偆偱側偄応崌偼丄false 傪曉偟傑偡丅
	if (isNaN(parseInt(this.page)))
	{
		this.page = 1;
	}
	if (isNaN(parseInt(this.pageCount)))
	{
		this.pageCount = 1;
	}
	if (this.page < 1)
	{
		this.page = 1;
	}
	if (this.pageCount < 1)
	{
		this.pageCount = 1;
	}
	if (this.page > this.pageCount)
	{
		this.page = this.pageCount;
	}
	this.page = parseInt(this.page);
	this.pagecount = parseInt(this.pageCount);
}

/**
 * 儁乕僕儞僌昞帵HTML傪惗惉偡傞
 */ 
showPages.prototype.createHtml = function()
{
	//夋柺昞帵偺HTML乮innerHTML乯傪惗惉偡傞
	var strHtml = '';
	var prevPage = this.page - 1;
	var nextPage = this.page + 1;
	if (prevPage < 1)
	{
		strHtml += '<li class="prevoff"><img src = "../../web/gen/i_prev_g.gif" alt="' + escapeHTML('') + '">' + escapeHTML('上一頁') + '</li>';
		strHtml += '<li class="sep"><img src = "../../web/gen/sep.gif" alt="' + escapeHTML('') + '"></li>';
	} 
	else 
	{
		strHtml += '<li class="prevoff"><a href = "javascript:' +this.name + '.toPage(' + prevPage + ');change();window.scrollTo(0,0);"' + ' title="上一頁"' + '><img src = "../../web/gen/i_prev.gif" alt="' + escapeHTML('') + '">' + escapeHTML('上一頁') + '</a></li>';
		strHtml += '<li class="sep"><img src = "../../web/gen/sep.gif" alt="' + escapeHTML('') + '"></li>';
	}
	if (this.page < this.showpage)
	{
		var startPage = this.page - this.page % this.showpage + 1;
	}
	else if (this.page == this.showpage && this.page == this.pageCount) 
	{
		var startPage = 1;
	}
	else if (this.page >= this.showpage && this.pageCount > this.showpage )
	{
		strHtml += '<li class="no"><a href = "javascript:' + this.name + '.toPage(' + 1 + ');change();window.scrollTo(0,0);">' + 1 + '</a></li><li class="econt">...</li>';
		startPage = this.page - Math.ceil((this.showpage - 1) / 2);
	}
	if (this.page > this.showpage && this.pageCount < startPage + this.showpage - 1)
	{
		var startPage = this.pageCount - this.showpage + 2;
	}
	for (var i = startPage; i < startPage + this.showpage; i++)
	{
		if (i > this.pageCount) break;
		if (startPage > 1 && i == startPage + this.showpage - 1) break;
		if (i == this.page)
		{
			//専嶕寢壥偑0審偺応崌丄儁乕僕偼昞帵偟側偄丅
			if (this.searchResult.length == 0)
			{
				strHtml += '<li class="this"></li>';
			}
			else
			{
				strHtml += '<li class="this">' + i + '</li>';
			}
		}
		else
		{
			strHtml += '<li class="no"><a href = "javascript:' + this.name + '.toPage(' + i + ');change();window.scrollTo(0,0);">' + i + '</a></li>';
		}
	}
	if (this.pageCount != this.showpage && this.pageCount >= startPage + this.showpage - 1)
	{
		strHtml += '<li class="econt">...</li>';
	}
	if (nextPage > this.pageCount)
	{
		strHtml += '<li class="sep"><img src = "../../web/gen/sep.gif" alt="' + escapeHTML('') + '"></li>'
		strHtml += '<li class="nextoff">' + escapeHTML('下一頁') + '<img src = "../../web/gen/i_next_g.gif" alt="' + escapeHTML('') + '"></li>';
	}
	else
	{
		strHtml += '<li class="sep"><img src = "../../web/gen/sep.gif" alt="' + escapeHTML('') + '"></li>'
		strHtml += '<li class="nexton"><a href="javascript:' + this.name + '.toPage(' + nextPage + ');change();window.scrollTo(0,0);"' +  ' title="下一頁"' + '>' + escapeHTML('下一頁') + '<img src = "../../web/gen/i_next.gif" alt="' + escapeHTML('') +  '"></a></li>';
	}
	strHtml += '</span><br />';
	return strHtml;
}

/**
 * 儁乕僕儞僌丗i儁乕僕栚偺撪梕傪昞帵偡傞
 */
function display(i)
{
	var startNo = 10 * (i - 1);
	var endNo = 10 * i;
	var resultHtml = '';
	// 専嶕儚乕僪曄悢偺庢摼
	var w = window.location.search.substring(0,5);
	
	if (endNo > paging.searchResult.length)
	{
		endNo = paging.searchResult.length;
	}
	for (i = startNo; i < endNo; i++)
	{
		var src = "../../" +  books[paging.searchResult[i].bookId].bookFolderName + "/int/" + pages[paging.searchResult[i].pageId].fileName;
		if (w == "?word")
		{
			src += "?&word=" + escape(get_key_from_url()["word"]);
		}
		if (w == "?seek")
		{
			src += "?&seek=" + escape(get_key_from_url()["seek"]);
		}
		resultHtml += '<div class="fpage">';
		resultHtml += '<h2><a href = "';
		resultHtml += src;
		resultHtml += '">' + paging.searchResult[i].pageTitle + '</a>';
		
		resultHtml += '<a href="';
		resultHtml += src;
		resultHtml += '" target="_blank"><img src = "../../web/int/newwin.gif" alt="' + escapeHTML('') + '"' + ' title="在新視窗開啟連結"' + '></a>';
		
		resultHtml += '</h2><ul><li class="book" id="bookname';
		resultHtml += i;
		resultHtml += '">';
		resultHtml += books[paging.searchResult[i].bookId].bookname;
		resultHtml += '</li><li class="summary">';
		if (paging.summarys[i].indexOf("<") > 0)
		{
			paging.summarys[i]=paging.summarys[i].replace(RegExp("<","g"),'&lt;');
		}
		if (paging.summarys[i].indexOf(">") > 0)
		{
			paging.summarys[i]=paging.summarys[i].replace(RegExp(">","g"),'&gt;');
		}
		resultHtml += paging.summarys[i];
		resultHtml += '</li></ul></div>';
	}
	return resultHtml;
}

/**
 * 儁乕僕儞僌丗儁乕僕慗堏
 */
showPages.prototype.toPage = function(page)
{
	this.page = page;
	document.getElementById("paging").innerHTML = this.createHtml();
	//専嶕寢壥傪昞帵偡傞HTML
	var resultHtml = '';
	//嵟弶偼1儁乕僕栚傪昞帵偡傞丅
	resultHtml = display(page);
	document.getElementById("replace").innerHTML = resultHtml;
}

/**
 * 儁乕僕儞僌傪惗惉偡傞
 */
showPages.prototype.printHtml = function()
{
	this.checkPages();
	//嵟弶偼1儁乕僕栚傪昞帵偡傞丅
	document.getElementById("replace").innerHTML = display(1);
	document.getElementById("paging").innerHTML = this.createHtml();
}

/**
 * 梫栺傪庢摼偡傞
 */
function getTextSummary(searchresult, searchWords, noRegSearchWords)
{
	//摿庩婰崋偺張棟
	for (i = 0; i < noRegSearchWords.length; i++)
	{
		noRegSearchWords[i] = dealOtherLanguageMark(noRegSearchWords[i]);
	}
	
	var textSummary = new Array();
	for (j = 0; j < searchresult.length; j++)
	{
		var marks = new Array(' ', '.', ',', ':', ';', '?', '!');
		var regText = pages[searchresult[j].pageId].regText;
		var text = pages[searchresult[j].pageId].text;
		//first偺峔惉偼 {offset, key}
		var first = GetFirstOffSet(text, noRegSearchWords);	
		//杮暥偑100暥帤枹枮
		if (text.length <= 100)
		{
			textSummary[j] = text;
		}
		//杮暥偵専嶕儚乕僪偑側偄
		else if (!searchresult[j].textHitFlag || (typeof(first[1]) == "undefined"))
		{
			
			textSummary[j] = text.substring(0,100) + "...";
			
		}
		//堦斣栚偺専嶕僉乕儚乕僪偑100埲忋偺応崌丄僉乕儚乕僪偺傒昞帵偡傞丅
		else if (noRegSearchWords[0].length >= 100)
		{
			if (first[0] > 0) 
			{
				textSummary[j] = "...";
				textSummary[j] += noRegSearchWords[0];
			}
			else{
				textSummary[j] =  noRegSearchWords[0];
			}
			
			if ((first[0] + first[1].length) < text.length)
			{
				textSummary[j] += "...";
			}
		}
		//専嶕儚乕僪偺慜20暥帤偑愭摢50暥帤偵偐偐傞
		else if (first[0] <= 70)
		{
			
			textSummary[j] = text.substring(0,100) + "...";
			
		}
		//専嶕儚乕僪偺屻20暥帤埲撪偑枛旜偵側傞
		else if ((first[0]+ first[1].length + 20) > text.length)
		{
			
			textSummary[j] = text.substring(0,50) + "..." + text.substring(first[0]-20);
			
		}
		//堦斒揑側応崌
		else
		{
			
			textSummary[j] = text.substring(0,50) + "..." + text.substr(first[0]-20, 40 + first[1].length) + "...";
			
		}
	}
	return textSummary;
}
/**
 * 梫栺偺昞帵丗擔杮岅丄拞崙岅丄娯崙岅埲奜偺応崌丅
 * 巜掕偝傟偰偄傞偲偙傠偼(' ', '.', ',', ':', ';', '?', '!')偱偼側偄応崌偼丄偙傟傜偑弌傞傑偱昞帵偡傞丅
 * 偙偺娭悢偼忋婰婰崋偑嵟弶(埥偄偼嵟屻)偵弌偰偔傞応強傪扵偡丅
 * textString偼杮暥暥帤楍
 * offset偼巜掕偝傟偰偄傞応強
 * directionFlag偼扵偡曽岦丅1偺応崌偼慜偐傜屻傊丅0偺応崌偼偦偺媡丅
 */
function getStringUntilMark(textString, offset, directionFlag)
{
	var marks = new Array(' ', '.', ',', ':', ';', '?', '!');
	// 暥帤楍偺拞偱嵟弶偵弌偰偒傞婰崋偺応強傪扵偡
	var startOffsets = new Array();
	for (m = 0; m < marks.length; m++)
	{
		var markOffset = textString.substring(offset + 1).indexOf(marks[m]);
		if (markOffset != -1)
		{
			startOffsets[startOffsets.length] = markOffset;
		}
	}
	// 暥帤楍偺拞偱嵟屻偵弌偰偒傞婰崋偺応強傪扵偡
	var endOffsets = new Array();
	for (m = 0; m < marks.length; m++)
	{
		var markOffset = textString.substring(offset + 1).lastIndexOf(marks[m]);
		if (markOffset != -1)
		{
			endOffsets[endOffsets.length] = markOffset;
		}
	}

	if (directionFlag == 1)
	{
		var startOffset = startOffsets[0];
		for (m = 0; m < startOffsets.length; m++)
		{
			startOffset = Math.min(startOffsets[m], startOffset);
		}
		return (startOffset + offset + 2);
	}
	else
	{
		var endOffset = endOffsets[0];
		for (m = 0; m < endOffsets.length; m++)
		{
			endOffset = Math.max(endOffsets[m], endOffset);
		}
		return endOffset + offset + 2;
	}
}
/**
 * 嵟弶偵key偑尰傟傞埵抲偲偦偺key傪庢摼偡傞
 * 栠傝抣丗result = {offset, key}
 */
function GetFirstOffSet(text, searchWords)
{
	var offset = new Array();
	var result = new Array();
	//嵟弶偵key偑尰傟傞埵抲
	var firstOffset;
	//嵟弶偵尰傟傞key
	var firstKey;
	//専嶕僉乕儚乕僪偺偦傟偧傟偑嵟弶偵尰傟傞埵抲傪庢摼偡傞
	for (i = 0; i < searchWords.length; i++)
	{
		var reg = new RegExp(searchWords[i], "i");
		if (text.search(reg) != -1)
		{
			offset[offset.length] = text.search(reg);
		}
	}
	firstOffset = offset[0];
	for (i = 0; i < offset.length; i++)
	{
		firstOffset = Math.min(offset[i], firstOffset);
	}
	
	result[0] = firstOffset;
	//嵟弶偵尰傟傞key傪庢摼偡傞
	for (i = 0; i < searchWords.length; i++)
	{
		var reg = new RegExp(searchWords[i], "i");
		if (text.search(reg) == firstOffset)
		{
			firstKey = searchWords[i];
		}
	}
	result[1] = firstKey;
	return result;
}

/**
 * 専嶕寢壥傪僜乕僩偡傞丅
 * 僜乕僩弴偼壓婰偺傛偆偵側偭偰偍傝傑偡丅
 * ?	専嶕儚乕僪偑僞僀僩儖偵娷傑傟傞儁乕僕
 * ?	専嶕儚乕僪偺搊応夞悢偑懡偄弴
 * ?	儁乕僕僞僀僩儖偺暥帤僐乕僪弴
 * ?	儁乕僕斣崋乮塀偟婡擻乯
 */
function sortResult(searchresult)
{
	// 僜乕僩弴?偱僜乕僩偡傞
	// 専嶕儚乕僪偑僞僀僩儖偵娷傑傟偰偄傞寢壥偺攝楍
	var titleTagTrue = new Array();
	var t = 0;
	// 専嶕儚乕僪偑僞僀僩儖偵娷傑傟偰偄側偄寢壥偺攝楍
	var titleTagFalse = new Array();
	var f = 0;
	for (i = 0; i < searchresult.length; i++)
	{
		if (searchresult[i].titleHitFlag)
		{
			titleTagTrue[t] = searchresult[i];
			t++;
		}
		else
		{
			titleTagFalse[f] = searchresult[i];
			f++;
		}
	}
	
	//僜乕僩弴?丄?丄?偱僜乕僩偡傞
	titleTagTrue.sort(compareResult);
	titleTagFalse.sort(compareResult);
	return titleTagTrue.concat(titleTagFalse);
}

/**
 * 僸僢僩夞悢偱崀弴僜乕僩偺斾妑娭悢
 */
function compareResult(a, b)
{
	//僜乕僩弴?偱僜乕僩偡傞
	if (Number(b.hitTimes) - Number(a.hitTimes) != 0)
	{
    	return Number(b.hitTimes) - Number(a.hitTimes);
	}
	else
	{
		//僜乕僩弴?偱僜乕僩偡傞
		if (a.pageTitle != b.pageTitle)
		{
			return (a.pageTitle > b.pageTitle)?1:-1;
		}
		else
		{
			//僜乕僩弴?偱僜乕僩偡傞
			if (a.pageId != b.pageId)
			{
				return Number(a.hitTimes) - Number(b.hitTimes);
			}
			else
			{
				return 0;
			}
		}
	}
}

/**
 * 専嶕僉乕儚乕僪傪庢摼偡傞丅
 * 偦偟偰丄AND専嶕偐堦岅専嶕偺敾抐傕偍偙側偆丅
 * 嶕堷夋柺偺儕儞僋偐傜偺専嶕偼堦岅専嶕丅偦偺懠偼AND専嶕丅
 */
function getKeyWords()
{
	var words = new Array();
	var result = new Array();
	
	// 専嶕儚乕僪曄悢偺庢摼
	var w = window.location.search.substring(0,5);
	
	//嶕堷儕儞僋偺専嶕儚乕僪曄悢偼丗word
	if (w == "?word")
	{
		words[0] = get_key_from_url()["word"];
	}
	else if (w == "?seek") 
	{
		var wordFromUrl = get_key_from_url()["seek"];
		//専嶕暥帤楍偺拞偵僗儁乕僗(慡妏丒敿妏)偑偁傞
		if (wordFromUrl != null && wordFromUrl != '' && typeof(wordFromUrl) != "undefined")
		{
			if (wordFromUrl.indexOf(" ") != -1 || wordFromUrl.indexOf("丂") != -1)
			{
				var tempWords = wordFromUrl.split(" ");
				for (var s = 0; s < tempWords.length; s++)
				{
					if (tempWords[s].indexOf("丂") != -1)
					{
						words = words.concat(tempWords[s].split("丂"));
					}
					else
					{
						var tempWords2 = new Array(tempWords[s]);
						words = words.concat(tempWords2);
					}
				}
			}
			//専嶕暥帤楍偺拞偵僗儁乕僗偑側偄
			else
			{
				words[0] = wordFromUrl;
			}
		}
	}
	//専嶕僉乕儚乕僪儕僗僩偐傜挿偝偑0偺僉乕儚乕僪傪彍嫀偡傞丅
	for (i = 0; i < words.length; i++)
	{
		if (words[i].length != 0)
		{
			result[result.length] = words[i];
		}
	}
	return result;
}

/**
 * JavaScript偺惓婯昞尰傪巊偭偰偄傞婰崋偺張棟
 */
function dealOtherLanguageMark(value)
{
	return escapeWord(value);	// defined in grep.js
}

/**
 * 僥僉僗僩拞偺僗儁乕僗乮慡妏丒敿妏乯丄僞僽傪彍嫀偡傞丅
 */
function removeSpace(value)
{
	if (value != null && value != '' && typeof(value) != "undefined") 
	{
		while (value.indexOf("\t") >= 0) 
		{
			value = value.replace("\t", "");
		}
		while (value.indexOf(" ") >= 0)
		{
			value = value.replace(" ", "");
		}
		while (value.indexOf("丂") >= 0)
		{
			value = value.replace("丂", "");
		}
	}
	return value;
}

function escapeHTML(str) {
	var div = document.createElement('div');
	var text = document.createTextNode(str);
	div.appendChild(text);
	return div.innerHTML;
}
