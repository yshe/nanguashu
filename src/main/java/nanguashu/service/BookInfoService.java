package nanguashu.service;

import java.util.List;

import javax.ws.rs.DELETE;

import nanguashu.pojo.Book;
import nanguashu.pojo.BookBorrowInfo;
import nanguashu.pojo.BookInfo;
import nanguashu.pojo.CommonCodeData;
import nanguashu.util.common.page.PagedResult;

public interface BookInfoService {

	// 1.获取图书类别数量
	public Integer getBookType(Integer categoryId);

	public List<CommonCodeData> getBookTypeList(Integer categoryId);

	// 2.获取图书类目数量
	public List<Book> getBookItemList(Book book);

	public Integer getBookItemSum();

	// 3.获取图书册数数量
	public List<BookInfo> getBooksList();

	public Integer getBooksSum();

	// 4.获取借出的图书册数总数
	public Integer getBorrowBooksNum();

	public List<BookBorrowInfo> getBorrowBooksList();

	// 5.检验图书类别下是否有图书条目
	public boolean validateTypeHasBook(Integer id);

	// 6.删除图书类别
	public int deleteBookType(Integer id);

	// 7.新增图书条目
	public int insertBookItemInfo(Book book);

	// 8.根据主键ID获取一条图书条目信息
	public Book getOneBookItemById(Integer bookTypeId);

	// 9.根据bookTypeId获取图书信息
	public int getOneBookInfoByBooktypeId(Integer bookTypeId);

	// 10.删除一条图书条目信息
	public int deleteOneBookItem(Integer bookId);
	//11.更新一条图书条目信息
	public int updateBooItem(Book book);
	//12.校验图书编号是否已存在
	public List<BookInfo> bookNoIsExists(BookInfo bookInfo);
	//13.新增图书
	public int insertBook(BookInfo bookInfo);
	
	//14.更新一条图书信息
	public int updateBookInfo(BookInfo bookInfo);
	//15.删除一条图书信息
	public int deleteBookInfo(Integer bookId);
	public BookInfo getOneBookInfo(Integer bookId);

	// 分页显示
	// 图书条目
	PagedResult<Book> queryBookItemPage(Book book, Integer pageNo,
			Integer pageSize);

	// 图书类别
	PagedResult<CommonCodeData> queryBookTypePage(String commonCodeName,
			Integer pageNo, Integer pageSize);
	// 图书信息
		PagedResult<BookInfo> queryBookInfoPage(BookInfo bookInfo,
				Integer pageNo, Integer pageSize);
	// 根据类别ID和图书名，检验是否存在相同类别和图书名的图书信息
	public boolean validateBookItem(Book book);

}
