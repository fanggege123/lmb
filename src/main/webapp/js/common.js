/**
 * @author 
 * @date 2014-06-04
 * 
 */

var ISS = {
	version : '1.0',
	Core:{},
	Constants:{}
};
ISS.Constants.status = {
		SUCCESS:0,
		FAILD:1,
		NOLOGIN:2
};

String.prototype.encode = function() {
    return this.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "'");
};
String.prototype.getLength = function() {
    var a, b;
    b = 0;
    for (a = 0; a < this.length; a++) {
        if ((this.charCodeAt(a) >= 0) && (this.charCodeAt(a) <= 255)) {
            b = b + 1;
        } else {
            b = b + 3;
        }
    }
    return b;
};

String.prototype.encodeURI = function() {
    return encodeURIComponent(this);
};
String.prototype.fillChar = function(c, e, d) {
    if (!d) {
        d = "0";
    }
    var b = this.length - c;
    if (b > 0) {
        return e ? this.substr(0, c) : this.substr(b, c);
    } else {
        var a = "";
        b = Math.abs(b) / d.length;
        for (; b > 0; b--) {
            a += d;
        }
        return e ? this + a: a + this;
    }
};
String.prototype.format = function(a, d) {
    var c, b;
    if (typeof a == "object") {
        c = a;
        b = d;
    } else {
        c = arguments;
    }
    return this.replace(/\{(\d+)\}/g,
    function(e, f) {
        return b ? c[f].encodeURI() : ("" + c[f]).encode();
    });
};
String.prototype.formatText = function() {
    var a = arguments;
    return this.replace(/\{(\d+)\}/g,
    function(b, c) {
        return a[c];
    });
};

String.prototype.formatValue = function() {
    var a = arguments;
    return this.replace(/\{(\d+)\}/g,
    function(b, c) {
        return ("" + a[c]).encode();
    });
};
String.prototype.formatURI = function() {
    var a = arguments;
    return this.replace(/\{(\d+)\}/g,
    function(b, c) {
        if (a[c] === null) {
            return "";
        } else {
            if (typeof a[c] == "string") {
                return a[c].encodeURI();
            } else {
                return a[c];
            }
        }
    });
};
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.isEmpty = function() {
    return this.trim().length == 0;
};
String.prototype.len = function() {
    var a = this.trim();
    if (a.length) {
        return a.replace(/[^x00-xff]/g, "**").length;
    }
    return 0;
};
String.prototype.replaceText = function(a, b) {
    return this.replace(new RegExp(a, "gm"), b);
};

String.prototype.toDateTime = function() {
    return this.toDate()
};
String.prototype.replaceAll = function(a, b) {
    return this.replace(new RegExp(a, "gm"), b)
};

String.prototype.toDate = function(b) {
    var a;
    if (this.indexOf("T") > 0) {
        a = ISS.Core.DateHandle.getStrArray(this.substr(0, 19).replace("T", " "), ISS.Config.Format.sysDateTime, true);
        a && a.push(this.split(".").pop() * 1)
    } else {
        a = ISS.Core.DateHandle.getStrArray(this, b, this.length > 10)
    }
    if (a && a[0] > 0 && a[1] > -1) {
        return new Date(a[0], a[1], a[2] || 1, a[3] || 0, a[4] || 0, a[5] || 0, a[6] || 0)
    }
    return null
};
String.prototype.validDate = function(c, b) {
    var a = ISS.Core.DateHandle.getStrArray(this, c, b);
    return a ? (b ? ISS.Core.DateHandle.checkDateTimeStr(a) : ISS.Core.DateHandle.checkDateStr(a)) : false
};
ISS.Core.DateHandle = {
    getStrArray: function(l, q, n) {
        l = l.trim();
        var b = this.getDateRegular(l, q, n);
        if (b) {
            if ($.type(b) == "object") {
                var a = l.match(b.reg),
                h = (b.reg + "").replaceText("d", "w"),
                d = b.format.match(new RegExp(h.substring(1, h.length - 1)));
                if (a && d && a.length == d.length) {
                    var j = [0, 0, 0, 0, 0, 0];
                    for (var g = 1,
                    k = a.length; g < k; g++) {
                        var o = a[g] * 1;
                        if (o) {
                            var s = d[g];
                            this.matchDateArray(j, o, s)
                        }
                    }
                    return j
                }
            } else {
                var j = [0, 0, 0, 0, 0, 0],
                r = 0,
                m = 0,
                o,
                s,
                f;
                for (var g = 0,
                k = l.length; g < k; g++) {
                    var c = l.substr(g, 1),
                    f = isNaN(c * 1) || c.trim() == "";
                    if (f || (g == k - 1 && r < g && (g++))) {
                        f || g++;
                        o = l.substring(r, g) * 1;
                        if (f) {
                            r = g + 1;
                            var e = b.indexOf(c, m);
                            s = b.substring(m, e);
                            m = e + 1
                        } else {
                            s = b.substring(m)
                        }
                        this.matchDateArray(j, o, s)
                    }
                }
                return j
            }
        }
        return null
    },
    matchDateArray: function(a, b, c) {
        if (c) {
            switch (c) {
            case "yyyy":
                a[0] = b;
                break;
            case "MM":
                a[1] = b - 1;
                break;
            case "dd":
                a[2] = b;
                break;
            case "hh":
                a[3] = b;
                break;
            case "mm":
                a[4] = b;
                break;
            case "ss":
                a[5] = b;
                break
            }
        }
    },
    getDateRegular: function(d, e, c) {
        if (e == null) {
            var a = c ? "sysDateTime": "sysDate",
            b = ISS.Config.Regular[a];
            if (b.test(d)) {
                return {
                    reg: b,
                    format: ISS.Config.Format[a]
                }
            }
            a = c ? "datetime": "date",
            b = ISS.Config.Regular[a];
            if (b.test(d)) {
                return {
                    reg: b,
                    format: ISS.Config.Format[a]
                }
            }
        }
        return e
    },
    checkDateStr: function(a) {
        var d = a[0],
        e = a[1],
        b = a[2],
        c = new Date(d, e, b);
        return c ? (c.getFullYear() == d && c.getMonth() == e && c.getDate() == b) : false
    },
    checkDateTimeStr: function(a) {
        var e = a[0],
        f = a[1],
        c = a[2],
        b = a[3],
        g = a[4],
        d = new Date(e, f, c, b, g);
        return d ? (d.getFullYear() == e && d.getMonth() == f && d.getDate() == c && d.getHours() == b && d.getMinutes() == g) : false
    }
};

