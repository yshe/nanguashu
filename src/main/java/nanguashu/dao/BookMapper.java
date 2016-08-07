package nanguashu.dao;

import java.util.List;

import nanguashu.pojo.Book;
import nanguashu.pojo.BookInfo;

public interface BookMapper {
	
    int deleteByPrimaryKey(Integer bookTypeId);

    int insert(Book record);

    int insertSelective(Book record);

    Book selectByPrimaryKey(Integer bookTypeId);

    int updateByPrimaryKeySelective(Book record);

    int updateByPrimaryKey(Book record);
    
    List<Book> selectAllBookList();
    
    int selectAllBookNum();
    
    List<Book> selectBookViewInfo(Book book);

    int validateBookTypeHasBook(Integer parentTypeId);
    
    int validateBookItemExsits(Book book);
    
    
    
    
}