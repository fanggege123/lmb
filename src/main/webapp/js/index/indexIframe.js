/**
 * 该模块的主入口
 */
define(function(require, exports, module) {
	var get_recommend_course_url = ISS.Config.Global.rootUrl+"/mvc/api/course/findRecommendList.json";
	var get_recommend_download_url = ISS.Config.Global.rootUrl+"/mvc/api/download/findRecommendList.json";
	var get_recommend_topic_url = ISS.Config.Global.rootUrl+"/mvc/api/topic/queryTopRankTopics.json";
	var updateDownloadClickCount_url = ISS.Config.Global.rootUrl+"/mvc/api/download/updateAndReturnClickCount.json";
	var updateAndReturnCourseClickCount_url = ISS.Config.Global.rootUrl+"/mvc/api/course/updateAndReturnClickCount.json";
	//课程
	exports.initCourseZone = function(){
		$.post(get_recommend_course_url,{start:0,end:4,orderBy:"clickCount DESC"},function(ret){
			$(".learn-box").find("ul").html("");
			var toBeAppendHtml = "";
			$.each(ret,function(ind,ele){
				if(ind<=3){
					toBeAppendHtml+=("<li><a href=\""+ele.link+"\""
							+" target=\"_blank\" onclick=\"updateCourseClickCount('"+ele.id+"')\"> <img"
							+" src=\""+ISS.Config.Global.rootUrl+"/mvc/api/attachment/preview.json?attachId="+ele.pictureId+"\""
							+" width=\"280\" height=\"160\">"
							+"<div class=\"learn-info\">"
							+"<h5>"+ele.name+"</h5>"
							+"<p>课程简介："+ele.description+"</p>"
							+"</div> <span><em style=\"float:left;\">点击图片报名</em><em>点击量：<i id=\"clickCount"+ele.id+"\">"+ele.clickCount+"</i>"
							+"</em>"
							+"</span></a></li>");
				}
			});
			$(".learn-box").find("ul").html(toBeAppendHtml);
		},'json');
	}
	//下载
	exports.initDownloadeZone = function(){
		$.post(get_recommend_download_url,{start:0,end:4,orderBy:"clickCount DESC"},function(ret){
			$("#downloadZone").find("form").find("table").html("");
			var toBeAppendHtml = "";
			$.each(ret,function(ind,ele){
				toBeAppendHtml+=("<tr><td id=\"clickCount"+ele.id+"\" style=\"color: #999;width:100px\">点击量：<i>"
						+ele.clickCount+"</i></td><td style=\"color: #999;;width:200px\">"
						+ele.description+"</td><td style=\"color: #999;width:600px\">云盘地址：<a href=\""+ele.link+"\" target=\"_blank\" onclick=\"updateDownloadClickCount('"+ele.id+"')\" style=\"text-decoration:underline;color:#2d64b3;\">"
						+ele.link+"</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提取码："
						+ele.accessPassword+"</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<td class=\"topicDate\">上传日期："
						+ele.createDate.substring(0,ele.createDate.indexOf(".0"))
						+"</td></tr>"
						);	
			});
			$("#downloadZone").find("form").find("table").html(toBeAppendHtml);
		},'json');
	}
	//社区
	exports.initTopicZone = function(){
		$.post(get_recommend_topic_url,{start:0,end:4},function(ret){
			$("#topicZone").find("form").find("table").html("");
			var toBeAppendHtml = "";
			$.each(ret,function(ind,ele){
				var link = ISS.Config.Global.htmlUrl+"/community/topicView.html?topicId="+ele.id+"&authorNickname="+ele.author.nickname+"&authorLogoId="+ele.author.logoId;
				toBeAppendHtml+=("<tr><td><a href=\""+link+"\" style=\"text-decoration:underline;color:#2d64b3;\" >"
						+ele.title+"</a></td><td class=\"topicDate\">"
						+ele.createDate.substring(0,ele.createDate.indexOf(".0"))
						+"</td><td class=\"topicDate\">评论：<i>"
						+ele.evaluateCount+"</i></td><td class=\"topicDate\">发帖人："
						+ele.author.nickname+"</td></tr>");
			});
			$("#topicZone").find("form").find("table").html(toBeAppendHtml);
		},'json');
	}
	
	$("#courseMore").click(function(){
		window.location.href = ISS.Config.Global.htmlUrl + "/course/course.html";
	});
	$("#downloadMore").click(function(){
		window.location.href = ISS.Config.Global.htmlUrl + "/download/download.html";
	});
	$("#topicMore").click(function(){
		window.location.href = ISS.Config.Global.htmlUrl + "/community/community.html";
	});
	
	updateDownloadClickCount = function(id){
		$.post(updateDownloadClickCount_url,{id:id},function(ret){
			if(ret.success){
				$("#clickCount"+id).html("点击量："+ret.content);
			}
		},'json');
	}
	updateCourseClickCount = function(id){
		$.post(updateAndReturnCourseClickCount_url,{id:id},function(ret){
			if(ret.success){
				$("#clickCount"+id).html("点击量："+ret.content);
			}
		},'json');
	}
	
})	
