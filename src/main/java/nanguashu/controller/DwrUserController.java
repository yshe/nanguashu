package nanguashu.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import nanguashu.pojo.UserInfo;
import nanguashu.service.IUserService;

import org.apache.log4j.Logger;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.alibaba.fastjson.JSON;

@Controller
@RemoteProxy(name="dwrService")
public class DwrUserController {
	
	@Resource
	private IUserService userService;
	Logger logger=Logger.getLogger(DwrUserController.class);
	
	public String toIndex(HttpServletRequest request,Model model){
		int userId=Integer.parseInt(request.getParameter("id"));
		UserInfo userInfo=this.userService.getUserById(userId);
		model.addAttribute("user",userInfo);
		logger.info(userInfo.toString());
		return "showUser";
	}
	
	@RemoteMethod
	public String sayHello(String string){
		UserInfo userInfo=this.userService.getUserById(1);
		return "你好！"+JSON.toJSONString(userInfo)+string;
		
	}
	
	

}
