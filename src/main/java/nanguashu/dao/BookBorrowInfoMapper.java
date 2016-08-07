package nanguashu.dao;

import java.util.List;

import nanguashu.pojo.BookBorrowInfo;

public interface BookBorrowInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BookBorrowInfo record);

    int insertSelective(BookBorrowInfo record);

    BookBorrowInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BookBorrowInfo record);

    int updateByPrimaryKey(BookBorrowInfo record);
    
    List<BookBorrowInfo> selectAllBorrowBookInfoList();
}