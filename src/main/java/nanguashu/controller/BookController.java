package nanguashu.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import nanguashu.pojo.AdminInfo;
import nanguashu.pojo.Book;
import nanguashu.pojo.BookInfo;
import nanguashu.pojo.CommonCodeData;
import nanguashu.service.BookInfoService;
import nanguashu.service.CommonCodeDataService;
import nanguashu.util.common.JsonTools;
import nanguashu.util.common.page.PagedResult;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

/**
 * 书籍控制类
 * @author yabushan
 *
 */
@Controller
@RemoteProxy(name="dwrBookService")
public class BookController extends BaseController {
	
	@Resource
	private BookInfoService bookInfoService;
	@Resource
	private CommonCodeDataService commonCodeDataService;
	/**
	 * 图书条目 分页
	 * @param pageNumber
	 * @param pageSize
	 * @param book
	 * @return
	 */
	@RequestMapping(value="book/view.do" ,method=RequestMethod.POST)
	@ResponseBody
	public String getBookView(Integer pageNumber,Integer pageSize ,Book book){
		try {
			if(null!=book.getBookTypeName() && !"".equals(book.getBookTypeName()) ){
				book.setBookTypeName("%"+book.getBookTypeName()+"%");
			}else{
				book.setBookTypeName(null);
			}
			if("0".equals(book.getParentTypeId())){
				book.setBookTypeId(null);
			}
			PagedResult<Book> pageResult = bookInfoService.queryBookItemPage(book,pageNumber, pageSize);
    	    return responseSuccess(pageResult);
    	} catch (Exception e) {
			return responseFail(e.getMessage());
		}
	
	}
	/**
	 * 图书类别
	 * 分页
	 */
	@RequestMapping(value="bookType/view.do" ,method=RequestMethod.POST)
	@ResponseBody
	public String getBookTypeView(Integer pageNumber,Integer pageSize,String bookTypeName){
		try {
			PagedResult<CommonCodeData> pageResult = bookInfoService.queryBookTypePage(bookTypeName, pageNumber, pageSize);
    	    return responseSuccess(pageResult);
    	} catch (Exception e) {
			return responseFail(e.getMessage());
		}
	
	}
	
	
	/**
	 * 图书条目 分页
	 * @param pageNumber
	 * @param pageSize
	 * @param book
	 * @return
	 */
	@RequestMapping(value="bookInfo/view.do" ,method=RequestMethod.POST)
	@ResponseBody
	public String getBookInfoView(Integer pageNumber,Integer pageSize ,BookInfo bookInfo){
		try {
			if(bookInfo!=null){
				if(null!=bookInfo.getBookNo() && !"".equals(bookInfo.getBookNo())){
					bookInfo.setBookNo("%"+bookInfo.getBookNo()+"%");
				}else{
					bookInfo.setBookNo(null);
				}
				
				if(null!=bookInfo.getBookName() && !"".equals(bookInfo.getBookName())){
					bookInfo.setBookName("%"+bookInfo.getBookName()+"%");
				}else{
					bookInfo.setBookName(null);
				}
				if(null==bookInfo.getBookStatus() || "".equals(bookInfo.getBookStatus()) || "null".equals(bookInfo.getBookStatus())){
					bookInfo.setBookStatus(null);
				}
			}
			PagedResult<BookInfo> pageResult = bookInfoService.queryBookInfoPage(bookInfo,pageNumber, pageSize);
    	    return responseSuccess(pageResult);
    	} catch (Exception e) {
			return responseFail(e.getMessage());
		}
	
	}
	/**
	 * 图书类别查看、编辑
	 */
	@RemoteMethod
	public String lookOrUpdateBookTypeInfo(Integer id){
		CommonCodeData codeData=commonCodeDataService.getCommonCodeDataById(id);
		return JSON.toJSONString(codeData);
		
	}
	

