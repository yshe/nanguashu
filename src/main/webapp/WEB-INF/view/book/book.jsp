<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
  <%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/util.js'></script> 
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/engine.js'></script>  
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/interface/ajaxBookController.js'></script>
<!doctype html>
<html class="no-js fixed-layout">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>图书信息页面</title>
  <meta name="description" content="这是图书信息管理页面">
  <meta name="keywords" content="index">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="renderer" content="webkit">
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  <link rel="icon" type="image/png" href="<%=basePath%>static/amaze/assets/i/favicon.png">
  <link rel="apple-touch-icon-precomposed" href="<%=basePath%>static/amaze/assets/i/app-icon72x72@2x.png">
  <meta name="apple-mobile-web-app-title" content="Amaze UI" />
  <link rel="stylesheet" href="<%=basePath%>static/amaze/assets/css/amazeui.min.css"/>
  <link rel="stylesheet" href="<%=basePath%>static/amaze/assets/css/admin.css">
<style type="text/css">
#bottomTab ul { margin:10px; padding:5px;border: 10px; list-style-type:none;} 
#bottomTab li { float:left; border: 5px;margin: 5px;}
#bottomTab{
text-align: center;
}
#tableBody tr:HOVER {
	background-color: red;
}
</style>

</head>
<body>
<!--[if lte IE 9]>
<p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，Amaze UI 暂不支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>
  以获得更好的体验！</p>
<![endif]-->


<!-- 编辑图书 -->
<div class="am-popup" id="addBook-popup" style="width: 900px;height: 400px; margin-left: 20%; margin-top: 100px;"align="center">
  <div class="am-popup-inner">
    <div class="am-popup-hd">
      <h4 class="am-popup-title" id="title">编辑图书</h4>
      <span data-am-modal-close
            class="am-close">&times;</span>
    </div>
   
   
<!-- content start -->
<div class="admin-content">
  <div class="admin-content-body">
    <div class="am-tabs am-margin" data-am-tabs>
      <ul class="am-tabs-nav am-nav am-nav-tabs">
        <li class="am-active"><a href="#tab1">基本信息</a></li>
        <li><a href="#tab2">详细描述</a></li>
         <li><a href="#tab3">封面</a></li>
      </ul>

      <div class="am-tabs-bd">
      
      
        <div class="am-tab-panel am-fade am-in am-active" id="tab1">
            <div class="am-g am-margin-top">
              <div class="am-u-sm-6 am-u-md-4 am-text-right">
                	图书编号<font color="red">*</font>：
              </div>
              <div class="am-u-sm-4 am-u-md-4 am-u-end col-end">
                <input type="text" readonly="readonly" id="bookNo" class="am-input-sm" style="width:200px;height: 32px;">
              </div>
            </div>
             <div class="am-g am-margin-top am-form-group">
              <div class="am-u-sm-6 am-u-md-4 am-text-right">
                	图书名<font color="red">*</font>：
              </div>
              <div class="am-u-sm-4 am-u-md-4 am-u-end col-end">
                <input type="text" id="bookName" class="am-input-sm" style="width:200px;height: 32px;">
              </div>
            </div>
         	 <div class="am-g am-margin-top am-form-group">
              <div class="am-u-sm-6 am-u-md-4 am-text-right">
                	   图书作者<font color="red">*</font>：
              </div>
              <div class="am-u-sm-4 am-u-md-4 am-u-end col-end">
                <input type="text" id="bookAuthor" class="am-input-sm" style="width:200px;height: 32px;">
              </div>
            </div>
         	
        </div>

        <div class="am-tab-panel am-fade" id="tab2">
          <form class="am-form">
            <div class="am-g am-margin-top">
              <div class="am-u-sm-4 am-u-md-2 am-text-right">
                出版社
              </div>
              <div class="am-u-sm-8 am-u-md-4 am-u-end col-end">
                <input type="text" id="bookPublish" class="am-input-sm">
              </div>
            </div>

     


            <div class="am-g am-margin-top-sm">
              <div class="am-u-sm-12 am-u-md-2 am-text-right admin-form-text">
                内容描述
              </div>
              <div class="am-u-sm-12 am-u-md-10">
                <textarea rows="10"  placeholder="请简单描述该书本内容（500字以内）" id="bookDes"></textarea>
              </div>
            </div>

          </form>
        </div>


 <div class="am-tab-panel am-fade" id="tab3">
           <img class="am-radius" alt="140*140" src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80" width="140" height="140" />
       <div class="am-form-group am-form-file">
  <button type="button" class="am-btn am-btn-danger am-btn-sm">
    <i class="am-icon-cloud-upload"></i> 选择要上传的文件</button>
  <input id="doc-form-file" type="file" multiple>
</div>
<div id="file-list"></div>
        </div>
      </div>
    </div>
    <div class="am-margin">
    	<input type="hidden" id="bookTypeId"/>
      <button type="button" onclick="saveBook();return false;" class="am-btn am-btn-primary am-btn-xs">提交保存</button>
    </div>
  </div>

 
