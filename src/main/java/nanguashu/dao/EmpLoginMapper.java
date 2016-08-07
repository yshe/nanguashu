package nanguashu.dao;

import nanguashu.pojo.EmpLogin;

public interface EmpLoginMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(EmpLogin record);

    int insertSelective(EmpLogin record);

    EmpLogin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EmpLogin record);

    int updateByPrimaryKey(EmpLogin record);
    
    EmpLogin selectByLoginName(String loginName);
    
}