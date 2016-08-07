package nanguashu.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import nanguashu.dao.AdminInfoMapper;
import nanguashu.dao.EmpLoginMapper;
import nanguashu.pojo.AdminInfo;
import nanguashu.pojo.EmpLogin;
import nanguashu.service.EmpLoginService;
@Service("emploginService")
public class EmpLoginServiceImpl implements EmpLoginService{
	@Resource
	private EmpLoginMapper empLoginMapper;
	@Resource
	private AdminInfoMapper adminInfoMapper;
	public EmpLogin validateLoginName(String loginName) {
		return this.empLoginMapper.selectByLoginName(loginName);
	}
	public AdminInfo getAdminInfo(String empLoyeeId) {
		return adminInfoMapper.selectByPrimaryKey(empLoyeeId);
	}
}
