/**
 * Created by yabushan on 2016/1/1.
 */
//获取元素
function $DG(eleId){
    return document.getElementById(eleId);
}

//存在该对象
function hasThis(obj){
    try{
        if(obj == null || typeof(obj) == 'undefined'){
            return false;
        }
        return true;
    }catch(e){
        return false;
    }
}
//弹出所选元素的属性：undefined、、、、、、等
function ShowObjProperty(Obj)
{
    var PropertyList='';
    var PropertyCount=0;
    for(i in Obj){
        if(Obj.i !=null)
            PropertyList=PropertyList+i+'属性：'+Obj.i+'\t';
        else if(Obj[i])
            PropertyList=PropertyList+i+'[]\t';
        else if(Obj[PropertyCount])
            PropertyList=PropertyList+i+'[index]\t';
        else
            PropertyList=PropertyList+i+'未知\t';
        PropertyCount++;
    }
    alert(PropertyList);

}


//showDialog自适应宽高.
function changeDialogSize(widthAdd,heighAdd){
//	debug(parent.isParentChangedDialogSize);
    if (parent.isParentChangedDialogSize) { return ; }
    isParentChangedDialogSize = true;
    var width = 0;
    var heigth = 58;
    if(widthAdd) width = widthAdd;
    if(heighAdd) heigth = heighAdd;
    window.dialogWidth = (document.body.scrollWidth + width) + "px";
    window.dialogHeight = (document.body.scrollHeight + heigth) + "px";
    window.dialogLeft = ((window.screen.availWidth - document.body.clientWidth) / 2) + "px";
    window.dialogTop = ((window.screen.availHeight - document.body.clientHeight) / 2) + "px";

    //补上这一句,窗口会有动态效果
//	if (window.parent){
//		window.parent.changeDialogSize(widthAdd,heighAdd);
//	}
}


//showDialog自适应宽高.设置最小宽、高度
function changeDialogSizeMin(widthMin,heighMin){
    if (parent.isParentChangedDialogSize) { return ; }
    isParentChangedDialogSize = true;
    var width = 450;
    var heigth = 350;
    if(widthMin) width = widthMin;
    if(heighMin) heigth = heighMin;
    //设置宽度
    if(document.body.scrollWidth<width){
        window.dialogWidth = width + "px";
    }else{
        window.dialogWidth = document.body.scrollWidth + "px";
    }
    //设置高度
    if(document.body.scrollHeight<heigth){
        window.dialogHeight = heigth + "px";
    }else{
        window.dialogHeight = (document.body.scrollHeight+43) + "px";
    }
    window.dialogLeft = ((window.screen.availWidth - document.body.clientWidth) / 2) + "px";
    window.dialogTop = ((window.screen.availHeight - document.body.clientHeight) / 2) + "px";

//	if (window.parent){
//		window.parent.changeDialogSizeMin(widthMin,heighMin);
//	}
}


//打开模式对话框
function showMD(url, width, height, params, dialogParams){
    if (!hasThis(width)) { width = 580; }
    if (!hasThis(height)) { height = 520; }
    if (!hasThis(params)) { params = {}; }
    if (!hasThis(dialogParams)) { dialogParams = 'status:0; help:0'; }

    //TODO : 防止页面缓存的处理，目前简单的增加了时间参数，保证每次打开的URL都不一样
    var time = new Date();
    if(url.indexOf('?') > 0){
        url = url + '&clear_cache_time=' + time;
    }else{
        url = url + '?clear_cache_time=' + time;
    }

    var result = window.showModalDialog(url, params,
        'dialogWidth:' + width + 'px; dialogHeight:' + height + 'px; ' + dialogParams);
    try{
        if(result=='period_refresh'){
            window.location=window.location;
        }
    }catch(e){
    }

    return result;
}


