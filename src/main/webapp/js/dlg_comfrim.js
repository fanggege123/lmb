document.write("<div class=\"modal fade\" id=\"dlg_comfrim\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">");
document.write("<div class=\"modal-dialog modal_delete\">");
document.write("<div class=\"modal-comfrim-content\">");
document.write("<div class=\"modal-header\">");
document.write("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" onclick=\"_closeDlg();\" aria-label=\"Close\">");
document.write("<span aria-hidden=\"true\">&times;</span>");
document.write("</button>");
document.write("<h4 class=\"modal-title\"><span id=\"comfrim_title\" ></span></h4>");
document.write("</div>");
document.write("<div class=\"modal-body\">");
document.write("<div class=\"dot_cont\">");
document.write("<h4><span id=\"comfrim_msg\"></span></h4>");
document.write("</div>");
document.write("</div>");
document.write("<div class=\"modal-footer\">");
document.write("<input type=\"hidden\" id=\"comfrimId\"/>");
document.write("<input type=\"hidden\" id=\"comfrim_objectId\"/>");
document.write("<button id=\"comfrimButton\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onclick=\"_confirmDlg();comfrim();\">确定</button>");
document.write("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onclick=\"_cancelDlg();\">取消</button>");
document.write("</div>");
document.write("</div>");
document.write("</div>");
document.write("</div>");

var fun;
/**
 * 页面中确认提示框
 * @param title 提示框标签
 * @param msg 提示信息
 * @param returnFun(b) 当用户点击按钮后触发的回调函数，如果点击OK则给回调函数传true,如果点击cancel则传false
 * 
 */
function messageComfrim(title,msg,returnFun,iframeLeft,iframeTop)
{
    fun = returnFun;
    $("#comfrim_title").html(title);
    $("#comfrim_msg").html(msg);
    $("#dlg_comfrim").modal("show"); 
    setComfrimCenter(iframeLeft,iframeTop);
}

function _closeDlg()
{
    if(fun != undefined)
    {
        fun(false);
    }
}
function _confirmDlg()
{
    if(fun != undefined)
    {
        fun(true);
    }
}
function _cancelDlg()
{
    if(fun != undefined)
    {
        fun(false);
    }
}


//模态框居中
/**
  * iframeLeft 有iframe是的top高度，可不填
  * iframeTop 有iframe是的top高度，可不填
  */
function setComfrimCenter(iframeLeft,iframeTop) {
  	var obj = $('.modal-comfrim-content');
  	var btHeight = 0;
  	var objTop = 0;
  	var btTop = 0;
  	var iframeMinusTop = 0;
  	if(iframeTop == undefined){
  		iframeTop = 0;
  	}else{
  		iframeMinusTop = iframeTop * 3 / 2;
  		btHeight = $(parent).height();
  		btTop = $(parent).scrollTop();
  		objTop = (btHeight - obj.height())/2 + btTop;
  	  	if(objTop > iframeTop){
  	  		objTop = objTop - iframeMinusTop;
  	  	}
  	}
  	obj.css({top: objTop + 'px','display': 'block'});
  	obj = null;
  	btHeight = null;
  	objTop = null;
  	btTop = null;
  	iframeMinusTop = null;
  	//浏览器窗口大小改变时
  	$(parent).resize(function() {
  	  	var obj = $('.modal-comfrim-content');
  	  	var btHeight = 0;
  	  	var objTop = 0;
  	  	var btTop = 0;
  	  	var iframeMinusTop = 0;
  	  	if(iframeTop == undefined){
  	  		iframeTop = 0;
  	  	}else{
  	  		iframeMinusTop = iframeTop * 3 / 2;
  	  		btHeight = $(parent).height();
  	  		btTop = $(parent).scrollTop();
  	  		objTop = (btHeight - obj.height())/2 + btTop;
  	  	  	if(objTop > iframeTop){
  	  	  		objTop = objTop - iframeMinusTop;
  	  	  	}
  	  	}
  		obj.css({top: objTop + 'px','display': 'block'});
  	  	obj = null;
  	  	btHeight = null;
  	  	objTop = null;
  	  	btTop = null;
  	  	iframeMinusTop = null;
  	});
  //浏览器有滚动条时的操作、
  	$(parent).scroll(function() {
  	  	var obj = $('.modal-comfrim-content');
  	  	var btHeight = 0;
  	  	var objTop = 0;
  	  	var btTop = 0;
  	  	var iframeMinusTop = 0;
  	  	if(iframeTop == undefined){
  	  		iframeTop = 0;
  	  	}else{
  	  		iframeMinusTop = iframeTop * 3 / 2;
  	  		btHeight = $(parent).height();; //浏览器当前窗口可视区域高度
  	  		btTop = $(parent).scrollTop();
  	  		objTop = (btHeight - obj.height())/2 + btTop;  
  	  		if(self.frameElement && self.frameElement.tagName=="IFRAME"){ //在iframe中
  	  			objTop = objTop - 111 - 70 - 20;//111为iframe上面的导航栏和标签页的高度,70为css中的margin-top高度
			} else { //不在iframe中
				objTop = objTop;
			}
  	  	  	if(objTop > iframeTop){
  	  	  		objTop = objTop - iframeMinusTop;
  	  	  	}
  	  	}
  		obj.css({top: objTop + 'px','display': 'block'});
  	  	obj = null;
  	  	btHeight = null;
  	  	objTop = null;
  	  	btTop = null;
  	  	iframeMinusTop = null;
  	});
  }