Array.prototype.remove = function(b) {
    for (var a = 0; a < this.length; a++) {
        if (b == this[a]) {
            this.splice(a, 1)
        }
    }
};
Array.prototype.contains = function(b) {
    for (var a = 0; a < this.length; a++) {
        if (this[a] !== "" && b == this[a]) {
            return true
        }
    }
    return false
};
Array.prototype.appendFormat = function(b, a) {
    this.push($.isPlainObject(a) ? b.formatField(a) : b.formatText(a));
    return this
};


ISS.HashMap={};

ISS.HashMap = function() {
    this.keys = new Array();
    this.data = new Object();
    this.put = function(a, b) {
        if (this.data[a] == null) {
            this.keys.push(a);
        }
        this.data[a] = b;
    };
    this.get = function(a) {
        return this.data[a]
    };
    this.remove = function(a) {
        this.keys.remove(a);
        this.data[a] = null
    };
    this.each = function(d) {
        if (typeof d != "function") {
            return
        }
        var a = this.keys.length;
        for (var c = 0; c < a; c++) {
            var b = this.keys[c];
            d(b, this.data[b], c)
        }
    };
    this.entrys = function() {
        var a = this.keys.length;
        var c = new Array(a);
        for (var b = 0; b < a; b++) {
            c[b] = {
                key: this.keys[b],
                value: this.data[b]
            }
        }
        return c
    };
    this.isEmpty = function() {
        return this.keys.length == 0
    };
    this.size = function() {
        return this.keys.length
    };
    this.toString = function() {
        var c = "{";
        for (var b = 0; b < this.keys.length; b++, c += ",") {
            var a = this.keys[b];
            c += a + "=" + this.data[a]
        }
        c += "}";
        return c
    }
};
ISS.StringBuilder = function(a) {
    this.strings = new Array();
    if (a && a.length > 0) {
        this.append(a)
    }
};
ISS.StringBuilder.prototype.append = function(a) {
    if (a && a.length > 0) {
        this.strings.push(a)
    }
    return this
};
ISS.StringBuilder.prototype.isNotEmpty = function() {
    return this.strings.length > 0
};
ISS.StringBuilder.prototype.clear = function() {
    this.strings.length = 0
};
ISS.StringBuilder.prototype.toString = function(a) {
    return this.strings.join(a || "")
};
ISS.StringBuilder.prototype.removeLast = function() {
    this.strings = this.strings.slice(0, -1);
    return this
};



/* 字符串的连接处理 */
function StringBuffer() {
	this._strings = new Array();
};
StringBuffer.prototype.append = function(str) {
	this._strings.push(str);
};
StringBuffer.prototype.toString = function() {
	return this._strings.join("");
};


ISS.Core.Namespace = {
    register: function(d) {
        var b = window;
        var e = d.split(".");
        var a = e.length;
        for (var c = 0; c < a; c++) {
            b = b[e[c]] = b[e[c]] || {}
        }
        return b
    },
    getVariable: function(name) {
        var value = false;
        try {
            value = eval(name) || false
        } catch(e) {}
        return value
    },
    get: function(a) {
        if (a) {
            a = a.split(".");
            if (a.length) {
                var c = window;
                for (var b = 0; c && a[b]; b++) {
                    c = c[a[b]]
                }
                return c
            }
        }
        return null
    }
};

ISS.Core.log = function(a, b) {
    window.console && window.console.log(a)
};
	
ISS.Core.getParameter = function(property, url) {
	var parseUrl = url;
	if(parseUrl == null){
		parseUrl = String(window.document.location.href);
	}
	var rs = new RegExp("(^|)" + property + "=([^\&#]*)(\&|#|$)", "gi").exec(parseUrl), tmp;
	if (tmp = rs) {
		return tmp[2];
	}
	return "";
};
/**
 * 获取反编译后的参数
 */
ISS.Core.getDecParameter = function(property) {
	
	var reg = new RegExp("(^|&)" + property + "=([^&]*)(&|$)");
	var r = decodeURI(decodeURI(window.location.search)).substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
};

ISS.Core.ajax = function(req){
	if(!req || !req.url){
		throw new Error('InvalidParameterException. req is null or url is null'); 
	}
	var data = {pageSize:8};
	data = $.extend(data,req.params);
	$.ajax({
		type : req.type || "POST",
		url : req.url,
		contentType : req.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
		data :data,
		dataType :  req.dataType ||"json",
		async : req.async==null?true:req.async,	
		beforeSend:function(){
			if(!req.isHideLoading){
				$("body").loading();		
			}
		},
		success : function(result) {
//			if(result && result.rcode==ISS.Constants.status.NOLOGIN){				
//				window.top.location.href=ISS.Config.Global.rootUrl+ "module/auth/login.html";	
//			}	
			req.success && req.success(result);
			if(!req.isHideLoading){
				$("body").loadingClose();	
			}				
			req.complete && req.complete(result);			
		},
		error : function(a, b, c) {
		}
	});
};
/*
 * 分页
 */
