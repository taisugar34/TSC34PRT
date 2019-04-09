// 専嶕寢壥偑200審傪墇偊偰偄傞偐偳偆偐偺僼儔僢僌
var overMaxCountFlag = false;
/** N-Gram傾儖僑儕僘儉傪棙梡偟偰丄慡暥専嶕傪峴偆丅
 * 専嶕寢壥偼SearchResult偺攝楍偲偟偰曉媝偝傟傞丅
 * 専嶕寢壥偑0審偺応崌丄挿偝偑0偺攝楍偲偟偰曉媝偝傟丄null偑曉傞偙偲偼柍偄丅
 * searchWords 偼専嶕僉乕儚乕僪儕僗僩
 * searchBookName偼慖戰偝傟偰偄傞暘嶜偺僼僅儖僟柤丅儅僯儏傾儖堦棗偑側偄応崌偼0偵側傞
 * 専嶕偼鑷抣偑愝掕偱偒傞丅
 */
function search(searchWords, searchBookName)
{
	var result = new Array();
	for (i = 0; i < pages.length; i++)
	{
		if (searchBookName != "" && searchBookName != books[pages[i].bookId].bookFolderName)
		{
			continue;
		}
		//僸僢僩偟偨夞悢
		var times = 0;
		//僞僀僩儖偑僸僢僩偝傟偨偐偳偆偐偺flag
		var titleHitflag = false;
		//杮暥偑僸僢僩偝傟偨偐偳偆偐偺flag
		var textHitflag = false; 
		//僞僀僩儖偑僸僢僩偝傟偨夞悢
		var titleHitTimes = 0;
		//杮暥偑僸僢僩偝傟偨夞悢
		var textHitTimes = 0;
		//奺専嶕僉乕儚乕僪偺搊応夞悢
		var wordsHitTime = new Array();
		for (j = 0; j < searchWords.length; j++)
		{
			var reg = new RegExp(searchWords[j], "g");
			var textResult = pages[i].regText.match(reg);
			var titleResult = pages[i].regPageTitle.match(reg);
			//侾偮僉乕儚乕僪偺搊応夞悢
			var oneWordHitTime = 0;
			if (textResult != null)
			{
				oneWordHitTime += textResult.length;
				times += textResult.length;
				textHitTimes += textResult.length;
			}
			if (titleResult != null)
			{	
				oneWordHitTime += titleResult.length;
				times += titleResult.length;
				titleHitTimes += titleResult.length;
			}
			wordsHitTime[j] = oneWordHitTime;
		}
		if (isResult(wordsHitTime, 2))
		{
			if (titleHitTimes > 0)
			{
				titleHitflag = true;
			}
			if (textHitTimes > 0)
			{
				textHitflag = true;
			}
			result[result.length] = new SearchResult(pages[i].bookId, i, pages[i].pageTitle, textHitflag, titleHitflag, times);
		}
		//200審埲忋偵側傞偲丄専嶕傪巭傔偰丄弌偰偒偨200審傪栠傞
		if (result.length == 200)
		{
			overMaxCountFlag = true;
			break;
		}
		else
		{
			overMaxCountFlag = false;
		}
	}
	return result;
}
/**
 * 鑷抣埲忋偺応崌偼専嶕寢壥偵側傞丅
 * wordsHitTime偼奺僉乕儚乕僪偺搊応夞悢偺攝楍
 * threshold偼愝掕偝傟偰偄偨鑷抣
 * 栠傝抣丗鑷抣埲忋偺応崌偼true
 */
function isResult(wordsHitTime, threshold)
{
	var zeroCount = 0;
	for (var h = 0; h < wordsHitTime.length; h++)
	{
		if (wordsHitTime[h] == 0)
		{
			zeroCount++;
		}
	}
	var hitRate = (wordsHitTime.length - zeroCount)/wordsHitTime.length;
	var rate = threshold / 3;
	if (hitRate >= rate)
	{
		return true;
	}
	else
	{
		return false;
	}
}
/**
 * 娭楢岅偺専嶕傪峴偆丅乮専嶕僉乕儚乕僪偑1儚乕僪偺傒偺応崌峴偆乯
 * 専嶕寢壥偼攝楍偲偟偰曉媝偝傟傞丅
 * 専嶕寢壥偑0審偺応崌丄挿偝偑0偺攝楍偲偟偰曉媝偝傟丄null偑曉傞偙偲偼柍偄丅
 * searchWord 偼専嶕僉乕儚乕僪
 * searchBookName偼慖戰偝傟偰偄傞暘嶜柤丅儅僯儏傾儖堦棗偑側偄応崌偼0偵側傞
 */
function searchRelatedWord(searchWord, searchBookName)
{	
	var related = new Array();
	for(i = 0; i < relatedWords.length; i++)
	{
		if (searchBookName == "" && relatedWords[i].book != -1)
		{
			continue;
		}
		if (searchBookName != "")
		{
			if (relatedWords[i].book == -1) 
			{
				continue;
			} 
			else if (searchBookName != books[relatedWords[i].book].bookFolderName) 
			{
				continue;
			}
		}
		// searchWord is escaped.
		if(escapeWord(relatedWords[i].key) == searchWord)
		{
			related = relatedWords[i].words;
			break;
		}
	}
	
	return related;
}

/**
 * 椶媊岅偺専嶕傪峴偆丅乮専嶕僉乕儚乕僪偑1儚乕僪偺傒偺応崌峴偆乯
 * 専嶕寢壥偼攝楍偲偟偰曉媝偝傟傞丅
 * 専嶕寢壥偑0審偺応崌丄挿偝偑0偺攝楍偲偟偰曉媝偝傟丄null偑曉傞偙偲偼柍偄丅
 * searchWord 偼専嶕僉乕儚乕僪
 * searchBookName偼慖戰偝傟偰偄傞暘嶜柤丅儅僯儏傾儖堦棗偑側偄応崌偼0偵側傞
 */
function searchSynonym(searchWord, searchBookName)
{
	var synonym = new Array();
	for(i = 0; i < synonyms.length; i++)
	{
		if (searchBookName == "" && synonyms[i].book != -1)
		{
			continue;
		}
		if (searchBookName != "")
		{
			if (synonyms[i].book == -1) 
			{
				continue;
			} 
			else if (searchBookName != books[synonyms[i].book].bookFolderName) 
			{
				continue;
			}
		}

		// searchWord is escaped.
		if(escapeWord(synonyms[i].key)  == searchWord)
		{
			synonym = synonyms[i].words;
			break;
		}
	}
	
	return synonym;
}

function escapeWord (str) {
	 return str.replace(/([^A-Za-z0-9])/g , "\\$1");
}
