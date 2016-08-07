package nanguashu.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import nanguashu.dao.UserInfoMapper;
import nanguashu.pojo.UserInfo;
import nanguashu.service.IUserService;
@Service("userService")
public class UserServiceImpl implements IUserService{
	@Resource
	private UserInfoMapper userInfoMapper;
	public UserInfo getUserById(int userId) {
		 return this.userInfoMapper.selectByPrimaryKey(userId);
	}

}
