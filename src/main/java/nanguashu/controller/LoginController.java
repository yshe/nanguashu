package nanguashu.controller;

import java.awt.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import nanguashu.pojo.AdminInfo;
import nanguashu.pojo.Book;
import nanguashu.pojo.BookBorrowInfo;
import nanguashu.pojo.BookInfo;
import nanguashu.pojo.CommonCodeData;
import nanguashu.pojo.EmpLogin;
import nanguashu.service.BookInfoService;
import nanguashu.service.EmpLoginService;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * 用户登录控制
 * @author yabushan
 *
 */
@Controller
public class LoginController {
	
	private Logger logger = Logger.getLogger(LoginController.class);
	
	@Resource
	private EmpLoginService emploginService;
	@Resource
	private BookInfoService bookInfoService;
	
	
	@RequestMapping(value="login",method=RequestMethod.GET)
	public String Login(){
		return "AdminLogin";
	}
	
	@RequestMapping(value="login",method=RequestMethod.POST)
	public String login(@RequestParam(value="username",required = false) String username,
						@RequestParam("password") String password,HttpServletRequest request,Model model){
		String errmsg="";
		
		EmpLogin empLogin=emploginService.validateLoginName(username);
		if(null==empLogin){
			errmsg="用户名不存在！";
		}else{
			if(password.equals(empLogin.getPassword())){
				//登录成功
				model.addAttribute("empInfo", empLogin);
				AdminInfo adminInfo=emploginService.getAdminInfo(empLogin.getEmployeeId());
				HttpSession session=request.getSession();
				session.setAttribute("userInfo", adminInfo);
				return "index";
			}else{
				//密码不正确
				errmsg="密码不正确！";
			}
		}
		model.addAttribute("errmsg",errmsg);
		return "AdminLogin";
	}
	/**
	 * 退出登录
	 * @param request
	 * @param response
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value="/logout",method=RequestMethod.GET)    
    public String logout(HttpServletRequest request,HttpServletResponse response,
    		RedirectAttributes redirectAttributes ){
        //使用权限管理工具进行用户的退出，跳出登录，给出提示信息  
//        SecurityUtils.getSubject().logout();    
        redirectAttributes.addFlashAttribute("message", "您已安全退出");
        request.getSession().removeAttribute("userInfo");
        return "redirect:/login";  
    }
	
	/**
	 * 图书管理控制
	 * 1.获取图书信息
	 * @return
	 */
	@RequestMapping(value="book/bookInfo",method=RequestMethod.GET)
	public String dumpToBookInfo(Model model,HttpServletRequest request){
		
		//1.获取图书类别数量
		//Integer typeNum=bookInfoService.getBookType(2);
		java.util.List<CommonCodeData> BookTypelist=bookInfoService.getBookTypeList(2);
		model.addAttribute("bookTypeNum", BookTypelist.size());
		model.addAttribute("bookTypeList", BookTypelist);
		
		//2.获取图书类目数量
		java.util.List<Book> books =bookInfoService.getBookItemList(new Book());
		model.addAttribute("bookItemNum",books.size());
		model.addAttribute("bookItemList", books);
		//3.获取图书册数数量
		java.util.List<BookInfo> bookInfoList=bookInfoService.getBooksList();
		model.addAttribute("bookInfoNum", bookInfoList.size());
		model.addAttribute("bookInfoList", bookInfoList);
		//4.获取借出的图书册数总数
		java.util.List<BookBorrowInfo> bookBorrowInfoList=bookInfoService.getBorrowBooksList();
		model.addAttribute("bookBorrowNum", bookBorrowInfoList.size());
		model.addAttribute("bookBorrowInfoList", bookBorrowInfoList);
		return "book/bookInfo";
	}
	

	/**
	 * 图书管理控制
	 * 1.获取图书信息
	 * @return
	 */
	@RequestMapping(value="book/book",method=RequestMethod.GET)
	public String dumpToBook(Model model){
		
		//1.获取图书类别数量
		//Integer typeNum=bookInfoService.getBookType(2);
		java.util.List<CommonCodeData> BookTypelist=bookInfoService.getBookTypeList(2);
		model.addAttribute("bookTypeNum", BookTypelist.size());
		model.addAttribute("bookTypeList", BookTypelist);
		
		//2.获取图书类目数量
		java.util.List<Book> books =bookInfoService.getBookItemList(new Book());
		model.addAttribute("bookItemNum",books.size());
		model.addAttribute("bookItemList", books);
		//3.获取图书册数数量
		java.util.List<BookInfo> bookInfoList=bookInfoService.getBooksList();
		model.addAttribute("bookInfoNum", bookInfoList.size());
		model.addAttribute("bookInfoList", bookInfoList);
		//4.获取借出的图书册数总数
		java.util.List<BookBorrowInfo> bookBorrowInfoList=bookInfoService.getBorrowBooksList();
		model.addAttribute("bookBorrowNum", bookBorrowInfoList.size());
		model.addAttribute("bookBorrowInfoList", bookBorrowInfoList);
		return "book/book";
	}
	/**
	 * 图书类别管理控制
	 */
	@RequestMapping(value="book/bookType",method=RequestMethod.GET)
	public String dumpToBookType(Model model){
		return "book/bookType";
	}
	
	
	@RequestMapping(value="student/infoList",method=RequestMethod.GET)
	public String dumpToStudentInfo(Model model){
		//1.获取图书类别数量
		//Integer typeNum=bookInfoService.getBookType(2);
		java.util.List<CommonCodeData> BookTypelist=bookInfoService.getBookTypeList(2);
		model.addAttribute("bookTypeNum", BookTypelist.size());
		model.addAttribute("bookTypeList", BookTypelist);
		
		//2.获取图书类目数量
		java.util.List<Book> books =bookInfoService.getBookItemList(new Book());
		model.addAttribute("bookItemNum",books.size());
		model.addAttribute("bookItemList", books);
		//3.获取图书册数数量
		java.util.List<BookInfo> bookInfoList=bookInfoService.getBooksList();
		model.addAttribute("bookInfoNum", bookInfoList.size());
		model.addAttribute("bookInfoList", bookInfoList);
		//4.获取借出的图书册数总数
		java.util.List<BookBorrowInfo> bookBorrowInfoList=bookInfoService.getBorrowBooksList();
		model.addAttribute("bookBorrowNum", bookBorrowInfoList.size());
		model.addAttribute("bookBorrowInfoList", bookBorrowInfoList);
		return "student/student";
		
	}
}