$.fn.Pagination = function (req,paginationPannel) {
	var opts = $.extend({
		page : 1,
		rows : 3
	}, req.data || {});
	var $table = this;	
	if(!paginationPannel){
		$table.after('<div class="page"></div>');
	}
	var selector = paginationPannel || ".page";
	var $paginationPannel ;
	var drawLinks = function (totalSize) {
		var currentPage = Math.round(opts.page), totalPage = Math.ceil(totalSize / opts.rows);
		var htm_page = [];
		htm_page.push('<div class ="paginationPannel">');
		htm_page.push('<span class="page-a">');
		if(currentPage <= 1){
			/*
			htm_page.push('<span class="display" title="首页">首页</span>');
			htm_page.push('<span class="display" title="上一页">上一页</span>');
			*/
			htm_page.push('<a value="-1" class="fail" href="javascript:void(0)" title="首页"><span class="crumb-ico2"></span>首页</a>');
			htm_page.push('<a value="-1" class="fail" href="javascript:void(0)" title="上一页"><span class="crumb-ico2"></span>上一页</a>');
		}else{
			htm_page.push('<a value="1" class="prev" href="javascript:void(0)" title="首页"><span class="crumb-ico2"></span>首页</a>');
			htm_page.push('<a value="{0}" class="prev" href="javascript:void(0)" title="上一页"><span class="crumb-ico2"></span>上一页</a>'.format(currentPage - 1 < 1 ? 1 : currentPage-1));			
		}
		if (currentPage > 3) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(1, 1));
			if(currentPage - 2 != 2){
				htm_page.push('	<span>…</span>');				
			}
		}		
		if (currentPage > 2) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(currentPage - 2, currentPage - 2));
		}
		if (currentPage > 1) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(currentPage - 1, currentPage-1));
		}

		/*htm_page.push('<span class="current">{1}</span>'.format(currentPage, currentPage));*/
		htm_page.push('<a value="{0}" class="on" href="javascript:void(0)">{1}</a>'.format(currentPage, currentPage));
		
		if (totalPage - currentPage > 0) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(currentPage + 1, currentPage + 1));
		}
		if (totalPage - currentPage > 1) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(currentPage + 2, currentPage + 2));
		}
		if (totalPage - currentPage > 2) {
			if(totalPage != currentPage+3){
				htm_page.push('<span>…</span>');				
			}
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(totalPage, totalPage));
		}
		if(totalPage == currentPage){
			/*
		    htm_page.push('<span class="display" title="下一页">下一页</span>');
		    htm_page.push('<span class="display" title="尾页">尾页</span>');
		    */
		    htm_page.push('<a value="-1" class="fail" href="javascript:void(0)" title="下一页"><span class="crumb-ico2"></span>下一页</a>');
			htm_page.push('<a value="-1" class="fail" href="javascript:void(0)" title="尾页"><span class="crumb-ico2"></span>尾页</a>');
		}else{
			htm_page.push('<a value="{0}" class="next" href="javascript:void(0)" title="下一页">下一页<span class="crumb-ico2"></span></a>'.format(currentPage + 1 < totalPage ? currentPage+1 : totalPage));			
			htm_page.push('<a value="{0}" class="next" href="javascript:void(0)" title="尾页">尾页<span class="crumb-ico2"></span></a>'.format(totalPage));			
		}
		htm_page.push('</span>');
		htm_page.push('<span><em>&nbsp;共{0}页&nbsp;&nbsp;到第 </em></span>'.format(totalPage));
		htm_page.push('<input type="text" value="" class ="page_bar_input" name="scannerpage" /> 页');
		htm_page.push('<input type="button" value="跳转" class="page_bar_btn">');	
		htm_page.push('</div>');	
		
		$paginationPannel = $(htm_page.join(""));		
		$(selector).html($paginationPannel.html()).show();
		
		$(selector).find("a").not(".jump").click(function () {
			var _page = $(this).attr("value");
			if (_page < 0 || (opts.page <= 0 && opts.page == _page)) {
//				alert("这已经是第一页了!");
				return false;
			}
			if (_page > totalPage || (opts.page >= totalPage - 1 && opts.page == _page)) {
//				alert("这已经是最后一页了!");
				return false;
			}
			if(_page == opts.page) {
				return false;
			}
			opts.page = _page;
			reqestList();
		});
		$(selector).find(".page_bar_btn").click(function () {			
			var $scannerpage =$(selector).find("input[name=scannerpage]");
			var _togo = $scannerpage.val();
			
			if (parseInt(_togo) != _togo) {
				// alert("请输入正确的页码数,只能输入数字!");
				// return false;
				_togo =totalPage;
			}
			if (parseInt(_togo) > totalPage || parseInt(_togo) < 1) {
				// alert("只能是第一页到总页数之间!");
				// return false;
				_togo =totalPage;
			}

			opts.page = _togo;
			reqestList();
		});
		
	};
	var reqestList = function () {		
		if(!req || !req.url){
			throw new Error('InvalidParameterException. req is null or url is null'); 
		}	
		$.ajax({
			type : req.type || "POST",
			url : req.url,
//			contentType : 'application/json',
			timeout : req.connTimeout || 60000,
			data : opts,
			dataType :  req.dataType ||"json",
			async : req.async || true,	
			beforeSend:function(){
				if(!req.isHideLoading){
					$("body").loading();		
				}
			},
			complete : function(result) { 
				if(!req.isHideLoading){
					$("body").loadingClose();	
				}				
				req.complete && req.complete(result);				
			},
			success : function(result) {
//				if(result && result.rcode==ISS.Constants.status.NOLOGIN){
//					window.top.location.href=ISS.Config.Global.rootUrl+ "module/auth/login.html";	
//				}	
				if (result) {					
					if (result.rows) {
						if(result.rows.length>0){
							$table.find("ul").show();
						}else{
							$table.find("ul").hide();
						}
						if(!result.currentPage) {
							result.currentPage = opts.page;
						}
						req.success && req.success(result, $table.find("li"));
					} else {
						$table.find("ul").hide();
					}
					if (result.total) {
						drawLinks(result.total);
					} else {
						$(selector).html("<div class='center_data'>暂无数据</div>");
					}
				}
			},
			error : function(a, b, c) {				
//				req.error && req.error(a,b,c);
//				if(a.readyState === 0 && a.status ===0){
//					alert("网络连接失败，请稍候重试！");
//				}
			}
		});
	};
	reqestList();
};

