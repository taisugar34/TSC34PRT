//�����I�u�W�F�N�g���`����B
function Book(bookId, bookFolderName, bookname)
{
	this.bookId = bookId;
	this.bookFolderName = bookFolderName;
	this.bookname = bookname;
}

//�y�[�W�I�u�W�F�N�g���`����B
function Page(bookId, pageTitle, regPageTitle, text, regText, fileName)
{
	this.bookId = bookId;
	this.pageTitle = pageTitle;
	this.regPageTitle = regPageTitle;
	this.text = text;
	this.regText = regText;
	this.fileName = fileName;
}

//�������ʃI�u�W�F�N�g���`����B
function SearchResult(bookId, pageId, pageTitle, textHitFlag, titleHitFlag, hitTimes)
{
	this.bookId = bookId;
	this.pageId = pageId;
	this.pageTitle = pageTitle;
	this.textHitFlag = textHitFlag;
	this.titleHitFlag = titleHitFlag;
	this.hitTimes = hitTimes;
}
//�֘A��I�u�W�F�N�g���`����B
function RelatedWord(key, book)
{
	this.book = book;
	this.key = key;
	this.words = new Array();
}

//�ދ`��I�u�W�F�N�g���`����B
function Synonym(key, book)
{
	this.book = book;
	this.key = key;
	this.words = new Array();
}