	/**
	 * 新增图书类别，检验是否存在相同类别代码和类别名
	 * 如果Type=insert 则新增，如果Type=update 则修改
	 * 
	 */
	@RemoteMethod
	public String validateBookTypeExsits(String commomCode,String commomCodeName,String Type,Integer id){
		CommonCodeData data=new CommonCodeData();
		data.setCommonCode(commomCode);
		data.setCommonCodeName(commomCodeName);
		CommonCodeData codeData=commonCodeDataService.getCodeDataByCodeAndName(data);
		if(codeData==null){
			data.setCategoryId(2);//该值固定
			if("insert".equals(Type)){
				//新增
				try {
					commonCodeDataService.insertCommonCodeDataInfo(data);
					return "0";//新增成功！
				} catch (Exception e) {
					return JSON.toJSONString("保存失败！"+e.getMessage());
				}
			}else if("update".equals(Type)){
				//修改
				if(id==null){return "传入的主键ID值为空！不能做修改操作！";}
				try {
					data.setId(id);
					int i=commonCodeDataService.updateByPrimaryKeySelective(data);
					return "0";
				} catch (Exception e) {
					return JSON.toJSONString("修改失败！"+e.getMessage());
				}
			}else if("delete".equals(Type)){
				//删除
				//1.检验该类别下是已有图书条目信息，如果有，则提示该类别下有图书信息，请先删除该类别下 的图书信息后再删除本类别
				try {
					if(bookInfoService.validateTypeHasBook(id)){
						return "该类别下有图书信息，请先删除该类别下 的图书信息后再删除本类别";
					}else{

						//2.否则删除
						int i=bookInfoService.deleteBookType(id);
						return "0";
					}
				} catch (Exception e) {
					return JSON.toJSONString("删除失败！"+e.getMessage());
				}
			}
			
		}
		return "已存在相同类别代码和类别名，请重新输入！";//存在
		//return JSON.toJSONString(codeData);
	}
	
	
	//获取图书类别
	@RemoteMethod
	public String getBookTypeList(Integer id){
		if(null==id || "".equals(id)){
			//获取所有图书类别
			java.util.List<CommonCodeData> BookTypelist=bookInfoService.getBookTypeList(2);
			return JSON.toJSONString(BookTypelist);
		}else{
			//根据id获取图书类别
			//TODO
		}
		
		return null;
		
	}
	
	/**
	 * 图书条目查看、编辑
	 */
	@RemoteMethod
	public String lookOrUpdateBookItemInfo(Integer id){
		Book book=bookInfoService.getOneBookItemById(id);
		return JSON.toJSONString(book);
		
	}
	
	
	/**
	 * 图书信息查看
	 */
	public String lookOrUpdateBookInfo(Integer id){
		BookInfo bookInfo=bookInfoService.getOneBookInfo(id);
		if(bookInfo==null){return "图书信息不存在";}
		return JSON.toJSONString(bookInfo);
	}
	
	/**
	 * 新增图书类别，检验是否存在相同类别代码和类别名
	 * 如果Type=insert 则新增，如果Type=update 则修改
	 * 
	 */
	@RemoteMethod
	public String validateBookTItemExsits(Integer parentTypeId,String bookTypeName,Integer bookSum,String Type,Integer id){
		Book book=new Book();
		book.setParentTypeId(parentTypeId);
		book.setBookTypeName(bookTypeName);
		book.setBookSum(bookSum);
		book.setIsUsing("1");
		book.setBookBorrowNum(0);
		if("insert".equals(Type)){
    		try {
    			if(bookInfoService.validateBookItem(book)){
    				//已存在相同类别、图书名的图书条目信息
    				return "已存在相同类别、图书名的图书条目信息，请重新输入！";//存在
    			}else{
    				//新增
    				bookInfoService.insertBookItemInfo(book);
    				return "0";
    			}
    		} catch (Exception e) {
    			return "新增失败！"+e.getMessage().toString();
    		}
		}else if("update".equals(Type)){
			if(null==id || "".equals(id)){
				return "id值为空！不能进行保存操作！";
			}else{
				try {
					if(bookInfoService.validateBookItem(book)){
						//已存在相同类别、图书名的图书条目信息
						return "已存在相同类别、图书名的图书条目信息，请重新输入！";//存在
					}else{
						//修改
						book.setBookTypeId(id);
						bookInfoService.updateBooItem(book);
						return "0";
					}
				} catch (Exception e) {
					return JSON.toJSONString("修改操作失败！"+e.getMessage().toString());
				}
			}
		}else if("delete".equals(Type)){
			//删除
			//1.检验该类别下是已有图书信息信息，如果有，则提示该类别下有图书信息，请先删除该类别下 的图书信息后再删除本条目
			try {
				int i=bookInfoService.getOneBookInfoByBooktypeId(id);
				if(i>0){
					return "该类别下有图书信息，请先删除该类别下 的图书信息后再删除本类别！";
				}else{
					//2.否则删除
					bookInfoService.deleteOneBookItem(id);
					return "0";
				}
			} catch (Exception e) {
				return JSON.toJSONString("删除失败！"+e.getMessage());
			}
			
		}
		return "已存在相同类别代码和类别名，请重新输入！";//存在
		//return JSON.toJSONString(codeData);
	}
	
