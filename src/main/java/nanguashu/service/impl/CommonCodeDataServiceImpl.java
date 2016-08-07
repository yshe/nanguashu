package nanguashu.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import nanguashu.dao.CommonCodeDataMapper;
import nanguashu.pojo.CommonCodeData;
import nanguashu.service.CommonCodeDataService;
@Service("commonCodeDataService")
public class CommonCodeDataServiceImpl implements CommonCodeDataService{

	@Resource
	private CommonCodeDataMapper codeDataMapper;
	
	public CommonCodeData getCommonCodeDataById(Integer id) {
		return codeDataMapper.selectByPrimaryKey(id);
	}

	public CommonCodeData getCodeDataByCodeAndName(CommonCodeData codeData) {
		return  codeDataMapper.selectCodeDataByCodeAndName(codeData);
	}

	public int insertCommonCodeDataInfo(CommonCodeData codeData) {
		return codeDataMapper.insert(codeData);
	}

	public int updateByPrimaryKeySelective(CommonCodeData record) {
		return codeDataMapper.updateByPrimaryKeySelective(record);
	}

}
