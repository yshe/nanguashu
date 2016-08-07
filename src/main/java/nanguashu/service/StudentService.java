package nanguashu.service;

import nanguashu.pojo.StudentInfo;
import nanguashu.util.common.page.PagedResult;

public interface StudentService {
	// 学生信息
			PagedResult<StudentInfo> queryStudentInfoPage(StudentInfo studentInfo,
					Integer pageNo, Integer pageSize);
}
