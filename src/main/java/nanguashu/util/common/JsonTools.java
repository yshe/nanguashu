package nanguashu.util.common;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;

public class JsonTools {

	public JsonTools() {
		// TODO Auto-generated constructor stub
	}

	public static String toJsonString(Object object) {
		return JSON.toJSONString(object);
	}

	public static <T> T getFastJsonObject(String jsonString, Class<T> cls) {
		T t = null;
		t = JSON.parseObject(jsonString, cls);
		return t;
	}

	public static Map<String, Object> getFastJsonMap(String json, Object Object) {
		Map<String, Object> map;
		map = JSON.parseObject(json, new TypeReference<Map<String, Object>>() {
		});
		return map;
	}

	public static <T> List<T> getFastJsonList(String jsonString, Class<T> cls) {
		List<T> list = new ArrayList<T>();
		try {
			list = JSON.parseArray(jsonString, cls);
		} catch (Exception e) {
		}
		return list;
	}

	/**
	 * Object 为String
	 * 
	 * @param jString
	 * @return
	 */
	public static List<Map<String, Object>> getlistMaps(String jString) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try {
			list = JSON.parseObject(jString,
					new TypeReference<List<Map<String, Object>>>() {
					});
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	
	
	  /** 
     * 将一个 Map 对象转化为一个 JavaBean 
     * @param type 要转化的类型 
     * @param map 包含属性值的 map 
     * @return 转化出来的 JavaBean 对象 
     * @throws IntrospectionException 
     *             如果分析类属性失败 
     * @throws IllegalAccessException 
     *             如果实例化 JavaBean 失败 
     * @throws InstantiationException 
     *             如果实例化 JavaBean 失败 
     * @throws InvocationTargetException 
     *             如果调用属性的 setter 方法失败 
     */ 
    public static Object convertMap(Class type, Map map) 
            throws IntrospectionException, IllegalAccessException, 
            InstantiationException, InvocationTargetException { 
        BeanInfo beanInfo = Introspector.getBeanInfo(type); // 获取类属性 
        Object obj = type.newInstance(); // 创建 JavaBean 对象 

        // 给 JavaBean 对象的属性赋值 
        PropertyDescriptor[] propertyDescriptors =  beanInfo.getPropertyDescriptors(); 
        for (int i = 0; i< propertyDescriptors.length; i++) { 
            PropertyDescriptor descriptor = propertyDescriptors[i]; 
            String propertyName = descriptor.getName(); 

            if (map.containsKey(propertyName)) { 
                // 下面一句可以 try 起来，这样当一个属性赋值失败的时候就不会影响其他属性赋值。 
                Object value = map.get(propertyName); 

                Object[] args = new Object[1]; 
                args[0] = value; 

                descriptor.getWriteMethod().invoke(obj, args); 
            } 
        } 
        return obj; 
    } 

    /** 
     * 将一个 JavaBean 对象转化为一个  Map 
     * @param bean 要转化的JavaBean 对象 
     * @return 转化出来的  Map 对象 
     * @throws IntrospectionException 如果分析类属性失败 
     * @throws IllegalAccessException 如果实例化 JavaBean 失败 
     * @throws InvocationTargetException 如果调用属性的 setter 方法失败 
     */ 
    public static Map convertBean(Object bean) 
            throws IntrospectionException, IllegalAccessException, InvocationTargetException { 
        Class type = bean.getClass(); 
        Map returnMap = new HashMap(); 
        BeanInfo beanInfo = Introspector.getBeanInfo(type); 

        PropertyDescriptor[] propertyDescriptors =  beanInfo.getPropertyDescriptors(); 
        for (int i = 0; i< propertyDescriptors.length; i++) { 
            PropertyDescriptor descriptor = propertyDescriptors[i]; 
            String propertyName = descriptor.getName(); 
            if (!propertyName.equals("class")) { 
                Method readMethod = descriptor.getReadMethod(); 
                Object result = readMethod.invoke(bean, new Object[0]); 
                if (result != null) { 
                    returnMap.put(propertyName, result); 
                } else { 
                    returnMap.put(propertyName, ""); 
                } 
            } 
        } 
        return returnMap; 
    } 
}
