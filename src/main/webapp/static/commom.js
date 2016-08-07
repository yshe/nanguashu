
//将JSP页面的信息在word中打开
/**
 * tId：table的Id属性值
 */
function outDoc(tId){
  var table=document.getElementById(tId);
  row=table.rows.length;
  column=table.rows(1).cells.length;
  var wdapp=new ActiveXObject("Word.Application");
  wdapp.visible=true;
  wddoc=wdapp.Documents.Add();  //添加新的文档
  thearray=new Array();
//将页面中表格的内容存放在数组中
for(i=0;i<row;i++){
	thearray[i]=new Array();
	for(j=0;j<column;j++){
          thearray[i][j]=table.rows(i).cells(j).innerHTML;
	}
}
var range = wddoc.Range(0,0);
range.Text="订单信息列表"+"\n";
wdapp.Application.Activedocument.Paragraphs.Add(range);
wdapp.Application.Activedocument.Paragraphs.Add();
rngcurrent=wdapp.Application.Activedocument.Paragraphs(3).Range;

var objTable=wddoc.Tables.Add(rngcurrent,row,column)     //插入表格
for(i=0;i<row;i++){
	for(j=0;j<column;j++){
	objTable.Cell(i+1,j+1).Range.Text = thearray[i][j].replace("&nbsp;","");
	}
}
wdapp.Application.ActiveDocument.SaveAs("orderInfo.doc",0,false,"",true,"",false,false,false,false,false);
wdapp.Application.Printout();
wdapp=null;
}


/**
 * 获取表单数据表单数据
 * 
 */
function getFormValue(form){
	for(i=0;i<form.length;i++){
	if(form.elements[i].value==""){
	alert("表单信息不能为空");
	return false;
}
}
}

function check(fformIdorm){
	var myform = document.getElementById(formId);		//获得form表单对象
	for(var i=0;i<myform.length;i++){		//循环form表单
		if(myform.elements[i].value==""){	//判断每一个元素是否为空
			alert(myform.elements[i].title+"不能为空！");
			myform.elements[i].focus();		//元素获得焦点
			return ;
		}
	}
	myform.submit();
}


//数据验证

/**
 * 日期验证正则表达式
 */
