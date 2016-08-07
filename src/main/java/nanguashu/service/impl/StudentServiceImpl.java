package nanguashu.service.impl;

import javax.annotation.Resource;

import nanguashu.dao.StudentInfoMapper;
import nanguashu.pojo.StudentInfo;
import nanguashu.service.StudentService;
import nanguashu.util.common.page.BeanUtil;
import nanguashu.util.common.page.PagedResult;

import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

@Service("studentService")
public class StudentServiceImpl implements StudentService{

	@Resource
	private StudentInfoMapper studentInfoMapper;
	
	
	public PagedResult<StudentInfo> queryStudentInfoPage(StudentInfo studentInfo,
			Integer pageNo, Integer pageSize) {
		pageNo = pageNo == null?1:pageNo;
		pageSize = pageSize == null?10:pageSize;
		PageHelper.startPage(pageNo,pageSize);  //startPage是告诉拦截器说我要开始分页了。分页参数是这两个。
		return BeanUtil.toPagedResult(studentInfoMapper.queryStudentInfos(studentInfo));
	}

}
