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
		var bookStatusSerach = $("#bookStatusSerach").val();
		var bookNoSerach=$("#bookNoSerach").val();
		var bookNameSerach=$("#bookNameSerach").val();
		buildTable(bookStatusSerach,bookNoSerach,bookNameSerach, page, PAGESIZE);// 默认每页最多10条
	}
}

// 获取当前项目的路径
var urlRootContext = (function() {
	var strPath = window.document.location.pathname;
	var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
	return postPath;
})();

// 生成表格
function buildTable(bookStatusSerach,bookNoSerach,bookNameSerach, pageNumber, pageSize) {
	var url = urlRootContext + "/bookInfo/view.do"; // 请求的网址
	var reqParams = {
		'bookStatus' : bookStatusSerach,
		'bookNo':bookNoSerach,
		'bookName':bookNameSerach,
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
									var bookStatus = $("#bookStatusSerach").val();
									var bookNo=$("#bookNoSerach").val();
									var bookName=$("#bookNameSerach").val();
									buildTable(bookStatus,bookNo,bookName, page, PAGESIZE);// 默认每页最多10条
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
											var str=new String(this.bookJoinTime.valueOf());
											this.bookJoinTime=str.substring(0, 10);
											if(i%2==0){
												$("#tableBody").append('<tr height="10px;" bgcolor="#EDFfFE">');
												
												$("#tableBody").append(
														' <td class="am-hide-sm-only" style="text-align:center;" bgcolor="#EDF4FE">    ' + i
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-secondary " bgcolor="#EDF4FE">' + this.codeName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only" bgcolor="#EDF4FE"><a href="#">' + this.bookNo
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-success" bgcolor="#EDF4FE">' + this.bookName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-primary" bgcolor="#EDF4FE">' + this.bookAuthor
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDF4FE">' + this.bookPublish
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDF4FE">' + this.bookJoinTime
																+ '</td>');
												$("#tableBody").append(
															'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDF4FE">' + this.createByName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDF4FE">' + this.bookStatus
															+ '</td>');			
											}else{
												
												$("#tableBody").append('<tr height="10px;" bgcolor="#EDFfFE">');
												
												$("#tableBody").append(
														' <td class="am-hide-sm-only" style="text-align:center;" bgcolor="#EDFfFE">    ' + i
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-secondary " bgcolor="#EDFfFE">' + this.codeName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only" bgcolor="#EDFfFE"><a href="#">' + this.bookNo
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-success" bgcolor="#EDFfFE">' + this.bookName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-primary" bgcolor="#EDFfFE">' + this.bookAuthor
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDFfFE">' + this.bookPublish
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDFfFE">' + this.bookJoinTime
																+ '</td>');
												$("#tableBody").append(
															'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDFfFE">' + this.createByName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDFfFE">' + this.bookStatus
															+ '</td>');	
												
										
											}
											if(this.bookStatus=='已借出'){
												$("#tableBody").append(
														'<td><div class="am-btn-toolbar" bgcolor="#EDF4FE"><div class="am-btn-group am-btn-group-xs"><button onclick="updateBook('+this.bookId+');return false;"  class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span > 编辑</button><button onclick="deleteBook('+this.bookId+','+this.bookTypeId+');return false;" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only "  ><span class="am-icon-trash-o"></span> 删除</button><button onclick="retrunback('+this.bookId+');return false;" class="am-btn am-btn-default am-btn-xs am-text-success am-hide-sm-only "  ><span class="am-icon-refresh am-icon-spin"></span> 归还</button></div></div></td>');
											}else{
												$("#tableBody").append(
														'<td><div class="am-btn-toolbar" bgcolor="#EDF4FE"><div class="am-btn-group am-btn-group-xs"><button onclick="updateBook('+this.bookId+');return false;"  class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span > 编辑</button><button onclick="deleteBook('+this.bookId+','+this.bookTypeId+');return false;" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only "  ><span class="am-icon-trash-o"></span> 删除</button><button onclick="borrow('+this.bookId+');return false;" class="am-btn am-btn-default am-btn-xs am-text-success am-hide-sm-only "  ><span class="am-icon-gear am-icon-spin"></span> 借出</button></div></div></td>');
											}
											
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
	buildTable("","","", 1, 10);// 默认空白查全部

	// 创建结算规则
	$("#queryButton").bind("click", function() {
		var bookStatus = $("#bookStatusSerach").val();
		var bookNo=$("#bookNoSerach").val();
		var bookName=$("#bookNameSerach").val();
		buildTable(bookStatus,bookNo,bookName, 1, PAGESIZE);
	});
	
	
	$("#bookTable tr:even").css({ "background": "#FFD" });
	$("#bookTable tr:odd").css({ "background": "#EEE" });
});


