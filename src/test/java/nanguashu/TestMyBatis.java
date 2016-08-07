package nanguashu;
import javax.annotation.Resource;

import nanguashu.pojo.Book;
import nanguashu.pojo.UserInfo;
import nanguashu.service.BookInfoService;
import nanguashu.service.IUserService;
import nanguashu.util.common.page.PagedResult;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;

@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类  
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})  
public class TestMyBatis {
	private static Logger logger=Logger.getLogger(TestMyBatis.class);
	@Resource
	private BookInfoService bookInfoService;
	@Resource
	private IUserService userService=null;
//	private ApplicationContext ac=null;
//	@org.junit.Before
//	public void Before(){
//		ac=new ClassPathXmlApplicationContext("applicationContext.xml");
//		userService = (IUserService) ac.getBean("userService");  
	//}
	
	@Test
	public void test1(){
		UserInfo userInfo=userService.getUserById(1);
		logger.info(JSON.toJSONString(userInfo));
	}
	
	@Test
	public void queryByPage(){
		 PagedResult<Book>  pagedResult = bookInfoService.queryBookItemPage(new Book(), 1, 2);
		 logger.debug("查找结果" + pagedResult);
		 System.out.println(pagedResult);
	}
}