function CheckDate(str){
	var Expression=/^((((1[6-9]|[2-9]\d)\d{2})(\/|\-)(0?[13578]|1[02])(\/|\-)(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(\/|\-)(0?[13456789]|1[012])(\/|\-)(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})(\/|\-)0?2(\/|\-)(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/; 
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
		return true;
	}else{
		return false;
	}
}

/**
 * 校验日期格式是否正确 
 * @param dateStr
 * @returns {Boolean}
 */
function checkDate(dateStr){
	//var mydate = document.getElementById("mydate");
	if(dateStr==""||dateStr==null){
		return false;
	}
	else{
		if(dateStr.indexOf("-")!=-1){
			var dateArr = dateStr.split("-");
			var year = dateArr[0];//提取年份
			var month = dateArr[1];//提取月份
			var day = dateArr[2];//提取日
			//如果年份、月份、日期 不是数字或者<=0，返回false
			if(isNaN(year)||year<=0){					
				return false;
			}
			if(isNaN(month)||month<=0||month>12){	
				return false;
			}
			if(isNaN(day)||day<=0||day>31){
				
				return false;
			}
			//年份能被4整除并且不能被100整除，或者能被400整除，则为闰年
			if((year%4==0&&year%100!=0)||(year%400==0)){
				if(month==2){//闰年的2月 
					if(day>29){
						return false;
					}
				}
			}else{//不是闰年的2月 
				if(month==2){
					if(day>28){
						return false;
					}
				}
			}
			//1、3、5、7、8、10、12月份为31天 
			var m1 = new Array(1,3,5,7,8,10,12);
			for(var i=0;i<m1.length;i++){
				if(parseInt(month)==m1[i]){
					if(day>31){
						 return false;
					}
				}
			}
			//4、6、9、12月份为31天 
			var m2 = new Array(4,6,9,11);
			for(var j=0;j<m2.length;j++){
				if(parseInt(month)==m2[j]){
					if(day>30){
						 return false;
					}
				}
			}
		}else{
			return false;
		}
	}
	return true;
}


//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
function isTel(s)
{
    //var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;
    var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if (!patrn.exec(s)) return false;
    return true;
}

//校验手机号码：必须以数字开头，除数字外，可含有“-”
function isMobil(s)
{
    var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if (!patrn.exec(s)) return false;
    return true;
}

//校验邮政编码
function isPostalCode(s)
{
    //var patrn=/^[a-zA-Z0-9]{3,12}$/;
    var patrn=/^[a-zA-Z0-9 ]{3,12}$/;
    if (!patrn.exec(s)) return false;
    return true;
}
//校验邮箱
function checkEmail(inputEmailId){
	var email = document.getElementById(inputEmailId);
	if(email.value==null||email.value==""){//判断文本框是否为空 
		alert("请输入E-mail地址！");
		email.focus();
		return;
	}
	var regExpression = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var objExp = new RegExp(regExpression);	//创建正则表达式对象 
	if(objExp.test(email.value)==false){	//通过 test()函数测试字符串是否与表达式的模式匹配 
		alert("您输入的E-mail地址不正确！");
		email.focus();						//使文本框获得焦点 
		return;								
	}

}


//检验字符串是否为汉字
function checkRealName(realName){
	//var realName = document.getElementById("");
	var regExpression = /[\u4E00-\u9FA5]/; //汉字的unicode编码范围
	if(!regExpression.test(realName.value)){	
		alert("您输入的真实姓名不正确 ，必须为汉字！");
		realName.focus();						
		return;								
	}
	//document.getElementById("myform").submit();
}

//验证身份证号码
function checkIDCard(IDCard){
	//var IDCard = document.getElementById("IDCard");	
	//验证15位身份证号码
	var regIDCard_15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; 
	//验证18位身份证号码 
	var regIDCard_18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[\d|x|X]$/; 
	if(IDCard.value.length!=15&&IDCard.value.length!=18){
		alert("您输入的身份证号码长度不对，请输入15位或18位的身份证号码！");
		IDCard.focus();						
		return;		
	}else{
		if(IDCard.value.length==15){//验证15位的身份证号码 
			if(!regIDCard_15.test(IDCard.value)){	
				alert("您输入的身份证号码有误！");
				IDCard.focus();						
				return;								
			}
		}
		if(IDCard.value.length==18){//验证18位的身份证号码 
			if(!regIDCard_18.test(IDCard.value)){
				alert("您输入的身份证号码有误！");
				IDCard.focus();						
				return;		
			}
		}
	}
		//document.getElementById("myform").submit();
}

//验证车牌号码
function checkNumberPlate(numberPlate){
	var date =new Date();
	alert(date.getYear());
	var numberPlate = document.getElementById(numberPlate); 
	var shortProvince = new Array ("京","沪","津","渝","冀","晋","蒙",
	"辽","吉","黑","苏","浙","皖","闽","赣","鲁","豫","鄂","湘","粤","桂",
	"琼","川","贵","云","藏","陕","甘","青","宁","新");
	if(numberPlate.value==""||numberPlate.value==null){//验证是否为空 
		alert("请输入车牌号码！");
		numberPlate.focus();
		return;
	}
	var str = numberPlate.value.substring(0,1);	//截取车牌号的首字符 
	var res = false;
	for(var i=0;i<shortProvince.length;i++){	//循环判断输入的车牌号首字符是否在指定的省份内 
		if(str==shortProvince[i].toString()){
			res = true;							//在指定简写省份名称范围内 
		}
	}	
	//验证普通的车牌号码 ： 吉A-E1234,吉A-EE123,吉A-12345,吉A-6A123
	var regExpression1 = /^[\u4e00-\u9fa5][a-zA-Z]-[0-9A-Za-z]{3}\d{2}$/;
	//验证车牌号尾号为字母的表达式 
	var regExpression2 = /^[\u4e00-\u9fa5][a-zA-Z]-\d{4}[a-zA-Z]$/;
	if(!regExpression1.test(numberPlate.value)&&!regExpression2.test(numberPlate.value)){
		alert("您输入的车牌号码有误！");
		numberPlate.focus();
		return;
	}else{//如果符合规则 ，判断首字符是否为各省级名称的简写 
		if(!res){
			alert("您输入的车牌号码有误，首字符无效！");
			numberPlate.focus();
			return;
		}
	}
	document.getElementById("myform").submit();	
}
function aa(){
	var brand = document.getElementById("brand").value;
	document.getElementById("brand").value=brand.replace(/^[\u4e00-\u9fa5]$/g,"");

}


//验证网站地址是否有效
function checkNetURL(){
	var netURL = document.getElementById("netURL"); 
	var regStr = "^((https|http|ftp|rtsp|mms)?://)?"    	//域名之前的协议字符串可以出现一次或不出现  
                + "(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@   
                + "(([0-9]{1,3}\.){3}[0-9]{1,3}" 		// 验证IP形式的URL，如：192.168.10.16    
                + "|" 									// 输入的可以是IP或域名   
                + "([0-9a-zA-Z_!~*'()-]+\.)*" 			// 验证域名  www.   
                + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 验证二级域名   
                + "[a-zA-Z]{2,6})(:[0-9]{1,4})?" 		// 域名中可能包含端口    
                + "((/?)|"    
                + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";   
	var re=new RegExp(regStr);  						//创建正则表达式对象  
	if(!re.test(netURL.value)){							//验证输入的字符串是否符合规则
		alert("您输入的网站URL地址有误！");
		netURL.focus();
		return;
	}
	document.getElementById("myform").submit();	
}


////验证数量和金额
function checkInsert(){
	var number = document.getElementById("number");	//数量文本框对象
	var price = document.getElementById("price");	//单价文本框对象
	var regExp2 = /^[1-9]+(\d*)$/;					//验证数量的正则表达式
	if(isNaN(price.value)){							//验证单价是否为数字
		alert("您输入的单价不是有效值！");
		price.focus();
		return false;
	}
	if(number.value!=null&&number.value!=""){
		if(!regExp2.test(number.value)){			//验证数量是否符合正则表达式
			alert("数量必须为正整数！");
			number.focus();
			return false;
		}
	}
	return true;
}


//验证字符串是否以指定字符开头
function checkStr(){
	var startStr = document.getElementById("startStr").value;
	var str = document.getElementById("str").value;
	var regExp=eval("/^"+startStr+"/");	//使用eval()方法使JavaScript动态执行 
	if(startStr==""){		//验证输入的字符串是否为空
		alert("请输入字符串的起始字符！");
		document.getElementById("startStr").focus();
		return false;
	}
	if(str==""){			//验证输入的字符串是否为空
		alert("请输入要判断的字符串！");
		document.getElementById("str").focus();
		return false;
	}
	if(!regExp.test(str)){	//验证字符串是否以制定字符开头
		alert("指定的字符串不是以 ["+startStr+"] 开头！");
		return false;
	}else{
		alert("指定的字符串是以 ["+startStr+"] 开头！");
		return true;
	}
	return true;
}

/**
*限制输入字符串的长度
*@ str：要判断的字符串 
*@ limitLength：限制的长度
*/
function checkStrLength(str,limitLength){
	var n=0;							//该变量保存字符串的长度
	for(var i=0;i<str.length;i++){
		var code = str.charCodeAt(i);//获得每个字符的Unicode值 
		if(code>255){
			n=n+2;
		}
		else{
			n=n+1;
		}
	}
	if(n>limitLength){	//如果字符串的长度大于限制长度，返回false
		return false;
	}
	return true;
}

//验证字符串是否包含特殊字符
function checkEspecialCode(str){
	var regExpress = /[\'\"\\<>;&=#]/; 	//特殊字符正则表达式
	if(regExpress.test(str)){			//测试字符串是否包含指定的特殊字符
		return false;
	}
	return true;
}


//限制不允许输入中文字符
function checkCN(str){
	if (escape(str).indexOf("%u")<0){//indexOf()方法查找字符串是否包含"\u" ,如果不包含返回-1
		return true;
	} else {
		return false;
	}
}

//小写金额转换为大写
function convert(){
	var money_num = document.getElementById("money_num").value;
	if(money_num==""){
		alert("请输入金额！");
		document.getElementById("money_num").focus();
		return;
	}
	if(isNaN(money_num)){
		alert("请输入数字类型的金额 !");
		return;
	}
	if(money_num>999999999999){
		alert("您输入的金额不能大于999999999999!");
		return;
	}
	//将小数点后保留两位小数
	if(money_num.indexOf(".")>0){
		var decimalStr = money_num.split(".");
		if(decimalStr[1].length>2){
			decimalStr[1]=decimalStr[1].substr(0,2);
		}
		money_num = decimalStr[0]+"."+decimalStr[1];
	}
	value=change(money_num); //调用自定义函数转换
	document.getElementById("money_cn").value=value;  //将转换后的值赋给文本框
}

function change(str){
	je="零壹贰叁肆伍陆柒捌玖";			//大写的数字（0-9）
	cdw="万仟佰拾亿仟佰拾万仟佰拾元角分";	//金额单位
	var newstring=(str*100).toString();	//将金额值乘以100
	newstringlog=newstring.length;		//乘以100之后的金额的长度
	newdw=cdw.substr(cdw.length-newstringlog);
	num0=0;     	//记录零的个数
	wan=0;     		//记录万位出现的次数
	dxje="";     	//记录大写金额
	for(m=1;m<newstringlog+1;m++){
		xzf=newstring.substr(m-1,1);   
		dzf=je.substr(xzf,1);
		dw=newdw.substr(m-1,1);
		if(dzf=="零"){
			dzf="";
		if(dw=="亿"){
		}else if(dw=="万"){
			dzf="";
			wan=1; 
		}else if(dw=="元"){

		}else{
			dw="";	//记录单位		
		}
		num0=num0+1;
		}else{
			if(num0-wan>0){
				if(dw!="角"){
				dzf="零"+dzf;
				}
			}
			num0=0;

		}
		dxje=dxje+dzf+dw;
	}
	if(newstring.length!=1){
		if(newstring.substr(newstring.length-2)=="00"){
			dxje=dxje+"整";
		}else{
			dxje=dxje;
		}
	}
	return dxje;
} 


//去掉字符左右空格
function trim(str){	
	var regExp = /(^\s*)|(\s*$)/g; //验证左右空格的正则表达式 
	str = str.replace(regExp,"");  //去掉字符串的左右空格
	return str;
}

/**
*格式化数字
*@number ：要格式化的数字
*@len：格式长度 
*@return ：返回格式化后的数字
*/
function formatNum(number,len){
	var strLength = len - number.length;//格式长度减去数字的长度，就是数字前补"0"的个数
	for(var i=0; i<strLength;i++){
		number = "0"+number;
	}
	return number;
}

//限制文本域内容的长度
function limitTextarea(){
	var max=20;//最多可输入20个字符，中文占2个字节 
	var areaStr = document.getElementById("str").value;
	var temp=0;
	for(var i=0;i<areaStr.length;i++){		//可能包含中文，需要循环判断 
		var code = areaStr.charCodeAt(i);	//转换为Unicode值 
		if(code>255){						//大于255的为中文字符
			temp=temp+2;
		}
		else{
			temp=temp+1;
		}
		if(temp>max){						//如果字符长度超过指定长度，跳出循环 
			break;
		}
	}	
	document.getElementById("str").value=areaStr.substring(0,i);
	document.getElementById("now_len").innerHTML = temp;//当前输入的字符长度
	document.getElementById("remainder_len").innerHTML = max-temp;//剩余字符长度	
	
}
//将长数字分位显示
function compart(lang_num){
	var result=0;	//保存分位后的结果 
	var dec="";		//保存小数点后的数字 
	if(lang_num<4){	//如果小于4位，直接返回 
		result = lang_num;
	}
	else{			//如果大于4位 
		var decimal = lang_num.indexOf(".");	//是否包含小数 
		var temp="";//保存整数部分的分位字符串 
		var res="";	//保存没有分位的整数 
		if(decimal>0){//如果包含小数 
			dec=lang_num.substr(decimal);		//截取小数点后的值
			res=lang_num.substr(0,decimal);		//截取小数点前的整数值
		}else{		//如果不存在小数部分 
			res=lang_num;
		}
		for(var i=res.length;i>0;i=i-3){	//循环整数 ，从整数的个位开始循环 
			if(i-3>0){	//每隔3位加一个逗号 
				temp=","+res.substr(i-3,3)+temp;
			}
			else{		//少于3位时的情况 
				temp=res.substr(0,i)+temp
			}
		}
		result =temp+dec;
	}
	return result;
}


//将RGB格式的颜色值转换为十六进制
function toHex(r,g,b){
	//如果R、G、B的值为空，修改为0
	if(r==""){
		r=0;
	}
	if(g==""){
		g=0;
	}
	if(b==""){
		b=0;
	}
	var red = parseInt(r).toString(16);		//R值的16进制字符串
	if(red.length<2){						//少于2位 ， 补0
		red="0"+red;
	}
	var green = parseInt(g).toString(16);	//G值的16进制字符串
	if(green.length<2){						//少于2位 ， 补0
		green="0"+green;
	}
	var blue = parseInt(b).toString(16);	//B值的16进制字符串
	if(blue.length<2){						//少于2位 ， 补0
		blue="0"+blue;
	}
	return "#"+red+green+blue;				//组合成一个RGB颜色字符串 
}


//从指定URL中提取文件名

function getFileName(url){
	var regExp = /(.*\/)*([^.]+).*/ig;
	url = url.replace(regExp,"$2");
	return url;
}



	/**
	*计算两个日期相差的天数
	*@date1：日期类型的字符串（yyyy-mm-dd） 
	*@date2：日期类相的字符串 （yyyy-mm-dd）
	*@return：返回日期天数差 
	*/
	function getDays(date1,date2){
		var date1Str = date1.split("-");//将日期字符串分隔为数组，数组元素分别为年、月、日  	
		//根据年、月、日的值创建Date对象
		var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
		var date2Str = date2.split("-");
		var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
		var t1 = date1Obj.getTime();//返回从1970-1-1开始计算到Date对象中的时间之间的毫秒数
		var t2 = date2Obj.getTime();//返回从1970-1-1开始计算到Date对象中的时间之间的毫秒数
		var datetime=1000*60*60*24;	//一天时间的毫秒值 
		var minusDays = Math.floor(((t2-t1)/datetime));//计算出两个日期天数差 
		var days = Math.abs(minusDays);//如果结果为负数，取绝对值
		return days;
		
	}
	
	

	
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	/**
	*计算两个日期相差的小时数 
	*@date1：日期类型的字符串（yyyy-mm-dd） 
	*@date2：日期类相的字符串 （yyyy-mm-dd）
	*@return：返回两个日期相差的小时数  
	*/
	function getMinusHours(date1,date2){
		var date1Str = date1.split("-");//将日期字符串分隔为数组，数组元素分别为年、月、日  	
		//根据年、月、日的值创建Date对象
		var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
		var date2Str = date2.split("-");
		var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
		var t1 = date1Obj.getTime();//返回从1970-1-1开始计算到Date对象中的时间之间的毫秒数
		var t2 = date2Obj.getTime();//返回从1970-1-1开始计算到Date对象中的时间之间的毫秒数
		var datetime=1000*60*60*24;	//一天时间的毫秒值 
		var minusDays = Math.floor(((t2-t1)/datetime));//计算出两个日期天数差 
		var days = Math.abs(minusDays);	//如果结果为负数，取绝对值
		var minusHours = days*24;		
		return minusHours;
	}

/**
*计算某一天是星期几
*@date：日期类型的字符串（yyyy-mm-dd） 
*@return：返回星期值   
*/
function getWeekByDate(date){
	var dateStr = date.split("-");//将日期字符串分隔为数组，数组元素分别为年、月、日  	
	//根据年、月、日的值创建Date对象
	var dateObj = new Date(dateStr[0],(dateStr[1]-1),dateStr[2]);
	var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	return weeks[dateObj.getDay()];
}

/**
*显示长日期格式的系统日期
*/
function getLangDate(){
	var dateObj = new Date();			//表示当前系统时间的Date对象 
	var year = dateObj.getFullYear();	//当前系统时间的完整年份值
	var month = dateObj.getMonth()+1;	//当前系统时间的月份值 
	var date = dateObj.getDate();		//当前系统时间的月份中的日
	var day = dateObj.getDay();			//当前系统时间中的星期值
	var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var week = weeks[day];				//根据星期值，从数组中获取对应的星期字符串 
	if(month<10){
		month="0"+month;
	}
	if(date<10){
		date="0"+date;
	}
	var newDate = year+"年"+month+"月"+date+"日  "+week;
	document.getElementById("dateStr").innerHTML = newDate;
}	
	
/**
*实时显示系统时间
*/
function getLangDate(){
	var dateObj = new Date();			//表示当前系统时间的Date对象 
	var year = dateObj.getFullYear();	//当前系统时间的完整年份值
	var month = dateObj.getMonth()+1;	//当前系统时间的月份值 
	var date = dateObj.getDate();		//当前系统时间的月份中的日
	var day = dateObj.getDay();			//当前系统时间中的星期值
	var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var week = weeks[day];				//根据星期值，从数组中获取对应的星期字符串 
	var hour = dateObj.getHours();		//当前系统时间的小时值 
	var minute = dateObj.getMinutes();	//当前系统时间的分钟值
	var second = dateObj.getSeconds();	//当前系统时间的秒钟值
	//如果月、日、小时、分、秒的值小于10，在前面补0
	if(month<10){
		month = "0"+month;
	}
	if(date<10){
		date = "0"+date;
	}
	if(hour<10){
		hour = "0"+hour;
	}
	if(minute<10){
		minute = "0"+minute;
	}
	if(second<10){
		second = "0"+second;
	}

	var newDate = year+"年"+month+"月"+date+"日  "+week+" "+hour+":"+minute+":"+second;
	document.getElementById("dateStr").innerHTML = "系统公告：[ "+newDate+" ]";
	//setTimeout("getLangDate()",1000);//每隔1秒重新调用一次 
	window.setInterval("getLangDate()", 1000);
}	
/**
*事件倒计时
*@title：事件的名称  
*@eventDate：事件的日期
*/
function countDown(title,eventDate){
	var dateObj = new Date();		//当前系统时间的Date对象 
	var dateStr = eventDate.split("-");
	var eventDateObj = new Date(dateStr[0],(dateStr[1]-1),dateStr[2]);//某一日期的Date对象 
	var t1 = dateObj.getTime();		//从 1970 年 1 月 1 日开始计算到 Date 对象中的时间之间的毫秒数
	var t2 = eventDateObj.getTime();//从 1970 年 1 月 1 日开始计算到 Date 对象中的时间之间的毫秒数
	var datetime=24*60*60*1000;		//一天的毫秒值 
	var days = Math.floor((t2-t1)/datetime)+1;//相差的天数 	
	if(days>0){
		document.getElementById("day_str").innerHTML="距"+title+"开幕还有"+days+"天！";
	}
	if(days==0){
		document.getElementById("day_str").innerHTML="今天是"+title+"开幕日！";
	}
	if(days<0){
		days =Math.abs(days)+1;
		document.getElementById("day_str").innerHTML="今天是"+title+"第"+days+"个比赛日！";
	}	
	setTimeout("countDown('2010南非世界杯','2010-6-11')",datetime);//每个一天调用一次本函数，刷新显示时间
}
//创建节点
function createInput(){
	var element = document.createElement("input");	
	element.value="创建的文本框元素";
	document.getElementById("test").appendChild(element);
}

//添加节点
function createDiv(){
	var element = document.createElement("div");
	element.innerHTML="这就是添加的节点";
	document.getElementById("test").appendChild(element);
}


//为下拉列表增加选项
function createSelect(){
	var selectObj = document.createElement("select");
	var str = ["吉林","辽宁","黑龙江","北京","上海","天津","河南","河北","山东","山西","江苏","安徽","云南"];
	for(var i=0;i<10;i++){
		var op = document.createElement("option");
		op.innerHTML=str[i];
		selectObj.appendChild(op);
	}
	document.getElementById("test").appendChild(selectObj);
}
//删除下拉列表的选项
function del(){
	var selectObj = document.getElementById("show");
	selectObj.remove(selectObj.length-1);
}
//添加下拉列表的选项
function add(){
	var selectObj = document.getElementById("show");
	var op = document.createElement("option");
	op.innerHTML = document.getElementById("opValue").value;
	selectObj.appendChild(op);
}

//移除所有下拉框中的值
function removeAllSelects(){
	var selects=document.getElementById("mySelect");
	for(var i=selects.options.length-1;i>=0;i--)
	selects.options.remove(i);
}
function removeAllSelects2(){
	document.getElementById("mySelect").innerHTML = "";
}
//动态删除select中的所有options：  
function delAllOptions(){  
      document.getElementById("mySelect").options.length=0;   
}  
//动态删除select中的某一项option：   
function delOneOption(indx){ 
alert("hello"); 
      document.getElementById("mySelect").options.remove(indx);   
}  
//动态添加select中的项option:   
function addOneOption(){  
      //document.getElementById("user_dm").options.add(new Option(2,"mytest"));   
     
   var selectObj=document.getElementById("mySelect");  

   selectObj.options[selectObj.length] = new Option("mytest", "2");  
}  
//select多选,获取多个值
function selectMultiple(){
var temp = document.getElementById("multiples");  

  var str = "";  
  for(i=0;i<temp.length;i++){     
                if(temp.options[i].selected){  
                    str+=temp.options[i].value+",";  
                }  
            }  
  alert( str.substr(0,str.length-1) );  
}
//checkbox多选
function checkbox(){
	alert("hello");
	var str=document.getElementsByName("box");
	var objarray=str.length;
	var chestr="";
	for (i=0;i<objarray;i++){
		if(str[i].checked == true)
			alert(str[i].value);
	}
}
//radio选中
function radioChoice(){
	var obj=document.getElementsByName("radio");
	for (var i = obj.length - 1; i >= 0; i--) {
		if (obj[i].checked) {
			alert(obj[i].value);
		}
	};
}

