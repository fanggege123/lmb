/**
 * 单文件上传模块
 */
define(function(require, exports, module){
	var options = {};
	var browserCfg = {};  
    var ua = window.navigator.userAgent;  
    if (ua.indexOf("MSIE")>=1){  
        browserCfg.ie = true;  
    }else if(ua.indexOf("Firefox")>=1){  
        browserCfg.firefox = true;  
    }else if(ua.indexOf("Chrome")>=1){  
        browserCfg.chrome = true;  
    }
    
	exports.init = function(args) {
		options = $.extend(args, {
			uploadUrl: ISS.Config.Global.rootUrl + "/mvc/api/attachment/insertAttachment.json",
			previewUrl: ISS.Config.Global.rootUrl + "/mvc/api/attachment/preview.json"
		});
		if(options.attachTypeName == undefined || options.attachTypeName == null){
			throw new Error("missing attach type name config!");
		}
		if(!options.tips) {
			options.tips = "";
		}
		if(!options.dialogTitle) {
			options.dialogTitle = "文件上传";
		}
		options.valid = false;
		options.dialog = null;
		options.filter = "";
		options.maxNum = 1;
		options.maxSize = 2;

//		findAttachType();
		
		var $content = wrapMainContent();
		
		openBootstrapDialog($content);
	};
	
	/**
	 * 查询附件类型
	 */
	function findAttachType() {
		$.ajax({
			type: "post",
			dataType: "json",
			async: false, // 同步方式
			url: options.attachTypeUrl,
			data: {
				"name": options.attachTypeName
			},
			success: function(result){
				//console.log(result);
				if(result){
					options.filter = result.suffix;
					options.maxNum = result.num;
					options.maxSize = result.size;
					if(isNaN(options.maxNum) || options.maxNum == 0){
						options.maxNum = -1;
					}
					if(isNaN(options.maxSize) || options.maxSize == 0){
						options.maxSize = -1;
					}
				}
			},
			error: function(){

			}
		});
	}

	function wrapMainContent() {
		var htmls = new Array();
		htmls.push("<div class='sfile_upload_layer'>");
		if(options.tips != "") {
			htmls.push("<p class='p_tips' style='margin: 0;'>{0}</p>".format(options.tips));
		}
		if(options.filter != undefined && options.filter != null && options.filter != "") {
			var tag = "<p class='p_tips' style='margin: 0;'>图片格式: <span id='sfile_support_types' class='p_tips_inner'>{0}</span></p>";
			htmls.push(tag.format(options.filter.split(";").join("、")));
		}
		if(options.maxSize != -1) {
			var tag = "<p class='p_tips'>图片大小: 不超过 <span id='sfile_support_types' class='p_tips_inner'>{0}M</span></p>";
			htmls.push(tag.format(options.maxSize));
		}
		
		htmls.push("	<div id='testFocusId' style='width:1px;height:1px;'></div><div class='upload_box'>");
		htmls.push("		<div class='colum_1'>");
		htmls.push("			<input id='id_filename' type='text' name='filename' class='filename_input' disabled='disabled'/>");
		htmls.push("		</div>");
		htmls.push("		<div class='colum_2'>");
		htmls.push("			<div id='sfile_btn_choose' class='sfile_button'>");
		htmls.push("				<span>选择文件</span>");
		htmls.push("				<input id='id_file' style='filter:alpha(opacity=0);' type='file' name='file' class='sfile_file_input'/>");
		htmls.push("			</div>");
		htmls.push("			<div id='sfile_btn_upload' class='sfile_button' style='margin-left: 10px;' disabled='disabled'>");
		htmls.push("				<span>上传</span>");
		htmls.push("			</div>");
		htmls.push("		</div>");
		htmls.push("		<div class='clear'></div>");
		htmls.push("	</div>");
		htmls.push("	<img id='preview_size_fake' class='preview_size_fake'/>");
		htmls.push("	<div class='sfile_preview_layer'>");
		htmls.push("		<div id='id_preview_wrapper' class='preview_wrapper'></div>");
		htmls.push("		<div id='sfile_tips_layer' class='sfile_tips_layer'>");
		htmls.push("			<table class='sfile_tips_table'>");
		htmls.push("				<tr><td id='sfile_tips_box'>");
		htmls.push("					<span id='sfile_tips' class='sfile_tips'></span>");
		htmls.push("				</td></tr>");
		htmls.push("			</table>");
		htmls.push("		</div>");
		htmls.push("	</div>");
		htmls.push("</div>");
		
		var $elem = $(htmls.join(""));
		bindEventHandlers($elem);
		
		return $elem;
	}

	/**
	 * 打开bootstrap dialog
	 */
	function openBootstrapDialog($content) {
		var dialog = new BootstrapDialog({
			cssClass:'windowSize',
			title: options.dialogTitle,
			type: BootstrapDialog.TYPE_PRIMARY,
			draggable: false,
            message: $content 
        });
		options.dialog = dialog;
		dialog.open();
	}


	/**
	 * 绑定事件处理函数
	 */
	function bindEventHandlers($target) {
		var $idFile = $target.find("#id_file");
		var $btnUpload = $target.find("#sfile_btn_upload");
		var $tips = $target.find("#sfile_tips");
		
		// 提示信息
		$tips.on("click", function(){
			$(this).hide();
		});

		// 选择文件
		$idFile.on("change", function(e){	
			fileChanged(this);
		});
		
		// 上传
		$btnUpload.on("click", function(e){
			var disbaled = $(this).attr("disabled");
			if(disbaled == "disabled") {
				return;
			}
			if(options.titleRequired) {
				var fileTitle = options.fileTitle;
				if(fileTitle == "") {
					showTips(true, "请输入图片标题！");
					return;
				}
			}

			if(options.valid) {
				enableChooseFile(false);
				showUploadingTips(true, "上传中，请稍后...");
				var params = {
					attachTypeName: options.attachTypeName,
					fileType: options.fileType,
				};
				$.ajaxFileUpload({
			        url: options.uploadUrl,	
			        secureuri: false,
			        fileElementId: "id_file",
			        data: params,
			        dataType: "json",
			        success: function(result) {
			        	if(result.success) { 
			        		alert("成功")// 上传成功
			        		var settings = {
		        				attachID: result.content,
		        				previewUrl:options.previewUrl
		        			};
		        			$("#id_file").on("change", function(e){	
		        				fileChanged(this);
		        			});
		        			options.comfirm(settings, options.dialog);
			        	} else { // 上传失败
			        		alert("失败")// 上传成功
			        		showTips(true, result.msg);
			        		$("#id_file").on("change", function(e){	
			        			fileChanged(this);
			        		});
			        		enableChooseFile(true);
			        	}
			        }, 
			        error: function() {
			        	showTips(true, "上传失败!");
			        	$("#id_file").on("change", function(e){	
			    			fileChanged(this);
			    		});
			        	enableChooseFile(true);
			        },
			        complete: function() {
			        	showUploadingTips(false);
			        }
			    });
			}
		});
	}

	/**
	 * 是否允许选择文件
	 */
	function enableChooseFile(enable) {
		if(enable) { // 允许选择
			$("#id_file").show();
			$("#sfile_btn_choose").removeAttr("disabled");
		} else { // 不允许选择
			$("#id_file").hide();
			$("#sfile_btn_choose").attr("disabled", "disabled");
			$("#sfile_btn_upload").attr("disabled", "disabled");
		}
	}
	/**
	 * 验证文件
	 */
	function validateFile(target) {
		var valid = false;
		var filename = $(target).val();
		filename = filename.replace(/.*(\/|\\)/, "");
		
		// 截取文件扩展名
		var extension = (/[.]\w+/.exec(filename)) ? /[^.]+$/.exec(filename.toLowerCase())[0] : ""; 
		if(options.filter != null && options.filter != ""){
			var filter = options.filter.split(";").join("|");
			var regexp = new RegExp(filter);
			if(regexp.test(extension)){
				options.filename = filename;
				options.fileType = extension;
				options.fileTitle = (extension == "") ? filename : filename.slice(0, filename.lastIndexOf(extension) - 1);
				valid = true;
			}else{
				var filter = options.filter.split(";").join("、");
				showTips(true, "请选择格式为" + filter + "的图片！");
				valid = false;
			}
		}else{
			options.filename = filename;
			options.fileType = extension;
			options.fileTitle = (extension == "") ? filename : filename.slice(0, filename.lastIndexOf(extension) - 1);
			valid = true;
		}
		if(checkFileSize()==false){
			valid = false;
		}
		
		$("#id_filename").val(filename);
		options.valid = valid;
		return valid;
	}
	/**
	 * 检查文件大小
	 */
	function checkFileSize(){
        var obj_file = document.getElementById("id_file");
        if(obj_file.value){
        	var filesize;
        	if(browserCfg.firefox || browserCfg.chrome ){  
        		filesize = obj_file.files[0].size;  
        	}else if(browserCfg.ie){  
        		/*filesize = obj_file.files[0].size; */ 
        		if(obj_file.files)
        		{
        			filesize = obj_file.files[0].size;
        		}
        		else
        		{
        			filesize = obj_file.document["fileSize"];
        		}
        	}else{
        		/*showTips(true, "不支持的浏览器，请使用chrome、firefox或者IE！");
        		return false;*/
        		filesize = obj_file.files[0].size;
        	}
        	if(filesize>options.maxSize*1024*1024){
        		showTips(true, "图片大小超过" + options.maxSize + "M！");
        		return false;
        	}
        }
	}


	function fileChanged(target) {
		if(!validateFile(target)) {
			$("#id_preview_wrapper").empty();
			$("#sfile_btn_upload").attr("disabled", "disabled");
		} else {
			showTips(false);
			appendPreviewBox(target);
			$("#sfile_btn_upload").removeAttr("disabled");
		}
	}

	function appendPreviewBox(target) {
		var htmls = new Array();
		htmls.push("<div>");
		htmls.push("	<div class='preview_box'>");
		htmls.push("		<div class='sfile_preview_inner_box'>");
		htmls.push("			<div class='preview_fake'>");
		htmls.push("				<img class='img_preview'/>");
		htmls.push("			</div>");
		htmls.push("		</div>");
		htmls.push("	</div>");
		htmls.push("	<form class='sfile_form' method='post' enctype='multipart/form-data' style='display:none;'>");
		htmls.push("	</form>");
		if(options.titleRequired) {
			htmls.push("<div class='img_title_box'>");
			htmls.push("	<p class='img_title'>{0}</p>".format(options.fileTitle));
			htmls.push("	<p><input class='title_input hiden' type='text' value='{0}'/></p>".format(options.fileTitle));
			htmls.push("</div>");
		}
		htmls.push("</div>");		
		var $elem = $(htmls.join(""));
		$("#id_preview_wrapper").empty().append($elem);
		
		var $form = $elem.find("form.sfile_form");
		//选择文件多次选择文件
		/*$form.empty().append($(target));*/
		$form.css({"display" : "block"});
		onUploadImageChange(target, $elem);
		$form.css({"display" : "none"});
		if(options.titleRequired) {
			// 为图片标题及文本框绑定事件处理函数
			var $title = $elem.find(".img_title");
			var $titleInput = $elem.find(".title_input");
			$title.on("click", function(e){
				$(this).hide();
				$titleInput.show().focus();
			});
			$titleInput.on("blur", function(e){
				$(this).hide();
				options.fileTitle = this.value;
				if(this.value == "") {
					$title.text("请输入标题");
				} else {
					$title.text(this.value);
				}
				$title.show();
			});
		}
	}

	/****************************************************************
	 * 
	 * 图片等比缩放功能实现
	 * 
	 ****************************************************************/
	function onUploadImageChange(sender, $target){  
	    var previewImg = $target.find(".img_preview")[0];  
	    var previewFake = $target.find(".preview_fake")[0]; 
	    var previewSizeFake = document.getElementById('preview_size_fake');
	    var previewBox = $target.find(".preview_box")[0];
	    var innerBox = $target.find(".preview_box .sfile_preview_inner_box")[0];
	       
	    if(sender.files && sender.files[0]){ 
	        previewImg.style.display = 'block';   
	        previewImg.style.width = 'auto';   
	        previewImg.style.height = 'auto';   
	           
	        // Firefox 因安全性问题已无法直接通过 input[file].value 获取完整的文件路径   
	        // previewImg.src = sender.files[0].getAsDataURL();  
	        
	        $(previewImg).on("load", function(e) {
	        	onPreviewImageLoad(this, innerBox.offsetWidth, innerBox.offsetHeight);
	        });
			previewImg.src = window.URL.createObjectURL(sender.files[0]);
			
	    }else if(previewFake.filters){  
	        // IE7,IE8 在设置本地图片地址为 img.src 时出现莫名其妙的后果   
	        //（相同环境有时能显示，有时不显示），因此只能用滤镜来解决   
	        // IE7, IE8因安全性问题已无法直接通过 input[file].value 获取完整的文件路径   
	    	previewSizeFake.style.display = 'block'; // display: none;的话则无法显示预览图片，故临时进行设置
	    	sender.select(); 
	    	$("#testFocusId").focus();
	        var imgSrc = document.selection.createRange().text;
	        
	        previewFake.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = imgSrc;   
	        previewSizeFake.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = imgSrc;   
	        
	        autoZoomPreviewImage(
	        		previewFake, 
	        		innerBox.offsetWidth, 
	        		innerBox.offsetHeight, 
	        		previewSizeFake.offsetWidth, 
	        		previewSizeFake.offsetHeight
	        );   
	        previewImg.style.display = 'none';  
	        previewSizeFake.style.display = 'none'; // 恢复display: none;
	    } 
	}
	
	function onPreviewImageLoad(sender, maxWidth, maxHeight){  
	    autoZoomPreviewImage(
	    		sender, 
	    		maxWidth, 
	    		maxHeight, 
	    		sender.offsetWidth, 
	    		sender.offsetHeight
	    );   
	}   

	/**
	 * 自动缩小预览图片
	 */
	function autoZoomPreviewImage(preview, maxWidth, maxHeight, originalWidth, originalHeight){   
	    var zoomParam = clacZoomParam(maxWidth, maxHeight, originalWidth, originalHeight);   
	    preview.style.width = zoomParam.width + 'px';   
	    preview.style.height = zoomParam.height + 'px';   
	    preview.style.marginTop = zoomParam.top + 'px';   
	    preview.style.marginLeft = zoomParam.left + 'px';   
	}   

	/**
	 * 计算缩小比例
	 */
	function clacZoomParam(maxWidth, maxHeight, width, height){   
	    var param = { width: width, height: height, top: 0, left: 0 };   
	       
	    if(width > maxWidth || height > maxHeight){   
	        var rateWidth = width / maxWidth;   
	        var rateHeight = height / maxHeight;   
	           
	        if(rateWidth > rateHeight){   
	            param.width = maxWidth;   
	            param.height = height / rateWidth;   
	        }else{   
	            param.width = width / rateHeight;   
	            param.height = maxHeight;   
	        }   
	    }   
	       
	    param.left = (maxWidth - param.width) / 2;   
	    param.top = (maxHeight - param.height) / 2;   
	       
	    return param;   
	}

	
	/*********************************************************************
	 * 显示提示信息
	 * @param text
	 *********************************************************************/
	function showTips(show, text) {
		var $tips = $("#sfile_tips");
		if(show === true) {
			$tips.text(text).show();
		} else {
			$tips.hide();
		}
	}
	
	function showUploadingTips(show, text) {
		if(show === true) {
			var htmls = new Array();
			$("#sfile_tips_layer").addClass("uploading_layer");
			$("#sfile_tips_box").append("<span id='sfile_uploading' class='sfile_uploading'>{0}</span>".format(text));
		} else {
			$("#sfile_tips_layer").removeClass("uploading_layer");
			$("#sfile_uploading").remove();
		}
	}
});