//控制列表按钮是否可用
function set_btn_useable(btn_ids, useable)
{
    if (!btn_ids){
        return;
    }
    var arr = btn_ids.split(',');
//	debug(arr.length);
    for (var i = 0; i < arr.length; i++){
//		debug(arr[i]);
        var ele = $DG(arr[i]);
        if (!ele){
            continue;
        }
        if (useable){
//			$DG(arr[i]).style.display = '';
            ele.disabled = '';
        }else{
//			$DG(arr[i]).style.display = 'none';
            ele.disabled = 'disabled';
        }
    }
}

//控制列表只显示可用按钮
function btn_useable(btn_ids, useable)
{
    if (!$DG('wtc_btn_bar')){
        return;
    }
    var arr = $DG('wtc_btn_bar').getElementsByTagName('input');
    for (var i = 0; i < arr.length; i++){
//		arr[i].style.display = 'none';
        arr[i].disabled = 'disabled';
    }
//	debug(btn_ids);
//	debug($DG(btn_ids));
    if (btn_ids && $DG(btn_ids)){
        if(useable == false){
            set_btn_useable($DG(btn_ids).value, false);
        }else{
            set_btn_useable($DG(btn_ids).value, true);
        }
    }
}

//判断数组中是否包括obj值
function is_in_array(arr, obj)
{
    if (arr){
        for (var i = 0; i < arr.length; i++){
            if (arr[i] == obj){
                return true;
            }
        }
    }
    return false;
}


//使用 separator 作为间隔符，将 targetString 和 addString 两个字符串连接起来，并返回 targetString
function uniteTwoStringBySemicolon(targetString,addString,separator) {
    if(typeof(separator) == "undefined" || separator == "" ){
        separator = ";" ;
    }
    if (addString != 'undefined' && addString != "") {
        if (targetString == "") {
            targetString = addString;
        } else {
            targetString = targetString + separator + addString;
        }
    }
    return targetString;
}

//返回选择的下拉框的option
function getSelectdOption(id){
    var options=document.getElementById(id).options;
    for(var i=0;i<options.length;i++){
        if(options[i].selected==true){
            return options[i];
        }
    }
}

//根据selectValue设定列表框的选中行
function setSelectedOption(sourceBoxName, selectValue ){
    var sourceBox = document.getElementById(sourceBoxName);
    if (isNotEmpty(selectValue)) {
        for (i = 0; i < sourceBox.options.length; i++) {
            if (sourceBox.options[i].value == selectValue) {
                sourceBox.selectedIndex = i;
                return;
            }
        }
    }
}


//两个列表框sourceBoxName，destinationBoxName，将sourceBoxName框中选中项添加到destinationBoxName框
function addSelectedOption(sourceBoxName, destinationBoxName ){
    var sourceBox = document.getElementById(sourceBoxName);
    var destinationBox = document.getElementById(destinationBoxName);
    if (sourceBox.selectedIndex != -1) {
        for (i = 0; i < sourceBox.options.length; i++) {
            if (sourceBox.options[i].selected) {
                destinationBox.options[destinationBox.options.length] = new Option(
                    sourceBox.options[i].text, sourceBox.options[i].value);
            }
        }
    }

    distinctBox(destinationBoxName);
}

//两个列表框sourceBoxName，destinationBoxName，将sourceBoxName框中所有项添加到destinationBoxName框
function addAllOption(sourceBoxName, destinationBoxName ){
    var sourceBox = document.getElementById(sourceBoxName);
    var destinationBox = document.getElementById(destinationBoxName);
    var n = sourceBox.options.length;

    for (i = 0; i < n; i++) {
        destinationBox.options
            [destinationBox.options.length] = new Option(sourceBox.options[i].text, sourceBox.options[i]
            .value);
    }

    distinctBox(destinationBoxName);
}

//对下拉框boxName删除重复项
function distinctBox(boxName) {
    var boxObj = document.getElementById(boxName);
    var boxLength = boxObj.options.length;

    if (boxLength <= 1) {
        return;
    }

    var arrId   = new Array();
    var arrName = new Array();
    var i;
    var j;
    var bFound;

    for (i = 0; i < boxLength; i++) {
        var curId   = boxObj.options[i].value;
        var curName = boxObj.options[i].text;

        bFound = false;

        for (j = 0; j < arrId.length; j++) {
            if (arrId[j] == curId) {
                bFound = true;

                break;
            }
        }

        if (!bFound) {
            arrId.push(curId);
            arrName.push(curName);
        }
    }

    //refill box
    boxObj.options.length = 0;

    for (i = 0; i < arrId.length; i++) {
        boxObj.options[i] = new Option(arrName[i], arrId[i]);
    }
}

