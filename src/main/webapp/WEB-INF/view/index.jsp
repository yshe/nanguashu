<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
  <%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	System.out.print(request.getAttribute("errmsg"));
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html class="no-js fixed-layout">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Amaze UI Admin index Examples</title>
  <meta name="description" content="这是一个 index 页面">
  <meta name="keywords" content="index">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="renderer" content="webkit">
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  <link rel="icon" type="image/png" href="<%=basePath%>assets/i/favicon.png">
  <link rel="apple-touch-icon-precomposed" href="<%=basePath%>static/amaze/assets/i/app-icon72x72@2x.png">
  <meta name="apple-mobile-web-app-title" content="Amaze UI" />
  <link rel="stylesheet" href="<%=basePath%>static/amaze/assets/css/amazeui.min.css"/>
  <link rel="stylesheet" href="<%=basePath%>static/amaze/assets/css/admin.css">
  <style type="text/css">
  	ul,li{margin-right: 30px;}
  </style>
  
</head>
<body>
<!--[if lte IE 9]>
<p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，Amaze UI 暂不支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>
  以获得更好的体验！</p>
<![endif]-->
<header class="am-topbar am-topbar-inverse admin-header" style="margin-bottom: 10%;">
  <div class="am-topbar-brand">
    <strong><a href="index.jsp" target="iframepage">南瓜树管理系统</a></strong> 
    <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
     <li class="am-hide-sm-only"><a href="javascript:;" id="admin-fullscreen"><span class="am-icon-arrows-alt"></span> <span class="admin-fullText">开启全屏</span></a></li>
     </ul>
  </div>

  <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

  <div class="am-collapse am-topbar-collapse" id="topbar-collapse">

    <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
     <li class="am-dropdown" data-am-dropdown>
        <a class="am-dropdown-toggle" data-am-dropdown-toggle href="javascript:;">
          <span class="am-icon-envelope-o"></span>图书管理<span class="am-icon-caret-down"></span>
        </a>
        <ul class="am-dropdown-content">
          <li><a href="<%=basePath%>book/bookType" target="iframepage"><span class="am-icon-cog"></span> 图书类别</a></li>
          <li><a  href="<%=basePath%>book/bookInfo" target="iframepage"><span class="am-icon-cog"></span>图书条目</a></li>
          <li><a href="<%=basePath%>book/book" target="iframepage"><span class="am-icon-power-off"></span> 图书信息</a></li>
        </ul>
      </li>
      
      <li class="am-dropdown" data-am-dropdown>
        <a class="am-dropdown-toggle" data-am-dropdown-toggle href="javascript:;">
          <span class="am-icon-envelope-o"></span>学生管理<span class="am-icon-caret-down"></span>
        </a>
        <ul class="am-dropdown-content">
          <li><a href="<%=basePath%>student/infoList" target="iframepage"><span class="am-icon-cog"></span>学生基本信息</a></li>
        </ul>
      </li>
       <li><a href="javascript:;"> <span class="am-icon-envelope-o"></span>班级管理</a></li>
      <li><a href="javascript:;"><span class="am-icon-envelope-o"></span> 课程管理</a></li>
      <li class="am-dropdown" data-am-dropdown>
        <a class="am-dropdown-toggle" data-am-dropdown-toggle href="javascript:;">
          <span class="am-icon-users"></span>欢迎管理员： ${empInfo.loginName} &nbsp;&nbsp;&nbsp;<span class="am-icon-caret-down"></span>
        </a>
        <ul class="am-dropdown-content">
          <li><a href="#"><span class="am-icon-user"></span> 资料</a></li>
          <li><a href="#"><span class="am-icon-cog"></span> 设置</a></li>
          <li><a href="<%=basePath%>logout"><span class="am-icon-power-off"></span> 退出</a></li>
        </ul>
      </li>
     
    </ul>
  </div>
</header>

<iframe src="index.jsp" id="iframepage"  name="iframepage" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="padding: 0px; width: 100%; height: 100%;">
</iframe>
<!--[if lt IE 9]>
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
<script src="assets/js/amazeui.ie8polyfill.min.js"></script>
<![endif]-->

<!--[if (gte IE 9)|!(IE)]><!-->
<script src="<%=basePath%>static/amaze/assets/js/jquery.min.js"></script>
<!--<![endif]-->
<script src="<%=basePath%>static/amaze/assets/js/amazeui.min.js"></script>
<script src="<%=basePath%>static/amaze/assets/js/app.js"></script>
 <script type="text/javascript">
   $("li").click(function(){
		$(this).siblings().removeClass();
	 $(this).attr("class","am-active");
	   
	});
   </script>

</body>
</html>
