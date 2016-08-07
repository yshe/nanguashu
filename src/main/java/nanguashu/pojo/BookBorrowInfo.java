package nanguashu.pojo;

import java.util.Date;

public class BookBorrowInfo {
    private Integer id;

    private Integer bookId;

    private Integer studentId;

    private Date borrowTime;

    private Integer borrowDay;

    private Date returnDay;

    private String createById;

    private String createByName;

    private Date createByTime;

    private String borrowInfo;
    
    private String bookStatus;

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

    public Date getBorrowTime() {
        return borrowTime;
    }

    public void setBorrowTime(Date borrowTime) {
        this.borrowTime = borrowTime;
    }

    public Integer getBorrowDay() {
        return borrowDay;
    }

    public void setBorrowDay(Integer borrowDay) {
        this.borrowDay = borrowDay;
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

    public Date getCreateByTime() {
        return createByTime;
    }

    public void setCreateByTime(Date createByTime) {
        this.createByTime = createByTime;
    }

    public String getBorrowInfo() {
        return borrowInfo;
    }

    public void setBorrowInfo(String borrowInfo) {
        this.borrowInfo = borrowInfo == null ? null : borrowInfo.trim();
    }

	public String getBookStatus() {
		return bookStatus;
	}

	public void setBookStatus(String bookStatus) {
		this.bookStatus = bookStatus;
	}
    
    
}