/**
 * 该模块的主入口
 */
define(function(require, exports, module) {
	var query_download_url = ISS.Config.Global.rootUrl+"/mvc/api/user/passwordReset.json";
	var update_user_url = ISS.Config.Global.rootUrl+"/mvc/api/user/update.json";
	var password_reset_url = ISS.Config.Global.rootUrl+"/mvc/api/user/passwordResetAndLogout.json";
	var getLoginUserInfo_url = ISS.Config.Global.rootUrl+"/mvc/api/user/getLoginUserInfo.json";
	var sfileUploader = require('../framework/sfileUploader');
	var detailsForm =  ISS.Core.formValidation("detailsForm");
	var passwordForm =  ISS.Core.formValidation("passwordForm");
	exports.initDetails = function(){
		$("form input:not(:button,:hidden),select").attr("disabled","disabled");
		$("#details").parent().siblings().children("a").removeClass("current");
		$("#details").addClass("current");
		$("#detailsForm").show();	
		$("#portraitForm").hide();	
		$("#passwordForm").hide();
		$("#details-save").hide();
		$("#details-edit").show();
		$.post(getLoginUserInfo_url,function(ret){
			if(ret.success==true){
				$("#sex").val(ret.object.sex);
				$("#phone").val(ret.object.phone);
				$("#qq").val(ret.object.qq);
				$("#wechat").val(ret.object.wechat);
			}
		},'json');
	}
	exports.initPortrait = function(){
		$("form input:not(:button,:hidden),a").attr("disabled","disabled");
		$("#portrait").addClass("current");
		$("#portrait").parent().siblings().children("a").removeClass("current");
		$("#portraitForm").show();
		$("#portrait-edit").show();
		$("#passwordForm").hide();
		$("#detailsForm").hide();
		$("#portrait-save").hide();
		$.post(getLoginUserInfo_url,function(ret){
			if(ret.success==true){
				console.info($("#id_preview").val("src"));
				$("#id_preview").attr("src",ISS.Config.Global.rootUrl+"/mvc/api/attachment/preview.json?attachId="+ret.object.logoId);
			}
		},'json');
	}
	exports.initPassword = function(){
		$("form input:not(:button,:hidden)").attr("disabled","disabled");
		$("#password").addClass("current");
		$("#password").parent().siblings().children("a").removeClass("current");
		$("#passwordForm").show();	
		$("#portraitForm").hide();	
		$("#detailsForm").hide();
		$("#password-edit").show();
		$("#password-save").hide();
	}
	$("#details").click(function(){
		exports.initDetails();
	});
	$("#portrait").click(function(){
		exports.initPortrait();
	});
	$("#password").click(function(){
		exports.initPassword();
	});
	
	$("#details-save").click(function(){
		var valid = detailsForm.validationEngine("validate");
		if(valid==false){
			return false;
		}
		var param = $("#detailsForm").serialize();
		$.ajax({
			url:update_user_url,
			data:param,
			dataType:"json",
			type:'post',
			success:function(ret){
				if(ret.success){
					alert(ret.message);
					window.location.href = ISS.Config.Global.htmlUrl+"/account/setting.html";
				}else{
					alert(ret.msg);
				}
			}
		});
	});
	
	$("#portrait-save").click(function(){
		var logoId = $("[name='logoId']").val();
		if(logoId==""||logoId==null){
			alert("修改成功");
			return;
		}
		$.post(update_user_url,{logoId:logoId},function(ret){
			if(ret.success==true){
				alert("用户头像设置成功");
				$("#portrait").trigger("click");
			}
		},'json');
	});
	$("#password-save").click(function(){
		var valid = passwordForm.validationEngine("validate");
		if(valid==false){
			return valid;
		}
		$.post(password_reset_url,{password:$.md5($.trim($("[name='newPassword']").val()))},function(ret){
			if(ret.success==true){
				alert("密码修改成功，请使用新密码重新登录。");
				window.parent.location.href=ISS.Config.Global.htmlUrl+"/login/login.html";
			}
		},'json');
	});
	
	
	$("#details-edit").click(function(){
		$(this).hide();
		$("#details-save").show();
		$("input:not(:button,:hidden),select").removeAttr("disabled","disabled");
	});
	
	$("#portrait-edit").click(function(){
		$(this).hide();
		$("#portrait-save").show();
		$("input:not(:button,:hidden),a").removeAttr("disabled","disabled");
	});
	
	$("#password-edit").click(function(){
		$(this).hide();
		$("#password-save").show();
		$("input:not(:button,:hidden)").removeAttr("disabled","disabled");
	});
	
	$("#coverSelect").on('click',function() {
		sfileUploader.init({
			attachTypeName: 'com_logo_img',
			
			dialogTitle: "修改我的头像",
			comfirm: function(settings, dialog) {
				resultId = settings.attachID;
				$('#id_preview').attr("src", settings.previewUrl+"?attachId="+resultId);
				$("[name='logoId']").val(resultId);
				dialog.close();
			}
		});
	});
})