//将 destinationBoxField 框中选中项删除
function moveSelectedOption(destinationBoxField){
    var orgDeptBox = document.getElementById(destinationBoxField);
    var i;
    var j;
    var n;

    j = orgDeptBox.options.length - 1;

    if (j < 0) {
        j = 0;
    }

    var arrId   = new Array(j);
    var arrName = new Array(j);

    j = 0;

    for (i = 0; i < orgDeptBox.options.length; i++) {
        if (orgDeptBox.options[i].selected == false) {
            arrId[j] = orgDeptBox.options[i].value;
            arrName[j] = orgDeptBox.options[i].text;
            j++;
        }
    }

    n = orgDeptBox.options.length;

    for (i = n; i >= 0; i--) {
        orgDeptBox.options[i] = null;
    }

    for (i = 0; i < j; i++) {
        orgDeptBox.options[i] = new Option(arrName[i], arrId[i]);
    }

}

//将 destinationBoxField 框中所有项删除
function removeAllOption(destinationBoxField){
    var selectElement = document.getElementById(destinationBoxField);
    var totalOptions = selectElement.options.length;
    for(var i=0; i<totalOptions; i++){
        selectElement.options.remove(0);
    }
}

//删除选中的option
function removeSelectOption(obj){
    if(obj.tagName=='SELECT'){
        for(var i=obj.options.length-1;i>=0;i--){
            if(obj.options[i].selected==true){
                obj.remove(i);
            }
        }
    }
}

//给 selectList 的赋值
function setValueOfOptions(selectListId, ValueList, TextList){
    var optionLength = ValueList.length;

    for (var i = 0; i < optionLength; i++) {
        var option = new Option();
        option.value = ValueList[i];
        option.text = TextList[i];
        document.getElementById(selectListId).options[i] = option;
    }
}

//给 selectList 的赋值
function setOptionsToOptions(selectListId, optionList){
    var optionLength = optionList.length;
    for (var i = 0; i < optionLength; i++) {
        var tmp_value = optionList[i].value;
        var tmp_text = optionList[i].text;
        if(!isNotEmpty(tmp_text)){
            tmp_text = optionList[i].label;
        }

        var option = new Option();
        option.value = tmp_value;
        option.text = tmp_text;

        document.getElementById(selectListId).options[i] = option;
    }
}

//得到 selectList 的值
function getValueOfOptions(selectListId){
    var optionList = [];

    var optionLength = document.getElementById(selectListId).length;

    for (var i = 0; i < optionLength; i++) {
        var seletedIdValue = document.getElementById(selectListId).options[i].value;
        optionList[i] = seletedIdValue;
    }

    return optionList;
}
//向 selectList 增加一项
function addOptionToSelectList(id_value, name_text, selectListId){
    var optionLength = document.getElementById(selectListId).length;

    var option = new Option();
    option.value = id_value;
    option.text = name_text;
    document.getElementById(selectListId).options[optionLength] = option;

    distinctBox(selectListId);
}
//校验是否全由数字组成
function isDigit(s)
{
    var patrn=/^[0-9]{1,20}$/;
    if (!patrn.exec(s)) return false;
    return true;
}
//校验是否是日期
function isDate(s){
    if(s=="") return false;
    var patrn=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    return patrn.test(s);
}
//获取当前时间
function getCurDay(){
    var endDate = new Date();

    return endDate.toShort();
}
//日期加上指定的天数
function addday(dt, days){
    dt = dt.replace('-', '/');// 不认2000-1-31,只认2000/1/31
    var t1 = new Date(new Date(dt).valueOf() + days*24*60*60*1000);// 日期加上指定的天数
    return t1.getFullYear() + "-" + (t1.getMonth() + 1) + "-" + t1.getDate();
}
function adddayEx(dt, days){
    dt = dt.replace('-', '/');// 不认2000-1-31,只认2000/1/31
    var t1 = new Date(new Date(dt).valueOf() + days*24*60*60*1000);// 日期加上指定的天数
    return convertDateStr(t1);
}

