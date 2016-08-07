package nanguashu;

import javax.annotation.Resource;

import nanguashu.page.SpringTestCase;
import nanguashu.pojo.Book;
import nanguashu.service.BookInfoService;
import nanguashu.util.common.page.PagedResult;

import org.apache.log4j.Logger;
import org.junit.Test;

/**
 * 功能概要：UserService单元测试
 * 
 * @author linbingwen
 * @since  2015年9月28日 
 */
public class UserServiceTest extends SpringTestCase	{
	
	@Resource
	private BookInfoService bookInfoService;
	
	Logger logger = Logger.getLogger(UserServiceTest.class);
	
	
	
	/**
	 * 分页测试
	 * @author linbingwen
	 * @since  2015年10月22日
	 */
	@Test
	public void queryByPage(){
		 PagedResult<Book>  pagedResult = bookInfoService.queryBookItemPage(new Book(), 1, 2);
		 logger.debug("查找结果" + pagedResult);
	}
	

}
