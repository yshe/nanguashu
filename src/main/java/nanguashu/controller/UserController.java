package nanguashu.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import nanguashu.pojo.UserInfo;
import nanguashu.service.IUserService;

import org.apache.log4j.Logger;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/user")
public class UserController {
	
	@Resource
	private IUserService userService;
	
	Logger logger=Logger.getLogger(UserController.class);
	
	@RequestMapping("/showUser")
	public String toIndex(HttpServletRequest request,Model model){
		int userId=Integer.parseInt(request.getParameter("id"));
		UserInfo userInfo=this.userService.getUserById(userId);
		model.addAttribute("user",userInfo);
		logger.info(userInfo.toString());
		return "showUser";
	}
	

}
