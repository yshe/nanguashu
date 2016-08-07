var PAGESIZE = 10;
var options = {
	currentPage : 1, // 当前页数
	totalPages : 10, // 总页数，这里只是暂时的，后头会根据查出来的条件进行更改
	size : "normal",
	alignment : "center",
	itemTexts : function(type, page, current) {
		switch (type) {
		case "first":
			return "第一页";
		case "prev":
			return "前一页";
		case "next":
			return "后一页";
		case "last":
			return "最后页";
		case "page":
			return page;
		}
	},
	onPageClicked : function(e, originalEvent, type, page) {
		var bookTypeName = $("#bookTypeName").val();
		buildTable(bookTypeName, page, PAGESIZE);// 默认每页最多10条
	}
}

// 获取当前项目的路径
var urlRootContext = (function() {
	var strPath = window.document.location.pathname;
	var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
	return postPath;
})();

// 生成表格
function buildTable(bookTypeName, pageNumber, pageSize) {
	var url = urlRootContext + "/bookType/view.do"; // 请求的网址
	var reqParams = {
		'bookTypeName' : bookTypeName,
		'pageNumber' : pageNumber,
		'pageSize' : pageSize
	};// 请求数据
	$(function() {
		$.ajax({
					type : "POST",
					url : url,
					data : reqParams,
					async : false,
					dataType : "json",
					success : function(data) {
						if (data.isError == false) {
							// options.totalPages = data.pages;
							var newoptions = {
								currentPage : 1, // 当前页数
								totalPages : data.pages == 0 ? 1 : data.pages, // 总页数
								size : "normal",
								alignment : "center",
								itemTexts : function(type, page, current) {
									switch (type) {
									case "first":
										return "第一页";
									case "prev":
										return "前一页";
									case "next":
										return "后一页";
									case "last":
										return "最后页";
									case "page":
										return page;
									}
								},
								onPageClicked : function(e, originalEvent,
										type, page) {
									var bookTypeName = $("#bookTypeName").val();
									buildTable(bookTypeName, page, PAGESIZE);// 默认每页最多10条
								}
							}
							$('#bottomTab').bootstrapPaginator("setOptions",
									newoptions); // 重新设置总页面数目
							var dataList = data.dataList;
							$("#tableBody").empty();// 清空表格内容
							if (dataList.length > 0) {
								$(dataList).each(
										function(index) {// 重新生成
											var i=index+1;
											if(i%2==0){
												$("#tableBody").append('<tr height="10px;" bgcolor="#EDFfFE">');
												
												$("#tableBody").append(
														' <td class="am-hide-sm-only" style="text-align:center;" bgcolor="#EDF4FE">    ' + i
																+ '</td>');
												
												$("#tableBody").append(
														'<td class="am-hide-sm-only" bgcolor="#EDF4FE"><a href="#">' + this.commonCodeName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only" bgcolor="#EDF4FE"><a href="#">' + this.commonCode
																+ '</td>');
												
											}else{
												$("#tableBody").append('<tr height="10px;" bgcolor="#EDFfFE" >');
												
												$("#tableBody").append(
														' <td class="am-hide-sm-only" style="text-align:center;" bgcolor="#EDFfFE">' + i
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-secondary " bgcolor="#EDFfFE">' + this.commonCodeName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-secondary " bgcolor="#EDFfFE">' + this.commonCode
																+ '</td>');
											}
											$("#tableBody").append(
											'<td><div class="am-btn-toolbar" bgcolor="#EDF4FE"><div class="am-btn-group am-btn-group-xs"><button onclick="lookBookType('+this.id+')"  class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span > 编辑</button><button onclick="delBookType('+this.id+')" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only "  ><span class="am-icon-trash-o"></span> 删除</button></div></div></td>');
									$("#tableBody").append('</tr>');
										
										});
								
							} else {
								$("#tableBody")
										.append(
												'<tr><th colspan ="4"><center>查询无数据</center></th></tr>');
							}
						} else {
							alert(data.errorMsg);
						}
					},
					error : function(e) {
						alert("查询失败:" + e);
					}
				});
	});
	
}

// 渲染完就执行
$(function(){
	// 生成底部分页栏
	$('#bottomTab').bootstrapPaginator(options);
	buildTable("", 1, 10);// 默认空白查全部

	// 创建结算规则
	$("#queryButton").bind("click", function() {
		var bookTypeName = $("#bookTypeName").val();
		buildTable(bookTypeName, 1, PAGESIZE);
	});
	
	$("#bookTable tr:even").css({ "background": "#FFD" });
	$("#bookTable tr:odd").css({ "background": "#EEE" });
});



var insertOrUpdate="";
var id;
//dwr操作
//查看或者编辑图书类别
function lookBookType(id){
	insertOrUpdate="update";
	ajaxBookController.lookOrUpdateBookTypeInfo(id, function(data){
	    if(data!=null){
	    	var dataObj	 = eval("(" + data + ")");//转换为json对象 
	    	$("#codeId").val(dataObj.id);
	    	$("#COMMON_CODE").val(dataObj.commonCode);
			$("#COMMON_CODE_NAME").val(dataObj.commonCodeName);
			$('#my-popup').modal(options);
		}
	    	/*$.each(dataObj,function(index,item){
				
			});*/
	    	
	    
	});  
	
}
//新增图书类别
function addBookType(){
	insertOrUpdate="insert";
	$('#my-popup').modal(options);
}

//删除图书类别
function delBookType(id){
	var flag=confirm("确定要删除该类别吗？");
	if(flag){
		insertOrUpdate="delete";
		ajaxBookController.validateBookTypeExsits("","",insertOrUpdate,id, function(data){
			 if("0"==data){
				alert("删除成功！"); 
				// buildTable(bookTypeName, 1, 10);
				 window.location.href=window.location.href;
			 }else{
				 alert(data);
			 }
		}); 
	}
}

//提交图书类别
function submit(){
	//1.获取新增的图书类别信息
	//2.后台校验是否有同名的该图书类别代码、图书类别名ss.replace(/[ ]/g,"")
	var commomCode=$("#COMMON_CODE").val().replace(/[ ]/g,"");
	var commomCodeName=$("#COMMON_CODE_NAME").val().replace(/[ ]/g,"");
	var id=$("#codeId").val();
	if(commomCode==null || commomCodeName==null || commomCode=="" || commomCodeName==""){
		alert("请输入图书类别代码和图书类别名！");
		return false;
	}else{
		if(insertOrUpdate=="insert"){//新增
			ajaxBookController.validateBookTypeExsits(commomCode,commomCodeName,insertOrUpdate,id, function(data){
				 if("0"==data){
					 var bookTypeName = $("#bookTypeName").val();
					 alert("新增成功！"); 
					$('#my-popup').modal('close');
					window.location.href=window.location.href;
				 }else{
					 alert(data);
				 }
			}); 
		}else{//修改
			ajaxBookController.validateBookTypeExsits(commomCode,commomCodeName,insertOrUpdate,id, function(data){
				 if("0"==data){
					 var bookTypeName = $("#bookTypeName").val();
					 alert("修改成功！"); 
					$('#my-popup').modal('close');
					window.location.href=window.location.href;
				 }else{
					 alert(data);
				 }
			}); 
		}
		
	}
}
