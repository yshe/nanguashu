package nanguashu.dao;

import nanguashu.pojo.AdminInfo;

public interface AdminInfoMapper {
    int deleteByPrimaryKey(String employeeId);

    int insert(AdminInfo record);

    int insertSelective(AdminInfo record);

    AdminInfo selectByPrimaryKey(String employeeId);

    int updateByPrimaryKeySelective(AdminInfo record);

    int updateByPrimaryKey(AdminInfo record);
}