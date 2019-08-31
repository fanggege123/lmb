// JavaScript Document


//主站轮播图
//2015-03-20

$(function(){

	var Slide_boxWidth=$("#banner").width();//获取幻灯片外部div宽度
	var Slide_boxHeight=$("#banner").height();//获取幻灯片外部div高度
	var Slide_LiWidth=$("#banner").children("ul").children("li").eq(0).width();//获取幻灯片Li的宽度
	var Slide_liNubr=$("#banner").find('li').length;//获取幻灯片Li的数量
	var Slide_Speed=3500;//滚动速度

	if( Slide_liNubr < 3 ){
		return false;   //图片小于三张不执行
	}
	
	for(var i=0;i<parseInt(Slide_liNubr);i++){
		if(i == parseInt(Slide_liNubr-1)){
			$("#banner").children("ul").children("li").eq(i).css("left",-Slide_LiWidth);
		} else {
			$("#banner").children("ul").children("li").eq(i).css("left",i*Slide_LiWidth);//初始化Li位置
		}
	}
	var Slide_Run = setInterval(Slide_Next,Slide_Speed)//设置滚动器
	
	function Slide_Next(){
		for(var k=0;k<parseInt(Slide_liNubr);k++){
			if(parseInt($("#banner").children("ul").children("li").eq(k).css("left"))==-Slide_LiWidth)//判断LI是否有位移到0，防止同时多次点击出错
			{
				
				var Slide_liSeat=0;//位置参数归零
				for(var j=0;j<parseInt(Slide_liNubr);j++){
					if(parseInt($("#banner").children("ul").children("li").eq(j).css("left"))==-Slide_LiWidth){//判断是否第一个
						
						$("#banner").children("ul").children("li").eq(j).css("left",Slide_LiWidth*(Slide_liNubr-2));//第一个回到最后一个

						}else{
							
						Slide_liSeat=parseInt($("#banner").children("ul").children("li").eq(j).css("left"))-Slide_LiWidth;//获取位移位置
						$("#banner").children("ul").children("li").eq(j).animate({left:Slide_liSeat},"slow");//进行位移动画

						}
					}
					
				}
			}
	}
	
	function Slide_Last(){
		for(var k=0;k<parseInt(Slide_liNubr);k++){
			if(parseInt($("#banner").children("ul").children("li").eq(k).css("left"))==0)//判断LI是否有位移到0，防止同时多次点击出错
			{
				
				var Slide_liSeat=0;//位置参数归零
				for(var j=0;j<parseInt(Slide_liNubr);j++){
					if(parseInt($("#banner").children("ul").children("li").eq(j).css("left"))==Slide_LiWidth*(Slide_liNubr-2)){//判断是否第一个
						
						$("#banner").children("ul").children("li").eq(j).css("left",-Slide_LiWidth);//第一个回到最后一个
						
						}else{
							
						Slide_liSeat=parseInt($("#banner").children("ul").children("li").eq(j).css("left"))+Slide_LiWidth;//获取位移位置
						$("#banner").children("ul").children("li").eq(j).animate({left:Slide_liSeat},"slow");//进行位移动画
						
						}
					}
					
				}
			}
	}

	$(".arrows").mouseenter(function(){ $(this).find("i").show(); }); //鼠标滑过显示箭头
	$(".arrows").mouseleave(function(){ $(this).find("i").hide(); });
	$("#banner .next").click(Slide_Next);//下一张按钮
	$("#banner .prev").click(Slide_Last);//上一张按钮
	$("#banner").mouseenter(function(){clearInterval(Slide_Run)});//鼠标在幻灯片上，停止滚动
	$("#banner").mouseleave(function(){Slide_Run = setInterval(Slide_Next,Slide_Speed)})//鼠标不在幻灯哦上，开始滚动
})		