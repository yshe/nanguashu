<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/util.js'></script> 
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/engine.js'></script>  
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/interface/ajaxBookController.js'></script>
 <%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!doctype html>
<html class="no-js fixed-layout">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>图书类别管理</title>
  <meta name="description" content="这是一个 index 页面">
  <meta name="keywords" content="index">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="renderer" content="webkit">
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  <link rel="icon" type="image/png" href="<%=basePath%>static/amaze/assets/i/favicon.png">
  <%-- <link href="<%=basePath%>static/js/js/bootstrap/css/bootstrap.min.css" rel="stylesheet"> --%>
  <link rel="apple-touch-icon-precomposed" href="<%=basePath%>static/amaze/assets/i/app-icon72x72@2x.png">
  <meta name="apple-mobile-web-app-title" content="Amaze UI" />
  <link rel="stylesheet" href="<%=basePath%>static/amaze/assets/css/amazeui.min.css"/>
  <link rel="stylesheet" href="<%=basePath%>static/amaze/assets/css/admin.css">
<style type="text/css">
ul { margin:10px;; padding:5px;border: 10px; list-style-type:none;} li { float:left; border: 5px;margin: 5px;}
#bottomTab{
text-align: center;
}
</style>

</head>
<body>
<!--[if lte IE 9]>
<p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，Amaze UI 暂不支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>
  以获得更好的体验！</p>
<![endif]-->
<!-- 弹出框 -->
<div class="am-popup" id="my-popup" style="width: 900px;height: 450px; margin-left: 20%; margin-top: 100px;"align="center">
  <div class="am-popup-inner">
    <div class="am-popup-hd">
      <h4 class="am-popup-title" id="title">新增图书类别</h4>
      <span data-am-modal-close
            class="am-close">&times;</span>
    </div>
    <div class="am-popup-bd" >
	     <form action="" class="am-form" data-am-validator >
			  <fieldset>
			    <div class="am-form-group">
			      <label for="doc-vld-name-2">类别代码：</label>
			      <input type="hidden" name="codeId" id="codeId"/>
			      <input id="COMMON_CODE" type="text" name="COMMON_CODE" minlength="3" maxlength="50" placeholder="类别代码（至少 3 个字符，至多50个字符）" required/>
			    </div>
			 	<div class="am-form-group">
			      <label for="doc-vld-name-2">图书类别名：</label>
			      <input type="text" id="COMMON_CODE_NAME" name="COMMON_CODE_NAME" minlength="3" maxlength="50" placeholder="输入图书类别名（至少 3 个字符，至多50个字符）" required/>
			    </div>
			    
			  </fieldset>
		</form>
	     <button class="am-btn am-btn-secondary" type="button"  onclick="submit()" >提交</button>
	     
    </div>
  </div>
</div>
<div class="am-cf admin-main">

  <!-- content start -->
  <div class="admin-content">
    <div class="admin-content-body">
    <div class="am-cf am-padding am-padding-bottom-0">
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">图书类别</strong> </div>
      </div>

      <hr>

  	<div class="am-g">
          <div class="am-u-sm-12 am-u-md-6">
          <div class="am-btn-toolbar">
            <div class="am-btn-group am-btn-group-xs">
              <button type="button" id="openModel" class="am-btn am-btn-default"  onclick="addBookType()"><span class="am-icon-plus"></span> 新增</button>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12 am-u-md-3">
          <div class="am-form-group">
            <input id="bookTypeName" type="text" class="am-form-field" placeholder="图书类别名" style="width:200px;height: 32px;"/>
          </div>
        </div>
         <div class="am-u-sm-12 am-u-md-3">
          <div class="am-form-group">
             <button id ="queryButton" class="am-btn am-btn-default" type="button" style="height: 32px;">搜索</button>
          </div>
        </div>
      
	      
      <div class="am-g">
        <div class="am-u-sm-12">
            <table id="bookTable" style="text-align: center;"  class="am-table am-table-striped am-table-hover table-main">
              <thead>
              <tr >
                <th style="text-align: center;" class="table-id">序号</th><th style="text-align: center;"	 class="table-type">类别</th><th style="text-align: center;"	 class="table-type">类别代码</th><th class="table-set">操作</th>
              </tr>
              </thead>
             <tbody id="tableBody">
			</tbody>
            </table>
        <!-- 底部分页按钮 -->
		<div id="bottomTab"></div>
        </div>

      </div>

    <footer class="admin-content-footer">
      <hr>
       <p class="am-padding-left">© 2016 yabushan@南瓜树.</p>
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
<script src="<%=basePath%>static/js/bookType.js"></script>

</body>
</html>
