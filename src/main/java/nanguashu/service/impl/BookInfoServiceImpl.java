package nanguashu.service.impl;


import java.util.List;

import javax.annotation.Resource;

import nanguashu.dao.BookBorrowInfoMapper;
import nanguashu.dao.BookInfoMapper;
import nanguashu.dao.BookMapper;
import nanguashu.dao.CommonCodeDataMapper;
import nanguashu.pojo.Book;
import nanguashu.pojo.BookBorrowInfo;
import nanguashu.pojo.BookInfo;
import nanguashu.pojo.CommonCodeData;
import nanguashu.service.BookInfoService;
import nanguashu.util.common.page.BeanUtil;
import nanguashu.util.common.page.PagedResult;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

@Service("bookInfoService")
public class BookInfoServiceImpl implements BookInfoService{
	
	@Resource
	private CommonCodeDataMapper commonCodeDataMapper;
	@Resource
	private BookInfoMapper bookInfoMapper;
	@Resource
	private BookMapper bookMapper;
	@Resource
	private BookBorrowInfoMapper bookBorrowInfoMapper;
	@Resource
	private CommonCodeDataMapper codeDataMapper;
	
	
	/**
	 * 获取图书类别数量
	 */
	public Integer getBookType(Integer categoryId) {
		
		return commonCodeDataMapper.selectAllCodeDataNumByCategoryId(categoryId);
	}
	
	public List<CommonCodeData> getBookTypeList(Integer categoryId) {
		return commonCodeDataMapper.selectAllCodeDataByCategoryId(categoryId);
	}
	
	//2.获取图书类目数量
	public List<Book> getBookItemList(Book book) {
		return bookMapper.selectBookViewInfo( book);
	}

	public Integer getBookItemSum() {
		return bookMapper.selectAllBookNum();
	}
	
	//3.获取图书册数数量
	public List<BookInfo> getBooksList() {
		return bookInfoMapper.selectAllBookInfoList();
	}

	public Integer getBooksSum() {
		return bookInfoMapper.selectAllBookInfoNum();
	}
	
	
	
	//4.获取借出的图书册数总数
	public Integer getBorrowBooksNum() {
		return bookBorrowInfoMapper.selectAllBorrowBookInfoList().size();
	}

	public List<BookBorrowInfo> getBorrowBooksList() {
		return bookBorrowInfoMapper.selectAllBorrowBookInfoList();
	}

	//分页显示图书条目信息
	public PagedResult<Book> queryBookItemPage(Book book,Integer pageNo,Integer pageSize ) {
		pageNo = pageNo == null?1:pageNo;
		pageSize = pageSize == null?10:pageSize;
		PageHelper.startPage(pageNo,pageSize);  //startPage是告诉拦截器说我要开始分页了。分页参数是这两个。
		return BeanUtil.toPagedResult(bookMapper.selectBookViewInfo(book));
	}
	//分页显示图书类别信息
	public PagedResult<CommonCodeData> queryBookTypePage(String BookTypeName,
			Integer pageNo, Integer pageSize) {
		pageNo = pageNo == null?1:pageNo;
		pageSize = pageSize == null?10:pageSize;
		PageHelper.startPage(pageNo,pageSize);  //startPage是告诉拦截器说我要开始分页了。分页参数是这两个。
		CommonCodeData codeData=new CommonCodeData();
		if(!StringUtils.isEmpty(BookTypeName)){
			codeData.setCommonCodeName("%"+BookTypeName+"%");
		}
		codeData.setCategoryId(2);
		return BeanUtil.toPagedResult(codeDataMapper.selectAllCodeDataByName(codeData));
	}

	//根据类别ID检验该类别下是否有图书条目信息
	public boolean validateTypeHasBook(Integer id){
		int i=bookMapper.validateBookTypeHasBook(id);
		if(i>0){return true;}//有图书信息
		return false;//没有图书条目，可以删除
	}
	//删除图书类别
	public int deleteBookType(Integer id) {
		return commonCodeDataMapper.deleteByPrimaryKey(id);
	}
	
	
	//根据类别ID和图书名，检验是否存在相同类别和图书名的图书信息
	public boolean validateBookItem(Book book){
		if(bookMapper.validateBookItemExsits(book)>0){
			return true;//存在相同类别和图书名的条目信息
		}
		return false;//不存在相同类别和图书名的条目信息
		
		
	}

	public int insertBookItemInfo(Book book) {
		return bookMapper.insertSelective(book);
	}

	public Book getOneBookItemById(Integer bookTypeId) {
		return bookMapper.selectByPrimaryKey(bookTypeId);
	}
	

	public int getOneBookInfoByBooktypeId(Integer bookTypeId){
		return bookInfoMapper.selectBookInfoBybookTypeId(bookTypeId);
	}
	
	public int deleteOneBookItem(Integer bookId){
		return bookMapper.deleteByPrimaryKey(bookId);
	}
	
	public  int updateBooItem(Book book){
		return bookMapper.updateByPrimaryKeySelective(book);
	}

	public List<BookInfo> bookNoIsExists(BookInfo bookInfo) {
		return bookInfoMapper.selectByKeySelective(bookInfo);
	}

	public int insertBook(BookInfo bookInfo) {
		return bookInfoMapper.insert(bookInfo);
	}

	public PagedResult<BookInfo> queryBookInfoPage(BookInfo bookInfo,
			Integer pageNo, Integer pageSize) {
		pageNo = pageNo == null?1:pageNo;
		pageSize = pageSize == null?10:pageSize;
		PageHelper.startPage(pageNo,pageSize);  //startPage是告诉拦截器说我要开始分页了。分页参数是这两个。
		return BeanUtil.toPagedResult(bookInfoMapper.selectBookInfoViewInfo(bookInfo));
		
	}

	public BookInfo getOneBookInfo(Integer bookId) {
		return bookInfoMapper.selectByPrimaryKey(bookId);
	}

	public int updateBookInfo(BookInfo bookInfo) {
		return bookInfoMapper.updateByPrimaryKeySelective(bookInfo);
	}

	public int deleteBookInfo(Integer bookId) {
		return bookInfoMapper.deleteByPrimaryKey(bookId);
	}
}