	@RequestMapping(value="addBook",method=RequestMethod.GET)
	public String addBook(){
		return "book/addBook";
	}
	
	/**
	 *  新增图书
	 * @param bookInfo
	 * @param bookTypeId(当新增\删除时，为bookTypeId，编辑和时为图书bookId)
	 * @param Type
	 * @param request
	 * @return
	 */
	@RemoteMethod
	@Transactional(propagation=Propagation.REQUIRED,isolation=Isolation.READ_COMMITTED)
	public String validateBookNo(Map bookInfo,Integer bookTypeId ,String Type,HttpServletRequest request){
 		BookInfo book=new BookInfo();
		List<BookInfo> list=null;
		AdminInfo adminInfo=(AdminInfo) request.getSession().getAttribute("userInfo");
			if(!"deleteBook".equals(Type)){
				try {
					book=(BookInfo) JsonTools.convertMap(BookInfo.class, bookInfo);
				} catch (Exception e) {
					e.printStackTrace();
					return "map转对象转换失败bookInfo！";
				}
	    		if(book.getBookNo()!=null && !"".equals(book.getBookNo())){
	    			BookInfo validateBookInfo=new BookInfo();
	    			validateBookInfo.setBookNo(book.getBookNo());
	    			 list=bookInfoService.bookNoIsExists(validateBookInfo);
	    		}else{
	    			return "输入的图书编号为空";
	    		}
			}
		
		if("addBook".equals(Type)){
			if(list.size()==0){
				//图书编号不存在，新增
					book.setBookTypeId(bookTypeId);
					book.setBookJoinTime(new java.util.Date());
					book.setCreateById(adminInfo.getEmployeeId());
					book.setCreateByName(adminInfo.getEmployeeName());
					book.setCreateTime(new java.util.Date());
					book.setBookStatus("0");
					bookInfoService.insertBook(book);
					//对应的图书条目数量增加1
					Book book2=bookInfoService.getOneBookItemById(book.getBookTypeId());
					if(book2==null){throw new RuntimeException("图书条目不存在");}
					book2.setBookSum(book2.getBookSum()+1);
					bookInfoService.updateBooItem(book2);
					return "0";
			}else{
				return "图书编号已存在，请重新输入";
			}
		}else if("updateBook".equals(Type)){
			//修改
			book.setBookId(bookTypeId);
			//修改图书信息
			book.setLastUpdateId(adminInfo.getEmployeeId());
			book.setLastUpdateName(adminInfo.getEmployeeName());
			book.setLastUpdateTime(new java.util.Date());
			bookInfoService.updateBookInfo(book);
			return "0";
		}else if("deleteBook".equals(Type)){
			//删除
			Integer bookId=null;
			try {
				bookId=Integer.parseInt(bookInfo.get("bookId")+"");
			} catch (Exception e) {
				return "bookId未传入！";
			}
			bookInfoService.deleteBookInfo(bookId);
			//对应的图书条目数量-1
			Book book2=bookInfoService.getOneBookItemById(bookTypeId);
			if(book2==null){throw new RuntimeException("图书条目不存在");}
			book2.setBookSum(book2.getBookSum()-1);
			bookInfoService.updateBooItem(book2);
			return "0";
		}
		return null;
		
	}
	
}