$.fn.emPagination = function (req,paginationPannel) {
	var opts = $.extend({
		page : 1,
		rows : 3
	}, req.data || {});
	var $table = this;	
	if(!paginationPannel){
		$table.after('<div class="page_bar"></div>');
	}
	var selector = paginationPannel || ".page_bar";
	var $paginationPannel ;
	var drawLinks = function (totalSize) {
		var currentPage = Math.round(opts.page), totalPage = Math.ceil(totalSize / opts.rows);
		var htm_page = [];
		htm_page.push('<div class ="paginationPannel">');
		if(currentPage <= 1){
			htm_page.push('<a value="-1" class="fail" href="javascript:void(0)" title="首页"><span>首页</span></a>');
			htm_page.push('<a value="-1" class="fail" href="javascript:void(0)" title="上一页"><span>上一页</span></a>');
		}else{
			htm_page.push('<a value="1" class="prev" href="javascript:void(0)" title="首页"><span>首页</span></a>');
			htm_page.push('<a value="{0}" class="prev" href="javascript:void(0)" title="上一页"><span>上一页</span></a>'.format(currentPage - 1 < 1 ? 1 : currentPage-1));			
		}
		if (currentPage > 3) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(1, 1));
			if(currentPage - 2 != 2){
				htm_page.push('<span class="page_bar_text_m">…</span>');				
			}
		}		
		if (currentPage > 2) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(currentPage - 2, currentPage - 2));
		}
		if (currentPage > 1) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(currentPage - 1, currentPage-1));
		}

		htm_page.push('<a value="{0}" class="on" href="javascript:void(0)">{1}</a>'.format(currentPage, currentPage));
		
		if (totalPage - currentPage > 0) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(currentPage + 1, currentPage + 1));
		}
		if (totalPage - currentPage > 1) {
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(currentPage + 2, currentPage + 2));
		}
		if (totalPage - currentPage > 2) {
			if(totalPage != currentPage + 3){
				htm_page.push('<span class="page_bar_text_m">…</span>');				
			}
			htm_page.push('<a value="{0}" href="javascript:void(0)">{1}</a>'.format(totalPage, totalPage));
		}
		if(totalPage == currentPage){
		    htm_page.push('<a value="-1" class="fail" href="javascript:void(0)" title="下一页"><span>下一页</span></a>');
			htm_page.push('<a value="-1" class="fail" href="javascript:void(0)" title="尾页"><span>尾页</span></a>');
		}else{
			htm_page.push('<a value="{0}" class="next" href="javascript:void(0)" title="下一页"><span>下一页</span></a>'.format(currentPage + 1 < totalPage ? currentPage+1 : totalPage));			
			htm_page.push('<a value="{0}" class="next" href="javascript:void(0)" title="尾页"><span>尾页</span></a>'.format(totalPage));			
		}
		htm_page.push('<span class="page_bar_text_t">共{0}页</span>到第'.format(totalPage));
		htm_page.push('<input type="text" class="page_bar_input" name="scannerpage">页');
		htm_page.push('<input type="button" value="跳转" class="page_bar_btn">');	
		htm_page.push('</div>');	
		
		$paginationPannel = $(htm_page.join(""));		
		$(selector).html($paginationPannel.html()).show();
		
		$(selector).find("a").not(".jump").click(function () {
			var _page = $(this).attr("value");
			if (_page < 0 || (opts.page <= 0 && opts.page == _page)) {
				//alert("这已经是第一页了!");
				return false;
			}
			if (_page > totalPage || (opts.page >= totalPage - 1 && opts.page == _page)) {
				//alert("这已经是最后一页了!");
				return false;
			}
			if(_page == opts.page) {
				return false;
			}
			opts.page = _page;
			reqestList();
		});
		$(selector).find(".page_bar_btn").click(function () {			
			var $scannerpage =$(selector).find("input[name=scannerpage]");
			var _togo = $scannerpage.val();
			
			if (parseInt(_togo) != _togo) {
				// alert("请输入正确的页码数,只能输入数字!");
				// return false;
				_togo =totalPage;
			}
			if (parseInt(_togo) > totalPage || parseInt(_togo) < 1) {
				// alert("只能是第一页到总页数之间!");
				// return false;
				_togo =totalPage;
			}

			opts.page = _togo;
			reqestList();
		});
		
	};
	var reqestList = function () {		
		if(!req || !req.url){
			throw new Error('InvalidParameterException. req is null or url is null'); 
		}	
		$.ajax({
			type : req.type || "POST",
			url : req.url,
			//contentType : 'application/json',
			timeout : req.connTimeout || 60000,
			data : opts,
			dataType :  req.dataType ||"json",
			async : req.async || true,	
			beforeSend:function(){
				if(!req.isHideLoading){
					$("body").loading();		
				}
			},
			complete : function(result) { 
				if(!req.isHideLoading){
					$("body").loadingClose();	
				}				
				req.complete && req.complete(result);				
			},
			success : function(result) {
				/*if(result && result.rcode==ISS.Constants.status.NOLOGIN){
					window.top.location.href=ISS.Config.Global.rootUrl+ "module/auth/login.html";	
				}*/	
				if (result) {					
					if (result.rows) {
						if(result.rows.length>0){
							$table.find("ul").show();
						}else{
							$table.find("ul").hide();
						}
						if(!result.currentPage) {
							result.currentPage = opts.page;
						}
						req.success && req.success(result, $table.find("li"));
					} else {
						$table.find("ul").hide();
					}
					if (result.total) {
						drawLinks(result.total);
					} else {
						$(selector).html("<div class='center_data'>暂无数据</div>");
					}
				}
			},
			error : function(a, b, c) {				
//				req.error && req.error(a,b,c);
//				if(a.readyState === 0 && a.status ===0){
//					alert("网络连接失败，请稍候重试！");
//				}
			}
		});
	};
	reqestList();
};

