package nanguashu.controller;

import javax.annotation.Resource;

import nanguashu.pojo.BookInfo;
import nanguashu.pojo.StudentInfo;
import nanguashu.service.StudentService;
import nanguashu.util.common.page.PagedResult;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 学生管理类
 * @author yabushan
 *
 */
@Controller
public class StudentController extends BaseController{
	
	@Resource
	private StudentService studentService;
	
	@RequestMapping(value="student/view.do",method=RequestMethod.POST)
	@ResponseBody
	public String getStudentInfoList(Integer pageNumber,Integer pageSize ,StudentInfo studentInfo){
		try {
			if(studentInfo!=null){
				if(null!=studentInfo.getStudentCode() && !"".equals(studentInfo.getStudentCode())){
					studentInfo.setStudentCode("%"+studentInfo.getStudentCode()+"%");
				}else{
					studentInfo.setStudentCode(null);
				}
				if(null!=studentInfo.getStudentName() && !"".equals(studentInfo.getStudentName())){
					studentInfo.setStudentName("%"+studentInfo.getStudentName()+"%");
				}else{
					studentInfo.setStudentName(null);
				}
			}
			PagedResult<StudentInfo> pageResult = studentService.queryStudentInfoPage(studentInfo, pageNumber, pageSize);
    	    return responseSuccess(pageResult);
    	} catch (Exception e) {
			return responseFail(e.getMessage());
		}
	
	}

	
}
