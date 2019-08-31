/**
 * 该模块的主入口
 */
define(function(require, exports, module) {
	var addUrl = ISS.Config.Global.rootUrl+"/mvc/user/register.json";
	var checkUserNameUrl = ISS.Config.Global.rootUrl+"/mvc/user/ajaxCheckUserNameRepeat.json";
	exports.checkEmail = function(){
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		var username = $("#username").val();
		if($.trim(username)==""){
			$("p.tips").html("用户名不能为空");
			return false;
		}
		var result = reg.test(username);
		if(result==false){
			$("p.tips").html("非法的邮件格式");
			return false;
		}
	}
	
	exports.checkPassword = function(){
		var password = $("#password").val();
		if($.trim(password)==""){
			$("p.tips").html("密码不能为空");
			return false;
		}
		if($.trim(password).length<6){
			$("p.tips").html("密码长度至少为6位");
			return false;
		}
	}
	exports.checkPwdConfirm = function(){
		var pwdconfirm = $("#pwdconfirm").val();
		if($.trim(pwdconfirm)==""){
			$("p.tips").html("重复密码不能为空");
			return false;
		}
		var password = $("#password").val();
		if(pwdconfirm!==password){
			$("p.tips").html("密码不一致");
			return false;
		}
	}
	$("#signup-button").click(function(){
		var ret1 = exports.checkEmail();
		var ret2 = exports.checkPassword();
		var ret3 = exports.checkPwdConfirm();
		if(ret1==false||ret2==false||ret3==false){
			return false;
		}
	$.post(checkUserNameUrl,{username:$("#username").val()},function(ret){
		if(ret.success==false){
			$("p.tips").html(ret.message);
			return false;
		}else{
			$.ajax({
				type : "POST",
				url : addUrl,
				data : {
					username:$.trim($("#username").val()),
					password:$.trim($.md5($("#password").val())),
				},
				dataType:'json',
				success : function(result) {
					if(result.success==true){
						$.dialog({time: 2,content: '注册成功，即将进入登录后界面',close: function(){
							  window.location.href=ISS.Config.Global.htmlUrl +'/index/index.html';
	                  	   }
	      			  	});
					}else{
						$.dialog({time: 2,content: '注册失败，服务器异常，请联系系统管理员'});
					}
				}
			});s
		}
	},'json');
	});
})	