//页面方法
var insertOrUpdate="";
//编辑图书
function updateBook(bookId){
	insertOrUpdate="updateBook";
	/*if(bookId!=null){$("#bookTypeId").val(bookId);}else{alert("bookId为空");}*/
	ajaxBookController.lookOrUpdateBookInfo(bookId,function(data){
		if(data!=null){
			var dataObj	 = eval("(" + data + ")");//转换为json对象 
			$("#bookNo").val(dataObj.bookNo);
			$("#bookName").val(dataObj.bookName);
			$("#bookAuthor").val(dataObj.bookAuthor);
			$("#bookPublish").val(dataObj.bookPublish);
			$("#bookDes").val(dataObj.bookDes);
			$("#bookTypeId").val(dataObj.bookId);
		}
	});
	$('#addBook-popup').modal(options);
}

function saveBook(){
	var reqParam={};
	var bookNo=$('#bookNo').val().replace(/[ ]/g,"");
	var bookName=$('#bookName').val().replace(/[ ]/g,"");
	var bookAuthor=$('#bookAuthor').val().replace(/[ ]/g,"");
	var bookPublish=$('#bookPublish').val().replace(/[ ]/g,"");
	var bookDes=$('#bookDes').val().replace(/[ ]/g,"");
	var bookTypeId=$('#bookTypeId').val().replace(/[ ]/g,"");
	if(bookNo=="" || bookName=="" || bookAuthor=="" || bookNo==null || bookName==null || bookAuthor==null ){
		alert("请填写图书编号、图书名、图书作者！");return false;
	}else{
		reqParam.bookNo=bookNo;
		reqParam.bookName=bookName;
		reqParam.bookAuthor=bookAuthor;
		reqParam.bookPublish=bookPublish;
		reqParam.bookDes=bookDes;
		//reqParam.bookTypeId=bookTypeId;
		//检验图书编号是否存在
		ajaxBookController.validateBookNo(reqParam,bookTypeId,insertOrUpdate,function(data){
			if(data=="0"){
				//图书编号不存在，可以保存
				 alert("修改成功！"); 
					$('#addBook-popup').modal('close');
					window.location.href=window.location.href;
			}else{
				//图书编号存在，不允许保存
				alert(data);
			}
		});
	}
}


//删除图书
function deleteBook(bookId,bookTypeId){
	alert(bookTypeId+";"+bookId);
	var reqParam={};
	var bookNo=$('#bookNo').val().replace(/[ ]/g,"");
	var bookName=$('#bookName').val().replace(/[ ]/g,"");
	var bookAuthor=$('#bookAuthor').val().replace(/[ ]/g,"");
	var bookPublish=$('#bookPublish').val().replace(/[ ]/g,"");
	var bookDes=$('#bookDes').val().replace(/[ ]/g,"");
	var flag=confirm("确定删除该图书？");
	if(flag){
		reqParam.bookNo=bookNo;
		reqParam.bookName=bookName;
		reqParam.bookAuthor=bookAuthor;
		reqParam.bookPublish=bookPublish;
		reqParam.bookDes=bookDes;
		reqParam.bookId=bookId;
		ajaxBookController.validateBookNo(reqParam,bookTypeId,"deleteBook",function(data){
			if(data=="0"){
				 alert("删除成功！"); 
					window.location.href=window.location.href;
			}else{
				alert(data);
			}
		});
	}
	

	
}
//归还
function retrunback(bookId){
	alert("归还"+bookId);
}
//借出
function borrow(booId){
	alert("借出"+bookId);
}