//下滑获取更多列表数据
$.fn.nextPagination = function (req,paginationPannel) {
	var pageNum = 1;
	var rowsNum = 5;
	if(req.data.page  != null && req.data.page != undefined){
		pageNum = req.data.page;
	}
	if(req.data.rows  != null && req.data.rows != undefined){
		rowsNum = req.data.rows;
	}
	var opts = $.extend({
			page : pageNum,
			rows : rowsNum
		}, req.data || {});
	var $table = this;	
	if(!paginationPannel){
		$table.after('<div class="page_bar"></div>');
	}
	var selector = paginationPannel || ".page_bar";
	var $paginationPannel ;
	var drawLinks = function (totalSize) {
		var currentPage = Math.round(opts.page), totalPage = Math.ceil(totalSize / opts.rows);
		var htm_page = [];
		htm_page.push('<div class ="paginationPannel" id="hidden">');
		htm_page.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a value="{0}" href="javascript:void(0)" id="getMoreDataA" title="加载更多"><span>加载更多</span></a>'.format(currentPage + 1 < totalPage ? currentPage+1 : totalPage));
		htm_page.push('</div>');
		$paginationPannel = $(htm_page.join(""));		
		$(selector).html($paginationPannel.html()).show();
		
		$(selector).find("a").not(".jump").click(function () {
			var _page = $(this).attr("value");
			if (_page > totalPage || (opts.page >= totalPage - 1 && opts.page == _page)) {
				$("#getMoreDataA").hide();
				$("#ul_platform_dynamics").append($("#noMoreData").empty().html("<span>全部显示完成</span>"))
				return false;
			}
			opts.page = _page;
			reqestList();
		});
	};
	var reqestList = function () {
		if(!req || !req.url){
			throw new Error('InvalidParameterException. req is null or url is null'); 
		}	
		$.ajax({
			type : req.type || "POST",
			url : req.url,
			timeout : req.connTimeout || 60000,
			data : opts,
			dataType :  req.dataType ||"json",
			async : req.async || true,	
			beforeSend:function(){
				$('#getMoreDataA').hide();
				if(!req.isHideLoading){
					$("body").loading();		
				}
			},
			complete : function(result) {
				$('#getMoreDataA').show();
				if(!req.isHideLoading){
					$("body").loadingClose();	
				}				
				req.complete && req.complete(result);				
			},
			success : function(result) {
				if (result) {
					if (result.rows) {
						if(result.rows.length>0){
							$table.find("ul").show();
						}else{
							$table.find("ul").hide();
						}
						if(!result.currentPage) {
							result.currentPage = opts.page;
						}
						req.success && req.success(result, $table.find("li"));
					} else {
						$table.find("ul").hide();
					}
					if (result.total) {
						drawLinks(result.total);
					} else {
						$(selector).html("<div style='text-align:center;width:608px;'>暂无数据</div>");
					}
				}
			},
			error : function(a, b, c) {				
				/*req.error && req.error(a,b,c);
				if(a.readyState === 0 && a.status ===0){
					alert("网络连接失败，请稍候重试！");
				}*/
			}
		});
	};
	reqestList();
};

ISS.Config = {
	    Service: {
	    	
	    },
	    Global: {
	        refresh: 0,
	        rootUrl: document.location.protocol + "//" + document.location.host+"/ningmengban",
	    	htmlUrl: document.location.protocol + "//" + document.location.host+"/ningmengban/app",
	    },
	    Format: {
	        sysDate: "yyyy-MM-dd",
	        sysDateTime: "yyyy-MM-dd hh:mm:ss",
	        date: "yyyy-MM-dd",
	        datetime: "yyyy-MM-dd hh:mm:ss",
	        datehm: "yyyy-MM-dd hh:mm",
	        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	        MDFormat: "",
	        decimalfraction: 2,
	        valueSplit: ",",
	        textSplit: "; ",
	        currencyFlag: null,
	        fileSize: ["B", "K", "M", "G", "T"],
	        fileSizeFraction: 2,
	        yes: "Yes",
	        no: "No",
	        valueField: "value",
	        displayField: "text"
	    },
	    Regular: {
	        sysDate: /^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/,
	        sysDateTime: /^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,
	        date: /^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/,
	        datetime: /^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) (\d{1,2}):(\d{1,2})(:(\d{1,2})|)$/,
	        datehm: /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/
	    },
	    Log: {
	        debug: 1,
	        info: 2,
	        warn: 3,
	        error: 4
	    },
	    Local: {
	        zh: "zh_CN",
	        en: "en_US",
	        cookie: "language"
	    },  
	   
	    Personalized: {
	        open: true
	    }
	};


