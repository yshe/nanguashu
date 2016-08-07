package nanguashu.dao;

import nanguashu.pojo.BookReturnInfo;

public interface BookReturnInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BookReturnInfo record);

    int insertSelective(BookReturnInfo record);

    BookReturnInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BookReturnInfo record);

    int updateByPrimaryKey(BookReturnInfo record);
}