/**
 * 该模块的主入口
 */
define(function(require, exports, module) {
	var downloadForm =  ISS.Core.formValidation("downloadForm");
	var add_download_url = ISS.Config.Global.rootUrl+"/mvc/api/download/add.json";
	$("#downloadRelease").click(function(){
		var valid = downloadForm.validationEngine("validate");
		if(valid==false){
			return valid;
		}
		var param = $("#downloadForm").serialize();
		$.post(add_download_url,param,function(ret){
			if(ret){
				alert(ret.message);
				if(ret.success==true){
//					window.location.href = ISS.Config.Global.htmlUrl+"/download/downloadList.html";
				}
			}
		},'JSON');
	});
	exports.init = function(){
		$("#teacherId").html("");
		var options = "<option value=\"\">--请选择--</option><option value=\"001\">华华老师</option><option value=\"001\">剑红老师</option>" +
				"<option value=\"003\">momo老师</option><option value=\"004\">吉吉老师</option>";
		$("#teacherId").html(options);
	}
})
