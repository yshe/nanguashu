package nanguashu.pojo;

import java.util.Date;

public class BookReturnInfo {
    private Integer id;

    private Integer bookId;

    private Integer studentId;

    private Date returnDay;

    private String createById;

    private String createByName;

    private Date createTime;

    private String returnInfo;

    private String isExperieTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Date getReturnDay() {
        return returnDay;
    }

    public void setReturnDay(Date returnDay) {
        this.returnDay = returnDay;
    }

    public String getCreateById() {
        return createById;
    }

    public void setCreateById(String createById) {
        this.createById = createById == null ? null : createById.trim();
    }

    public String getCreateByName() {
        return createByName;
    }

    public void setCreateByName(String createByName) {
        this.createByName = createByName == null ? null : createByName.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getReturnInfo() {
        return returnInfo;
    }

    public void setReturnInfo(String returnInfo) {
        this.returnInfo = returnInfo == null ? null : returnInfo.trim();
    }

    public String getIsExperieTime() {
        return isExperieTime;
    }

    public void setIsExperieTime(String isExperieTime) {
        this.isExperieTime = isExperieTime == null ? null : isExperieTime.trim();
    }
}