//对一个字符串型的日期（2008-11-11），增加（减少） day 天
function addDaysToDateStr(dateStr, days){
    var dates = dateStr.split("-");
    var date = new Date();
    date.setYear(dates[0]);
    date.setMonth(dates[1] - 1);
    date.setDate(dates[2]);

    var returnDate = new Date();
    returnDate.setTime(date.getTime() + days*24*60*60*1000);
    return returnDate.toShort();
}

//日期转字符串
function convertDateStr(vDate){
    if(isNotEmpty(vDate)){
        var month = vDate.getMonth() + 1;
        var monthStr = month<10?('0' + month):(''+month);
        var cdate = vDate.getDate();
        var cdateStr = cdate<10?('0' + cdate):(''+cdate);
        return vDate.getFullYear() + "-" + monthStr + "-" + cdateStr;
    }else{
        return "";
    }
}

//IE6、7、8弹出窗口兼容宽度高度
/*
* 目标页面获取方式
* var arguments = window.dialogArguments;
 APPLY_ID = arguments.APPLY_ID;
 ATTACH_OPERATION = arguments.ATTACH_OPERATION;
* */
function showDialog(pageUrl,argument,width,height){
    var ieVer = '8.0';
    if (window.ActiveXObject){
        ieVer = navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1];
    }
    if(ieVer == '7.0'){
        height -= 10;
    }else if(ieVer == '6.0'){
        height += 60;
    }
    return openModalWindow(pageUrl,argument,width,height);
}
//弹出模式对话框
function openModalWindow(pageUrl,argument,width,height,isResizable,isScrollable)
{
    var style = "center: Yes; help: No; status: No;";
    style  = style + "dialogHeight: " + (height||window.screen.availHeight) + "px;";
    style  = style + "dialogWidth: " + (width||window.screen.availWidth) + "px;";
    style  = style + "resizable: " + (isResizable || "yes;");
    style  = style + "scroll: " + (isScrollable || "yes;");
    if(pageUrl.indexOf("?") == -1){
        pageUrl = pageUrl + "?" + new Date().valueOf();
    }else{
        pageUrl = pageUrl + "&" + new Date().valueOf();
    }

    return window.showModalDialog(pageUrl,argument,style);
}

//弹出非模式对话框
function openModelessWindow(pageUrl,argument,width,height,isResizable,isScrollable)
{
    var style = "center: Yes; help: No; status: No;";
    style  = style + "dialogHeight: " + (height||window.screen.availHeight) + "px;";
    style  = style + "dialogWidth: " + (width||window.screen.availWidth) + "px;";
    style  = style + "resizable: " + (isResizable || "yes;");
    style  = style + "scroll: " + (isScrollable || "yes;");

    if(pageUrl.indexOf("?") == -1){
        pageUrl = pageUrl + "?" + new Date().valueOf();
    }else{
        pageUrl = pageUrl + "&" + new Date().valueOf();
    }

    return window.showModelessDialog(pageUrl,argument,style);
}

//弹出普通窗口
function openWindow(pageUrl,name,width,height,isResizable,isScrollable){
    width = width || window.screen.availWidth;
    height = height || window.screen.availHeight;
    var left = ((window.screen.availWidth - width) / 2) + "px";
    var top = ((window.screen.availHeight - height) / 2) + "px";
    var style="height= "+height+"px,width= "+width+"px, top="+top+",left="+left+", help=No" + ", status= No" +" , resizable= "+(isResizable||"yes") +" , scrollbars = " + (isScrollable||"yes");

    if(pageUrl.indexOf("?") == -1){
        pageUrl = pageUrl + "?" + new Date().valueOf();
    }else{
        pageUrl = pageUrl + "&" + new Date().valueOf();
    }

    return window.open(pageUrl,name,style);
}

