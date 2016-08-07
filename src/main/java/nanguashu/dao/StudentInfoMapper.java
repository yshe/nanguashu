package nanguashu.dao;

import java.util.List;

import nanguashu.pojo.StudentInfo;

public interface StudentInfoMapper {
    int deleteByPrimaryKey(Integer studentId);

    int insert(StudentInfo record);

    int insertSelective(StudentInfo record);

    StudentInfo selectByPrimaryKey(Integer studentId);

    int updateByPrimaryKeySelective(StudentInfo record);

    int updateByPrimaryKey(StudentInfo record);
    
    
    List<StudentInfo> queryStudentInfos(StudentInfo studentInfo);
}