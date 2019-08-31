document.write("<div class=\"modal fade\" id=\"dlg_alert\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"> ");
document.write("<div class=\"modal-dialog modal_delete\">");
document.write("<div class=\"modal-alert-content\">");
document.write("<div class=\"modal-header\"> ");
document.write("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" onclick=\"_closeDlg();\" aria-label=\"Close\">");
document.write("<span aria-hidden=\"true\">&times;</span>");
document.write("</button>");
document.write("<h4 class=\"modal-title\" style=\"text-align:left;\"><span id=\"alert_title\"></span></h4>");
document.write("</div> ");
document.write("<div class=\"modal-body\"> ");
document.write("<div class=\"dot_cont\" style=\"text-align: center;\" >");
document.write("<h4><span id=\"alert_msg\"></span></h4>");
document.write("</div> ");
document.write("</div> ");
document.write("<div class=\"modal-footer\"> ");
document.write("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onclick=\"_closeDlg();\" style=\"float:right;\">确定</button>");
document.write("</div> ");
document.write("</div> ");
document.write("</div> ");
document.write("</div> ");

var fun;
/**
 * 使用前页面必须引用dlg_alert.js
 * 页面中alert提示框
 * @param title 提示框标题
 * @param msg 提示信息
 * @param returnFun 窗口关闭时的回调函数
 */
function messageAlert(title,msg,returnFun){
	if(title==null){
		title="提示";
	}
    $("#alert_title").html(title);
    $("#alert_msg").html(msg);
    $("#dlg_alert").modal({"show":true,"backdrop":"static"}); 
    fun = returnFun;
}
function _closeDlg()
{
    if(fun != undefined)
    {
        fun();
    }
}