//克隆对象
function clone(obj){
    if(typeof(obj) != 'object') return obj;
    if(obj == null) return obj;

    var newObj = new Object();

    for(var i in obj)
        newObj[i] = clone(obj[i]);

    return newObj;
}

//日期格式转换为字符串
function formatDateToString(dateValue, formatStr){
    var vDateValue = dateValue;
    if(!isNotEmpty(dateValue)){
        vDateValue = new Date();
    }
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str = str.replace(/yyyy|YYYY/,vDateValue.getFullYear());
    str = str.replace(/yy|YY/,(vDateValue.getYear()%100)>9?(vDateValue.getYear()%100).toString():'0' + (vDateValue.getYear()%100));

    var v_month = vDateValue.getMonth() + 1;
    str = str.replace(/MM/,v_month>9?v_month:'0' + v_month);
    str = str.replace(/M/g,v_month);
    str = str.replace(/w|W/g,Week[vDateValue.getDay()]);

    str = str.replace(/dd|DD/,vDateValue.getDate()>9?vDateValue.getDate().toString():'0' + vDateValue.getDate());
    str = str.replace(/d|D/g,vDateValue.getDate());

    str = str.replace(/hh|HH/,vDateValue.getHours()>9?vDateValue.getHours().toString():'0' + vDateValue.getHours());
    str = str.replace(/h|H/g,vDateValue.getHours());

    str = str.replace(/mm/,vDateValue.getMinutes()>9?vDateValue.getMinutes().toString():'0' + vDateValue.getMinutes());
    str = str.replace(/m/g,vDateValue.getMinutes());

    str = str.replace(/ss|SS/,vDateValue.getSeconds()>9?vDateValue.getSeconds().toString():'0' + vDateValue.getSeconds());
    str = str.replace(/s|S/g,vDateValue.getSeconds());

    return str;
}

//开始日期不能小于结束日期校验
function checkFromToDate(sFromDate, sToDate, msg){
    var mesg = msg + '查询起始时间不能晚于查询结束时间';

    var begin = $(sFromDate).value;
    var end = $(sToDate).value;

    if(begin && end){
        if(begin == end) return ;

        var checked = DateDiffMsg(end,begin,mesg);
        if(checked == -1){
            $(sToDate).value="";
        }
    }
}
function DateDiffMsg(sEndDate, sStartDate, msg){
    var aDate, oEndDate, oStartDate, iDays;
    aDate = sEndDate.split("-");
    oEndDate = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为12-18-2002格式
    aDate = sStartDate.split("-");
    oStartDate = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    if(oEndDate-oStartDate<0){
        if(msg) alert(msg);
        return -1;
    }else{
        iDays = parseInt(Math.abs(oEndDate - oStartDate) / 1000 / 60 / 60 /24); //把相差的毫秒数转换为天数
    }
    return iDays;
}

//文件上传大小限制
function checkFileSize(fileObj, maxFileLength) {
    if (Trim(fileObj.value) != '') {
        if (window.ActiveXObject) {
            try {
                var fso = new ActiveXObject('Scripting.FileSystemObject');
                var file = fso.GetFile(fileObj.value);
                var fname = fso.GetFileName(fileObj.value);
                var flength = maxFileLength * 1024; // 设置上传的文件最大值（单位：kb），超过此值则不上传
                var fsize = file.Size / 1024;
                if (fsize > flength) {
                    return "上传的文件到小为：" + Math.round(fsize / 1024) + "M" + Math.round(fsize % 1024) + "K,\n超过最大限度"
                        + flength / 1024 + "M,不允许上传 ";
                }
            } catch (e) {
                return null;
            }
        }
    }
    return null;
}