Date.prototype.format = function(d) {
    var b = this;
    if (!d) {
        d = ISS.Config.Format.date
    }
    var f = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    var c = "" + this.getFullYear();
    if (/(y+)/.test(d)) {
        d = d.replace(RegExp.$1, c.substr(4 - RegExp.$1.length))
    }
    var e = d.indexOf("MMM") > -1;
    if (e) {
        delete f["M+"]
    }
    for (var a in f) {
        if (a && new RegExp("(" + a + ")").test(d)) {
            d = d.replace(RegExp.$1, RegExp.$1.length == 1 ? f[a] : ("00" + f[a]).substr(("" + f[a]).length))
        }
    }
    if (e) {
        d = d.replace("MMM", ISS.Config.Format.months[this.getMonth()])
    }
    return d
};
Date.prototype.toJSON = function() {
    return this.getTime() - 8 * 60 * 60 * 1000 - this.getTimezoneOffset() * 60 * 1000
};
Date.prototype.addMonth = function(a) {
    var c = new Date(this.getTime());
    var b = c.getDate() == c.getMonthDay();
    var d = c.getMonth() + a;
    c.setMonth(d);
    if (c.getMonth() != d % 12) {
        c.setDate(0)
    }
    if (b) {
        c.setDate(c.getMonthDay())
    }
    return c
};
Date.prototype.getMonthDay = function() {
    var a = [[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
    var b = this.getFullYear();
    if (b % 4 == 0 && b % 100 > 0 || b % 400 == 0) {
        return a[1][this.getMonth()]
    } else {
        return a[0][this.getMonth()]
    }
};

ISS.DataHelper = {
	    hasValue: function(a) {
	        return typeof a != "undefined" && a != null
	    },
	    getValue: function() {
	        for (var a = 0; a < arguments.length; a++) {
	            if (ISS.DataHelper.hasValue(arguments[a])) {
	                return arguments[a]
	            }
	        }
	        return ""
	    },
	    isEmpty: function(a) {
	        if (ISS.DataHelper.hasValue(a)) {
	            a += "";
	            return a && a.trim().length > 0 ? false: true
	        } else {
	            return true
	        }
	    },
	    toDecimal: function(b, a) {
	        if (b) {
	            return parseFloat(b).toFixed(a || ISS.Config.Format.decimalfraction)
	        }
	        return b
	    },
	    toJsonStr: function(a) {
	        return a ? JSON.stringify(a) : ""
	    },
	    toJson: function(a) {
	        return ISS.DataHelper.isEmpty(a) ? null: JSON.parse(a)
	    },
	    getRangeValue: function(c, b, a) {
	        if (c < b) {
	            c = b
	        } else {
	            if (c > a) {
	                c = a
	            }
	        }
	        return c
	    },
	    getObj: function(e, c) {
	        e = e.split(".");
	        var d = c || window,
	        a = e.length;
	        if (a > 1) {
	            for (var b = 0; b < a; b++) {
	                d = d[e[b]];
	                if (!d) {
	                    return null
	                }
	            }
	            return d
	        } else {
	            return d[e[0]]
	        }
	    },
	    setObj: function(h, e, d) {
	        h = h.split(".");
	        var g = e || window,
	        b, a = h.length,
	        f;
	        if (a > 1) {
	            a--;
	            for (var c = 0; c < a; c++) {
	                b = h[c];
	                f = g[b];
	                if (f == null) {
	                    f = g[b] = {}
	                }
	                g = f
	            }
	            g[h[a]] = d
	        } else {
	            g[h[0]] = d
	        }
	        return g
	    }
	};

(function($) {
    _jsonDataGetValue = function(elmt, container, currObj, lastAttr) {
        var format = elmt.attr("format"),
        type = elmt.attr("type"),
        value = elmt.val();
        if (type == "radio") {
            return elmt[0].checked ? value: (elmt.attr("uncheckvalue") || "")
        } else {
            if (type == "checkbox") {
                var checked = elmt.attr("checked"),
                isArray = elmt.attr("isArray"),
                split = elmt.attr("splitChar") || ",";
                if (currObj && checked) {
                    currObj[lastAttr] = currObj[lastAttr] || (isArray ? [] : "");
                    if (typeof currObj[lastAttr] == "string") {
                        currObj[lastAttr] += currObj[lastAttr] ? split + value: value
                    } else {
                        currObj[lastAttr].push(value)
                    }
                } else {
                    return checked ? value: (elmt.attr("uncheckvalue") || "")
                }
            } else {
                if (format && value) {
                    if (elmt.attr("showDate") == "false" || elmt.attr("datatype") == "string") {
                        return value
                    }
                    var format = (format == "date" || format == "datetime" || format == "datehm") ? null: format;
                    return value.toDate(format)
                } else {
                    return elmt.val()
                }
            }
        }
    };
    _jsonDataSetValue = function(elmt, value) {
        var tagName = elmt[0].tagName,
        type = elmt[0].type;
        if (type == "radio") {
            if (value == elmt[0].value) {
                elmt.attr("checked", "checked")
            } else {
                if (elmt[0].checked) {
                    elmt.removeAttr("checked")
                }
            }
        } else {
            if (type == "checkbox") {
                var splitChar = elmt.attr("splitChar") || ",";
                var isArray = elmt.attr("isArray");
                if (value !== null && value !== "") {
                    var values = isArray ? value: ("" + value).split(splitChar);
                    for (var i = 0; i < values.length; i++) {
                        if (values[i] == elmt[0].value) {
                            elmt[0].checked = true;
                            return
                        }
                    }
                    elmt.removeAttr("checked")
                } else {
                    elmt.removeAttr("checked")
                }
            } else {
                if (tagName == "LABEL") {
                    var fmt = elmt.attr("format");
                    if (fmt && value !== null) {
                        value = ISS.Format.toDate(value).format(ISS.Config.Format[fmt] || fmt)
                    }
                    if (elmt.hasClass("manytext")) {
                        elmt.html(("" + value).replace(/&/g, "&#38;").replace(/</g, "&lt;").replace(/\x0d|\x0a/g, "<br>"))
                    } else {
                        elmt.text(value === null ? "": value)
                    }
                } else {
                    if (value || value === 0) {
                        var fmt = elmt.attr("format");
                        if (fmt) {
                            fmt = ISS.Config.Format[fmt] || fmt;
                            value = ISS.Format.toDate(value, fmt).format(fmt)
                        }
                        elmt.val(value)
                    } else {
                        elmt.val("")
                    }
                }
            }
        }
    };
    $.fn.jsonData = function(data) {
        var elmtName, elmtValue, elmt, elmts = this.find(":input[name]").toArray();
        if (data && typeof data == "object") {
            elmts = elmts.concat(this.find("label[name]").toArray());
            for (var i = 0; i < elmts.length; i++) {
                elmt = $(elmts[i]);
                elmtName = elmt.attr("name");
                elmtValue = void 0;
                try {
                    elmtValue = eval("data." + elmtName)
                } catch(e) {}
                if (typeof elmtValue != "undefined") {
                    _jsonDataSetValue(elmt, elmtValue)
                }
            }
            return this
        } else {
            var fullObj = {},
            currObj, chkCache = {};
            for (var i = 0; i < elmts.length; i++) {
                elmt = $(elmts[i]);
                elmtName = elmt.attr("name");
                elmtValue = _jsonDataGetValue(elmt, this);
                if (!ISS.DataHelper.isEmpty(elmtValue)) {
                    currObj = fullObj;
                    var attrs = elmtName.match(/[a-zA-Z0-9_]+/g);
                    if (!attrs) {
                        continue
                    }
                    for (var j = 0; j < attrs.length - 1; j++) {
                        if (typeof currObj[attrs[j]] != "object") {
                            currObj = currObj[attrs[j]] = isNaN(attrs[j + 1]) ? {}: []
                        } else {
                            currObj = currObj[attrs[j]]
                        }
                    }
                    var lastAttr = attrs[attrs.length - 1];
                    if (!isNaN(lastAttr)) {
                        lastAttr = lastAttr * 1
                    }
                    if (elmt[0].type == "checkbox" && !elmt.attr("uncheckvalue")) {
                        _jsonDataGetValue(elmt, this, currObj, lastAttr)
                    } else {
                        currObj[lastAttr] = elmtValue
                    }
                }
            }
            return fullObj
        }
    };
    $.fn.nameChild = function(name) {
        return this.find("[name='" + name + "']")
    };
    $.fn.formSetValue = function(name, value) {
        return this.nameChild(name).val(value)
    }
})(jQuery);


ISS.Core.initNav= function(){
	/*ISS.Core.ajax({
		url : ISS.Config.Global.rootUrl+"mvc/menubar/get.json",
		data : {},
		success : function(data) {
			if (data) {
				var html =$("#navTemplate").tmpl(data).appendTo("#nav");					
				
			}
		}
	});*/
}


ISS.Module = function(a) {
    this.name = a;
    this.hasInit = false
};
ISS.Module.SupperClass = {};
ISS.Module.modules = new ISS.HashMap();
ISS.Module.define = function(b, d) {
    var c = ISS.Core.Namespace.register(b);
    $.extend(c, ISS.Module.SupperClass);
    var a = function(f, e) {
        return (c.context || $(document)).find(f, e)
    };
    d(c, a);
    ISS.Module.modules.put(b, new ISS.Module(b));
    ISS.Core.log("加载模块：" + b, ISS.Config.Log.info)
};
ISS.Module.executeReady = function() {
    ISS.Module.modules.each(function(b, c) {
        var a = ISS.Core.Namespace.register(b);
        if (!c.hasInit && typeof(a.ready) === "function") {
            a.ready();
            c.hasInit = true
        }
    })
};
ISS.Module.remove = function(moduleName) {
    if (moduleName) {
        try {
            var realModuleObj = ISS.Core.Namespace.register(moduleName);
            if (realModuleObj && typeof(realModuleObj.exit) === "function") {
                ISS.Core.log(moduleName + "模块定义了Exit方法，现在执行", ISS.Config.Log.info);
                realModuleObj.exit()
            }
            ISS.Module.modules.remove(moduleName);
            eval(moduleName + "=null");
            ISS.Core.log(moduleName + "模块数据清空", ISS.Config.Log.info)
        } catch(e) {
            ISS.Core.log(moduleName + "模块不存在，不需要注销", ISS.Config.Log.info)
        }
    }
};
ISS.Module.clear = function() {
    var a = $.extend([], ISS.Module.modules.keys);
    $.each(a,
    function() {
        ISS.Module.remove(this)
    })
};


ISS.UI = {
	iframeHeightAuto:	function (height) {
		var main = $(window.parent.document).find("#contentFrame");	
		var thisheight = $(".content").height()+50;
		if(main){
			main.height(height ? height : thisheight);
		}
	}
}

$.fn.loading = function(d, f, b) {
    var c = d ? $(document.body) : this;
    var g = c.children("div.loading");
    var e = this.outerWidth(),
    a = this.outerHeight();
    if (g.length == 0) {
        g = $(document.createElement("div")).addClass("loading").appendTo(c);
        d && g.id("globalloading")
    }
    if (!b) {
        if (f == void 0 && this.parents("div.container:first").length > 0) {
            f = true
        }
        b = f ? this.position() : this.offset();
        if (!d && (e < 50 || a < 50)) {
            if (e < 30 || a < 30) {
                g.addClass("loading_min")
            } else {
                g.addClass("loading_small")
            }
        }
    }
    g.css({
        width: e,
        height: a || "",
        top: b && b.top > 0 ? b.top: 0,
        left: b && b.left > 0 ? b.left: 0
    }).show();
    return this
};
$.fn.loadingClose = function() {
    var a = this.children("div.loading");
    if (a.length == 0) {
        a = $("#globalloading")
    }
    a.length && a.remove();
    return this
};

//---------------------------------------------------  
//日期格式化  
//格式 YYYY/yyyy/YY/yy 表示年份  
//MM/M 月份  
//W/w 星期  
//dd/DD/d/D 日期  
//hh/HH/h/H 时间  
//mm/m 分钟  
//ss/SS/s/S 秒  
//---------------------------------------------------  
Date.prototype.Format = function(formatStr)   
{   
 var str = formatStr;   
 var Week = ['日','一','二','三','四','五','六'];  

 str=str.replace(/yyyy|YYYY/,this.getFullYear());   
 str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
 var month = this.getMonth()+1;
 str=str.replace(/MM/,month>9?month.toString():'0' + month);   
 str=str.replace(/M/g,month);   

 str=str.replace(/w|W/g,Week[this.getDay()]);   

 str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
 str=str.replace(/d|D/g,this.getDate());   

 str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
 str=str.replace(/h|H/g,this.getHours());   
 str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
 str=str.replace(/m/g,this.getMinutes());   

 str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
 str=str.replace(/s|S/g,this.getSeconds());   

 return str;   
}

ISS.DATE = {
		TimeDifference: function(timeone,timetwo)
		{
			var time1 = timeone.toDate().getTime();
			var time2 = timetwo.toDate().getTime();
			var timestamp = time2 - time1;
			var min = timestamp/(1000*60)
			
			return min;
		}
}


ISS.Core.betweenCurrentTime = function(b){
	var tag ='';
	
	var time = b.getTime();
	var curTime  =new Date().getTime();
	
	
	var d= new Date();
	d.setHours(0);
	d.setMinutes(0)
	d.setSeconds(0)
	
	var curTime_0 = d.getTime();
	// 时间差，单位：分
	var interval = (curTime - time) / 1000 / 60;
	// 与当天0点的时间差，单位：小时
	var interval_0 = (curTime_0 - time) / 1000 / 60 / 60;

	// 一分钟内，显示刚刚
	if (interval < 1) {
		tag = "刚刚";
	}
	// 60分钟内，显示几分钟前
	else if (interval < 60) {
		tag = parseInt(interval) + "分钟前";
	}
	// 24小时内，显示几小时前
	else if (interval < 24 * 60) {
		tag = parseInt( interval / 60) + "小时前";
	}
	// 昨天
	else if (interval_0 < 24) {
		tag = "昨天 " + b.format("hh:mm");
	}
	// 前天
	else if (interval_0 < 24 * 2) {
		tag = "前天 " + b.format("hh:mm");
	}
	// 7天内显示周几
	else if (interval_0 < 24 * 6) {		
		var Week = ['日','一','二','三','四','五','六']; 
		//"yyyy-MM-dd hh:mm:ss"
		tag ="周" + Week[b.getDay()]	+ " "+  b.format("hh:mm");
	}
	// 今年内，显示 MM-dd HH:mm
	else if (b.getYear() == b.getYear()) {
		tag =  b.format("MM-dd hh:mm");
	}
	// 往年，显示yyyy-MM-dd HH:mm
	else {
		tag =  b.format("yyyy-MM-dd hh:mm");
	}
	console.debug(tag);
	return tag;
	
}

/**
 * easyui  默认设置属性
 */
ISS.Core.defaultGrid = function(){
	var param = {
			singleSelect:true,//是否能多选
			width:ISS.Core.getWidth(0.999),
			height:ISS.Core.getHeight(0.85),
			pageList : [ 15, 20, 30, 50 ],
			nowrap: false,
			striped: true,
			collapsible:false,
			fitColumns : true,
			pagination : false,// 开启分页
			pageSize : 15,
		    rownumbers:true//显示行号
	};
	return param;
}


ISS.Core.getWidth = function (percent){ 
	return document.body.clientWidth*percent;
}
ISS.Core.getHeight = function (percent){ 
	return document.body.clientHeight*percent;
}
/**
 * 表单元素转JSON
 */
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

String.prototype.parseToNumber = function(val){
		if(val.indexOf(".")>-1){
			//float
			val = parseFloat(val);
		}else{
			//int
			val = parseInt(val); 
		}
		
		return val;
}

//for form validation
ISS.Core.formValidation = function(formId){
	return ($("#"+formId)||$("."+formId)).validationEngine({
		validationEventTriggers : "blur", // 触发的事件
		inlineValidation : false,// 是否即时验证，false为提交表单时验证,默认true
		success : false,// 为true时即使有不符合的也提交表单,false表示只有全部通过验证了才能提交表单,默认false
		promptPosition : "bottomRight",// 提示所在的位置，topLeft, topRight,
		maxErrorsPerField:1,//一次只提示一条提醒信息
		ajaxFormValidation: true,
		autoHidePrompt:true,
		autoHideDelay:2000
	})
}

function shortName(name){
	if(name.length>10){
		return name.substring(0,10)+"...";
	}else{
		return name;
	}
}

/*****************************************************************
 * 图片自动等比缩放
 * @param img_obj img对象
 * @param max_width 最大宽度，当原始图片宽度超过该值时会自动等比缩小
 * @param max_height 最大高度，当原始图片高度超过该值时会自动等比缩小
 * 
 * @author Liming
 *****************************************************************/
function imageAutoResize(img_obj, max_width, max_height) {
	var img = new Image();
	img.src = img_obj.src;

	var height_ratio, width_ratio;
	var ratio = 1;
	
	var width = img.width;
	var height = img.height;
	
	width_ratio = max_width / width;
	height_ratio = max_height / height;
	
	if (max_width == 0 && max_height == 0){
		ratio = 1;
	} else if (max_width == 0){
		if (height_ratio < 1) {
			ratio = height_ratio;
		}
	}else if (max_height == 0){
		if (width_ratio < 1) {
			ratio = width_ratio;
		}
	}else if (width_ratio < 1 || height_ratio < 1){
		ratio = (width_ratio <= height_ratio ? width_ratio : height_ratio);
	}
	if (ratio < 1){
		width = width * ratio;
		height = height * ratio;
	}
	img_obj.height = height;
	img_obj.width = width;
}