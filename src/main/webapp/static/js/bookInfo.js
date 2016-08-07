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
		var bookTypeNameSeach = $("#bookTypeNameSeach").val();
		var bookBorrowNumSeach=$("#bookBorrowNumSeach").val();
		var parentTypeIdSeach=$("#parentTypeIdSeach").val();
		buildTable(bookTypeNameSeach,bookBorrowNumSeach,parentTypeIdSeach, page, PAGESIZE);// 默认每页最多10条
	}
}

// 获取当前项目的路径
var urlRootContext = (function() {
	var strPath = window.document.location.pathname;
	var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
	return postPath;
})();

// 生成表格
function buildTable(bookTypeNameSeach,bookBorrowNumSeach,parentTypeIdSeach, pageNumber, pageSize) {
	var url = urlRootContext + "/book/view.do"; // 请求的网址
	var reqParams = {
		'bookTypeName' : bookTypeNameSeach,
		'bookBorrowNum':bookBorrowNumSeach,
		'parentTypeId':parentTypeIdSeach,
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
									var bookTypeName = $("#bookTypeNameSeach").val();
									var bookBorrowNum=$("#bookBorrowNumSeach").val();
									var parentTypeId=$("#parentTypeIdSeach").val();
									buildTable(bookTypeName,bookBorrowNum,parentTypeId, page, PAGESIZE);// 默认每页最多10条
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
														'<td class="am-hide-sm-only am-text-secondary " bgcolor="#EDF4FE">' + this.codeName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only" bgcolor="#EDF4FE"><a href="#">' + this.bookTypeName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-success" bgcolor="#EDF4FE">' + this.bookSum
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-primary" bgcolor="#EDF4FE">' + this.bookBorrowNum
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDF4FE">' +  (this.bookSum-this.bookBorrowNum)
																+ '</td>');
												
											}else{
												$("#tableBody").append('<tr height="10px;" bgcolor="#EDFfFE" >');
												
												$("#tableBody").append(
														' <td class="am-hide-sm-only" style="text-align:center;" bgcolor="#EDFfFE">' + i
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-secondary " bgcolor="#EDFfFE">' + this.codeName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only" bgcolor="#EDFfFE"><a href="#">' + this.bookTypeName
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-success" bgcolor="#EDFfFE">' + this.bookSum
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-primary" bgcolor="#EDFfFE">' + this.bookBorrowNum
																+ '</td>');
												$("#tableBody").append(
														'<td class="am-hide-sm-only am-text-danger" bgcolor="#EDFfFE">' +  (this.bookSum-this.bookBorrowNum)
																+ '</td>');
												
											}
											$("#tableBody").append(
													'<td><div class="am-btn-toolbar" bgcolor="#EDF4FE"><div class="am-btn-group am-btn-group-xs"><button onclick="addBook('+this.bookTypeId+');return false;" class="am-btn am-btn-default am-btn-xs am-text-success am-hide-sm-only"><span class="am-icon-plus"></span> 新增图书</button><button onclick="lookBookType('+this.bookTypeId+');return false;"  class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span > 编辑</button><button onclick="delBookType('+this.bookTypeId+');return false;" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only "  ><span class="am-icon-trash-o"></span> 删除</button></div></div></td>');
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
		var bookTypeName = $("#bookTypeNameSeach").val();
		var bookBorrowNum=$("#bookBorrowNumSeach").val();
		var parentTypeId=$("#parentTypeIdSeach").val();
		buildTable(bookTypeName,bookBorrowNum,parentTypeId, 1, PAGESIZE);
	});
	
	
	$("#bookTable tr:even").css({ "background": "#FFD" });
	$("#bookTable tr:odd").css({ "background": "#EEE" });
	
	 $('#doc-form-file').on('change', function() {
	      var fileNames = '';
	      $.each(this.files, function() {
	        fileNames += '<span class="am-badge">' + this.name + '</span> ';
	      });
	      $('#file-list').html(fileNames);
	    });
});

