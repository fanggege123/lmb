/**
 * 该模块的主入口
 */
define(function(require, exports, module) {
	//验证码
	exports.init = function(){
		var username = $.cookie("NM_LG_UR");
		var rememberMe = $.cookie("rememberMe");
		if(rememberMe=="true"){
			$("#cookietime").attr("checked","checked");
			$("#username").val(username);
		}
	}
	
	$("#login-button") .click(function() {
						var isChecked = $("#cookietime").attr("checked");
						var loginUrl = ISS.Config.Global.rootUrl
								+ "/mvc/user/login.json"; 
						var username = $.trim($("#username").val());
						var password = $.trim($("#password").val());
						if(username==null||username==""){
							$("p.tips").html("用户名不能为空。");
							return false; 
						}  
						if(password==null||password==""){
							$("p.tips").html("密码不能为空。");
							return false;
						}
						var param = {
							username : username,
							password : $.md5(password)
						};
						$.post(
										loginUrl,
										param,
										function(ret) {
											if (ret != null) {
												alert(ret.message);
												if (ret.success == true) {
													if(isChecked=="checked"){
														$.cookie("NM_LG_UR",param.username);
														$.cookie("rememberMe","true");
													}else{
														$.cookie("rememberMe","false");
													}
													window.location.href=ISS.Config.Global.htmlUrl +'/index/index.html';;
												}
											}
										}, 'json');
					});
})	
