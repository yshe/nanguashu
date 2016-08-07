package nanguashu.dao;


import java.util.List;

import nanguashu.pojo.CommonCodeData;

public interface CommonCodeDataMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CommonCodeData record);

    int insertSelective(CommonCodeData record);

    CommonCodeData selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CommonCodeData record);

    int updateByPrimaryKey(CommonCodeData record);
    
    int selectAllCodeDataNumByCategoryId(Integer categoryId);
    
    List<CommonCodeData> selectAllCodeDataByCategoryId(Integer categoryId);
    List<CommonCodeData> selectAllCodeDataByName(CommonCodeData commonCodeData);
    CommonCodeData selectCodeDataByCodeAndName(CommonCodeData commonCodeData);
    
    
}