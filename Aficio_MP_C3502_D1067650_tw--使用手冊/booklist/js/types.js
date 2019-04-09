//分冊オブジェクトを定義する。
function Book(bookId, bookFolderName, bookname)
{
	this.bookId = bookId;
	this.bookFolderName = bookFolderName;
	this.bookname = bookname;
}

//ページオブジェクトを定義する。
function Page(bookId, pageTitle, regPageTitle, text, regText, fileName)
{
	this.bookId = bookId;
	this.pageTitle = pageTitle;
	this.regPageTitle = regPageTitle;
	this.text = text;
	this.regText = regText;
	this.fileName = fileName;
}

//検索結果オブジェクトを定義する。
function SearchResult(bookId, pageId, pageTitle, textHitFlag, titleHitFlag, hitTimes)
{
	this.bookId = bookId;
	this.pageId = pageId;
	this.pageTitle = pageTitle;
	this.textHitFlag = textHitFlag;
	this.titleHitFlag = titleHitFlag;
	this.hitTimes = hitTimes;
}
//関連語オブジェクトを定義する。
function RelatedWord(key, book)
{
	this.book = book;
	this.key = key;
	this.words = new Array();
}

//類義語オブジェクトを定義する。
function Synonym(key, book)
{
	this.book = book;
	this.key = key;
	this.words = new Array();
}
