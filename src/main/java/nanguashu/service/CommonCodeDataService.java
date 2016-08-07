package nanguashu.service;

import nanguashu.pojo.CommonCodeData;

public interface CommonCodeDataService {
	
	public CommonCodeData getCommonCodeDataById(Integer id); 
	
	public CommonCodeData getCodeDataByCodeAndName(CommonCodeData codeData);
	
	
	public int insertCommonCodeDataInfo(CommonCodeData codeData);
	
	public int updateByPrimaryKeySelective(CommonCodeData codeData);
	
	
	

}