//获取文件大小
function getFileSize(fileObj)
{
    if(Trim(fileObj.value) == ''){
//		alert("你还没有浏览要上传的文件");
        return false;
    }
    if(window.ActiveXObject){
        try{
            var fso = new ActiveXObject('Scripting.FileSystemObject');
            var file = fso.GetFile(fileObj.value);
            var fname = fso.GetFileName(fileObj.value);
            var flength=40*1024;  // 设置上传的文件最大值（单位：kb），超过此值则不上传
            var fsize=file.Size/1024;  // 文件大小（单位：kb）
            if(fsize>flength)
            {
                alert("上传的文件到小为："+Math.round(fsize/1024)+"M"+Math.round(fsize%1024)
                    +"K,\n超过最大限度"+flength/1024+"M,不允许上传 ");
                return false;
            } else {
//				alert("允许上传，文件大小为："+Math.round(fsize/1024)+"M"+Math.round(fsize%1024)+"K");
                return fsize;
            }
        }catch(e)
        {
//			  alert("跳出此消息框，是由于你的activex控件没有设置好,\n"+
//			  "你可以在浏览器菜单栏上依次选择\n"+
//			  "工具->internet选项->/安全/选项卡->自定义级别,\n"+
//			  "打开/安全设置/对话框，把/对没有标记为安全的\n"+
//			  "ActiveX控件进行初始化和脚本运行\n，改为/启动/即可");
            return false;
        }
    }else{
//		alert('Can\'t get File Size!');
        return false;
    }
}
//showDialog自适应宽高.设置最小宽、高度
function changeDialogSize(width,heigth){
    window.resizeTo(width,heigth);
}

//获取当前年的第一天（1月1日）如2008-01-01
function getCurYearFirstDay(){
    var beginDate = new Date();
    beginDate.setMonth(0);
    beginDate.setDate(1);

    return beginDate.toShort();
}

//获取当前年的最后一天（12月31日）如2008-12-31
function getCurYearEndDay(){
    var endDate = new Date();
    endDate.setMonth(11);
    endDate.setDate(31);

    return endDate.toShort();
}

//获取当前日期的一年前的日期
function getCurDayBeforeAYear(){
    var beginDate = new Date();
    beginDate.setYear(beginDate.getYear() -1);

    return beginDate.toShort();
}

//获取当前日期的一月前的日期
function getCurDayBeforeAMonth(){
    var beginDate = new Date();
    beginDate.setMonth(beginDate.getMonth() -1);

    return beginDate.toShort();
}

//获取当前日期的一月后的日期
function getCurDayAfterAMonth(){
    var beginDate = new Date();
    beginDate.setMonth(beginDate.getMonth() + 1);

    return beginDate.toShort();
}
//获取当前日期后的N天
function getCurDayAfterSomeDay(n){
    var CurDate = new Date();
    CurDate.setHours(CurDate.getHours()+(24*n));
    return CurDate.toShort();
}
//获取当前日期
function getCurDay(){
    var endDate = new Date();

    return endDate.toShort();
}

//获取当前年
function getCurYear(){
    var endDate = new Date();

    return endDate.getYear();
}

//获取当前月份
function getCurMonth(){
    var endDate = new Date();

    return endDate.getMonth() + 1;
}




//检验关爱无忧综合保障中参保月份格式
function checkInsureMonth(sFromDate, sToDate){
    var fromVal = $(sFromDate).value;
    if(fromVal.lastIndexOf("-") > 4){
        $(sFromDate).value = fromVal.substring(0,fromVal.lastIndexOf("-"));
    }
    var toVal = $(sToDate).value;
    if(toVal.lastIndexOf("-") > 4){
        $(sToDate).value = toVal.substring(0,toVal.lastIndexOf("-"));
    }
    if(fromVal != null && toVal != null){
        var begin = $(sFromDate).value;
        var end = $(sToDate).value;
        if(begin && end){
            if(begin == end) return ;
            var aDate, oEndDate, oStartDate, iDays ;
            aDate = end.split("-") ;
            oEndDate = aDate[1]+''+aDate[0]; //转换为12-18-2002格式
            aDate = begin.split("-") ;
            oStartDate =aDate[1]+''+ aDate[0];
            if(oEndDate-oStartDate<0){
                alert('起始投保月份查询起始时间不能晚于查询结束时间');
                $(sToDate).value = '';
            }
        }
    }
}


