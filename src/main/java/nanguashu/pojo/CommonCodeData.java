package nanguashu.pojo;

public class CommonCodeData {
    private Integer id;

    private String commonCode;

    private String commonCodeName;

    private Integer categoryId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCommonCode() {
        return commonCode;
    }

    public void setCommonCode(String commonCode) {
        this.commonCode = commonCode == null ? null : commonCode.trim();
    }

    public String getCommonCodeName() {
        return commonCodeName;
    }

    public void setCommonCodeName(String commonCodeName) {
        this.commonCodeName = commonCodeName == null ? null : commonCodeName.trim();
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
}