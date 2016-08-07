package nanguashu.dao;

import java.util.List;

import nanguashu.pojo.BookInfo;

public interface BookInfoMapper {
	
    int deleteByPrimaryKey(Integer bookId);

    int insert(BookInfo record);

    int insertSelective(BookInfo record);

    BookInfo selectByPrimaryKey(Integer bookId);

    int updateByPrimaryKeySelective(BookInfo record);

    int updateByPrimaryKey(BookInfo record);
    
    List<BookInfo> selectAllBookInfoList();
    
    List<BookInfo> selectBookInfoViewInfo(BookInfo bookInfo);
    
    int selectAllBookInfoNum();
    
    int selectBookInfoBybookTypeId(Integer bookTypeId);
    List<BookInfo> selectByKeySelective(BookInfo bookInfo);
    
}