//数字四舍五入
function FormatNumber(srcStr){
    var resultStr, dotIndex, num, srcStr;

    srcStr=''+srcStr+'';
    dotIndex=srcStr.indexOf(".",0);
    if(dotIndex<0){
        return srcStr;
    }else{
        resultStr=srcStr.split(".");
        num=parseInt(resultStr[1].split("",1));
        if(num<5){
            return resultStr[0];
        }else if(num>5){
            return parseFloat(resultStr[0])+1;
        }else if(num==5){
            return parseFloat(resultStr[0])+0.5;
        }
    }
}
//json转换成字符串
function JsonToString(o){
    var arr = [];
    var fmt = function(s) {
        if (typeof s == 'object' && s != null) return JsonToString(s);
        return /^(string|number)$/.test(typeof s) ? s:s;
    }
    for (var i in o) arr.push("" + fmt(o[i]));
    var tmp = arr.join(',');
    return tmp.substring(0,tmp.lastIndexOf(','));
}

//字符串转数组
function getArrayByString(string, separator){
    var array = new Array();

    if(typeof(separator) == "undefined" || separator == "" ){
        separator = ";" ;
    }

    if (string != 'undefined' && string != "") {
        var strings = string.split(separator);
        for(var i=0; i<strings.length; i++){
            if(isNotEmpty(strings[i])){
                array.push(strings[i]);
            }
        }
    }

    return array;
}
//字符串转日期
function formatStringToDate(str) {
    if (typeof str == 'string') {
        var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]),
                parseInt(results[5]), parseInt(results[6]));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
        if (results && results.length > 7)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]),
                parseInt(results[5]), parseInt(results[6]), parseInt(results[7]));
    }
    return null;
}
//获取选择的文本
function getSelectFieldText(selectFieldId){
    var text = "";
    var selectField = document.getElementById(selectFieldId);
    for(var i=0; i<selectField.length; i++){
        if(selectField[i].selected) {
            text = selectField[i].text
        }
    }

    return text;
}

//显示更多
function showMore(obj) {
    var isDisplay = true;
    var oMore = document.getElementById(obj);
    var oMoreUl = oMore.getElementsByTagName("ol")[0];
    oMore.setAttribute("onclick", eval(function() {
        if(isDisplay){
            isDisplay = false;
            oMoreUl.style.display = "block";
        } else {
            isDisplay = true;
            oMoreUl.style.display = "none";
        }
    }));
}


//获取表格当前行数
function getTalbeRow(WORK_EXP_TABLE){
	var tableObj = document.getElementById(WORK_EXP_TABLE);
	var curRow = tableObj.rows.length;//获取当前行数
	return curRow;
}

//根据表格id获取表格数据
function getTableInfo(TABLE_ID){
var tableObj = document.getElementById(TABLE_ID)
	var tableInfo = "";
	for (var i = 1; i < tableObj.rows.length; i++) {    
		//遍历Table的所有Row        
		for (var j = 1; j < tableObj.rows[i].cells.length; j++) {   
			//遍历Row中的每一列            
			tableInfo +=tableObj.rows[i].cells[j].innerText;;
			//获取Table中单元格的内容    
			if(tableInfo!=""){
				tableInfo += ",;xzj";  
			}      
		}        
		tableInfo += ",;zex";    
	}
	return tableInfo;
}
//获取除第一行外的表格其他数据
function getTableInfo(TABLE_ID){
	var tableObj = document.getElementById(TABLE_ID)
		var tableInfo = "";
	$("#"+TABLE_ID).find("tr:gt(0)").each(function(){
	        var tdArr = $(this).children();
	        tableInfo +=tdArr.eq(1).find('input').val();//考场地址
			tableInfo += ",;xzj";
			tableInfo += tdArr.eq(2).find('input').val();//考场数量
			tableInfo += ",;xzj";
			tableInfo += tdArr.eq(3).find('input').val();//考场座位数
			tableInfo += ",;zex"; 	
	    });
		return tableInfo;
	}
