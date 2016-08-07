package nanguashu.pojo;

public class Book {
    private Integer bookTypeId;

    private String bookTypeName;

    private String isUsing;

    private Integer bookSum;

    private Integer parentTypeId;

    private Integer bookBorrowNum;
    
    public Integer getBookTypeId() {
        return bookTypeId;
    }

    public void setBookTypeId(Integer bookTypeId) {
        this.bookTypeId = bookTypeId;
    }

    public String getBookTypeName() {
        return bookTypeName;
    }

    public void setBookTypeName(String bookTypeName) {
        this.bookTypeName = bookTypeName == null ? null : bookTypeName.trim();
    }

    public String getIsUsing() {
        return isUsing;
    }

    public void setIsUsing(String isUsing) {
        this.isUsing = isUsing == null ? null : isUsing.trim();
    }

    public Integer getBookSum() {
        return bookSum;
    }

    public void setBookSum(Integer bookSum) {
        this.bookSum = bookSum;
    }

    public Integer getParentTypeId() {
        return parentTypeId;
    }

    public void setParentTypeId(Integer parentTypeId) {
        this.parentTypeId = parentTypeId;
    }

    public Integer getBookBorrowNum() {
        return bookBorrowNum;
    }

    public void setBookBorrowNum(Integer bookBorrowNum) {
        this.bookBorrowNum = bookBorrowNum;
    }
    private String codeName;



	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
    
}