</div>
<!-- content end -->
    </div>
</div>




<div class="am-cf admin-main">

  <!-- content start -->
  <div class="admin-content">
    <div class="admin-content-body">
      <div class="am-cf am-padding">
       <!--  <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">首页</strong> / <small>一些常用模块</small></div> -->
      </div>

      <ul class="am-avg-sm-1 am-avg-md-4 am-margin am-padding am-text-center admin-content-list ">
        <li><a href="#" class="am-text-success"><span class="am-icon-btn am-icon-file-text"></span><br/>图书类别<br/>${bookTypeNum }</a></li>
        <li><a href="#" class="am-text-warning"><span class="am-icon-btn am-icon-briefcase"></span><br/>图书类目<br/>${bookItemNum }</a></li>
        <li><a href="#" class="am-text-danger"><span class="am-icon-btn am-icon-recycle"></span><br/>图书册数<br/>${bookInfoNum}</a></li>
        <li><a href="#" class="am-text-secondary"><span class="am-icon-btn am-icon-user-md"></span><br/>借出图书数<br/>${bookBorrowNum }</a></li>
      </ul>

  <div class="am-g">
  
  	 <div class="am-u-sm-12 am-u-md-2">
          <div class="am-btn-toolbar">
            <div class="am-btn-group am-btn-group-xs">
             <!--  <button type="button" id="openModel" class="am-btn am-btn-default" onclick="addBookType();"><span class="am-icon-plus"></span> 新增</button> -->
            </div>
          </div>
        </div>
  	
  
        <div class="am-u-sm-12 am-u-md-2">
          <div class="am-form-group">
         <input id="bookNoSerach" name="bookNoSerach" type="text" class="am-form-field" placeholder="图书编号" style="width:200px;height: 32px;"/>
          </div>
        </div>
       
        <div class="am-u-sm-12 am-u-md-2">
          <div class="am-form-group">
            <input id="bookNameSerach" name="bookNameSerach" type="text" class="am-form-field" placeholder="图书名字" style="width:200px;height: 32px;"/>
          </div>
        </div>
        
         <div class="am-u-sm-12 am-u-md-2">
          <div class="am-form-group">
         <select id="bookStatusSerach" name="bookStatusSerach"  data-am-selected="{btnSize: 'sm'}">
              <option value=" ">所有状态</option>
              <option value="0">初始</option>
              <option value="1">已借出</option>
              <option value="2">已归还</option>
            </select>
          </div>
        </div>
         <div class="am-u-sm-12 am-u-md-2">
          <div class="am-form-group">
             <button id = "queryButton" class="am-btn am-btn-default" type="button" style="height: 32px;">搜索</button>
          </div>
        </div>
      
	      
      <div class="am-g">
        <div class="am-u-sm-12">
          <form class="am-form">
            <table id="bookTable" style="text-align: center;"  class="am-table am-table-striped am-table-hover table-main">
              <thead>
              <tr >
                <th style="text-align: center;" class="table-id">序号</th><th style="text-align: center;" class="table-type">图书类别</th><th style="text-align: center;" class="table-type">图书编号</th><th style="text-align: center;" class="table-author am-hide-sm-only">图书名</th><th style="text-align: center;" class="table-title">图书著者</th><th style="text-align: center;" class="table-date am-hide-sm-only">出版社</th><th style="text-align: center;" class="table-date am-hide-sm-only">入库时间</th><th style="text-align: center;" class="table-author am-hide-sm-only">入库操作人</th><th style="text-align: center;" class="table-author am-hide-sm-only">图书状态</th><th class="table-set">操作</th>
              </tr>
              </thead>
             <tbody id="tableBody">
			</tbody>
            </table>
        <!-- 底部分页按钮 -->
		<div id="bottomTab"></div>
          </form>
        </div>

      </div>

    <footer class="admin-content-footer">
      <hr>
      <p class="am-padding-left">© 2014 AllMobilize, Inc. Licensed under MIT license.</p>
    </footer>
  </div>
  <!-- content end -->

</div>

<a href="#" class="am-icon-btn am-icon-th-list am-show-sm-only admin-menu" data-am-offcanvas="{target: '#admin-offcanvas'}"></a>

<!--[if lt IE 9]>
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
<script src="assets/js/amazeui.ie8polyfill.min.js"></script>
<![endif]-->

<!--[if (gte IE 9)|!(IE)]><!-->
<script src="<%=basePath%>static/amaze/assets/js/jquery.min.js"></script>
<!--<![endif]-->
<script src="<%=basePath%>static/js/bootstrap-paginator.min.js"></script>
<script src="<%=basePath%>static/amaze/assets/js/amazeui.min.js"></script>
<script src="<%=basePath%>static/amaze/assets/js/app.js"></script>

  <script src="<%=basePath%>static/js/book.js"></script>
</body>
</html>
