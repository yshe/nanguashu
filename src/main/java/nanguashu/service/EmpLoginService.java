package nanguashu.service;

import nanguashu.pojo.AdminInfo;
import nanguashu.pojo.EmpLogin;

public interface EmpLoginService {
	
	public EmpLogin validateLoginName(String loginName);
	
	public AdminInfo getAdminInfo(String empLoyeeId);
	
	

}