var insertOrUpdate="";
var bid="";
//dwr操作
//查看或者编辑图书类别
function lookBookType(id){
	bid=id;
	insertOrUpdate="update";
	ajaxBookController.lookOrUpdateBookItemInfo(id, function(data){
	
	    if(data!=null){
	    	var dataObj	 = eval("(" + data + ")");//转换为json对象 
	    	var parentTypeId=dataObj.parentTypeId;
	    	$("#bookTypeName").val(dataObj.bookTypeName);
			$("#bookSum").val(dataObj.bookSum);
			$("#bookTypeId").val(dataObj.bookTypeId);
			ajaxBookController.getBookTypeList("",function(data){
				if(data!=null){
					var dataObj2 = eval("(" + data + ")");//转换为json对象 
					$.each(dataObj2,function(index,item){
						if(parentTypeId==item.id){
							$("#parentTypeId").append('<option selected="selected" value="'+item.id+'">"'+item.commonCodeName+'"</option>');
						}else{
							$("#parentTypeId").append('<option value="'+item.id+'">"'+item.commonCodeName+'"</option>');
						}
						
					});
				}
			});
			$('#my-popup').modal(options);
		}
	    	/*$.each(dataObj,function(index,item){
				
			});*/
	    	
	    
	});  
	
}


//新增图书条目
function addBookType(){
	insertOrUpdate="insert";
	
	ajaxBookController.getBookTypeList("",function(data){
		if(data!=null){
			var dataObj	 = eval("(" + data + ")");//转换为json对象 
			$.each(dataObj,function(index,item){
				$("#parentTypeId").append('<option value="'+item.id+'">"'+item.commonCodeName+'"</option>');
			});
		}
	});
	$('#my-popup').modal(options);
}

//删除图书类别
function delBookType(id){
	var flag=confirm("确定要删除该类别吗？");
	if(flag){
		insertOrUpdate="delete";
		ajaxBookController.validateBookTItemExsits("","","",insertOrUpdate,id, function(data){
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

//提交修改、新增 图书条目信息
function submit(){
	//1.获取新增的图书类别信息
	//2.后台校验是否有同名的该图书类别代码、图书类别名ss.replace(/[ ]/g,"")
	var parentTypeId=$("#parentTypeId").val().replace(/[ ]/g,"");
	var bookTypeName=$("#bookTypeName").val().replace(/[ ]/g,"");
	var bookSum=$("#bookSum").val().replace(/[ ]/g,"");
	if(parentTypeId==null || bookTypeName==null || parentTypeId=="" || bookTypeName=="" || bookSum ==null || isNaN(bookSum)){
		if(isNaN(bookSum)){
			//TODO
			//整数判断未增加
			alert("请填写图书数量（必须是整数字）！");
		}else{alert("请选择图书类别以及填写图书名！");}
		
		return false;
	}else{
		if(insertOrUpdate=="insert"){//新增
			ajaxBookController.validateBookTItemExsits(parentTypeId,bookTypeName,bookSum,insertOrUpdate,null, function(data){
				 if("0"==data){
					 alert("新增成功！"); 
					$('#my-popup').modal('close');
					window.location.href=window.location.href;
				 }else{
					 alert(data);
				 }
			}); 
		}else{//修改
			var id=bid;
			ajaxBookController.validateBookTItemExsits(parentTypeId,bookTypeName,bookSum,insertOrUpdate,id, function(data){
				 if("0"==data){
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



//新增图书

//新增图书条目
function addBook(bookItemId){
	insertOrUpdate="addBook";
	if(bookItemId!=null){$("#bookTypeId").val(bookItemId);}else{alert("bookItemId为空");}
	/*ajaxBookController.getBookTypeList("",function(data){
		if(data!=null){
			var dataObj	 = eval("(" + data + ")");//转换为json对象 
			$.each(dataObj,function(index,item){
				$("#parentTypeId").append('<option value="'+item.id+'">"'+item.commonCodeName+'"</option>');
			});
		}
	});*/
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
				 alert("新增成功！"); 
					$('#addBook-popup').modal('close');
					window.location.href=window.location.href;
			}else{
				//图书编号存在，不允许保存
				alert(data);
			}
		});
	}
	
}