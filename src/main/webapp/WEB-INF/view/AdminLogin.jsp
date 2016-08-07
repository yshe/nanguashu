<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
  <%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	System.out.print(request.getAttribute("errmsg"));
%>
<!doctype html>
<html class="no-js">	
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport"
        content="width=device-width, initial-scale=1">
  <title>南瓜数图书管理系统首页</title>

  <!-- Set render engine for 360 browser -->
  <meta name="renderer" content="webkit">

  <!-- No Baidu Siteapp-->
  <meta http-equiv="Cache-Control" content="no-siteapp"/>

  <link rel="icon" type="image/png" href="assets/i/favicon.png">

  <!-- Add to homescreen for Chrome on Android -->
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="icon" sizes="192x192" href="static/amaze/assets/i/app-icon72x72@2x.png">

  <!-- Add to homescreen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Amaze UI"/>
  <link rel="apple-touch-icon-precomposed" href="static/amaze/assets/i/app-icon72x72@2x.png">

  <!-- Tile icon for Win8 (144x144 + tile color) -->
  <meta name="msapplication-TileImage" content="static/amaze/assets/i/app-icon72x72@2x.png">
  <meta name="msapplication-TileColor" content="#0e90d2">

  <link rel="stylesheet" href="static/amaze/assets/css/amazeui.min.css">
  <link rel="stylesheet" href="static/amaze/assets/css/app.css">
</head>
<body>
<form class="am-form-inline" action="<%=basePath%>login" method="post">
  <div class="am-form-group"  align="center" style="position: absolute;
                margin-top:10%; 
                margin-right:35%;
                width: 30%; 
                height:350px; 
                right:1%;
                top: 50; 
             /*    background-color:buttontext; */
                borderborder: 1px solid gray;
                ">
                <div align="center" ><font size="5" >南瓜树图书管理系统</font></div>
                	<div style="color:darkred;height: 60px;" id="errmsg">
					 	${errmsg }
					 	
					</div>
                <div>
                <input type="text" class="am-form-field"   id="username" name="username"  placeholder="用户名" required/><br/><br/>
               
                <input type="password" class="am-form-field" minlength="6" id="password" name="password" placeholder="密码" required/><br/><br/>
               
 				<button type="submit" data-am-loading="{loadingText: '努力加载中...'}"  class="am-btn am-btn-primary am-btn-block">登录</button>
                </div>
                
            
  </div> 
  </div>
</form>

<!--在这里编写你的代码-->

<!--[if (gte IE 9)|!(IE)]><!-->
<script src="static/amaze/assets/js/jquery.min.js"></script>
<!--<![endif]-->
<!--[if lte IE 8 ]>
<script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
<script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
<script src="assets/js/amazeui.ie8polyfill.min.js"></script>
<![endif]-->
<script src="static/amaze/assets/js/amazeui.min.js"></script>
</body>
</html>