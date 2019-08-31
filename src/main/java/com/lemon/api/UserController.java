package com.lemon.api;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.pojo.Result;
import com.lemon.pojo.User;
import com.lemon.service.UserService;
import com.lemon.util.DateUtil;
import com.lemon.util.UUIDUtils;
import com.lemon.util.VerifyCodeUtil;

@Controller
public class UserController {
	private static final Log logger = LogFactory.getLog(UserController.class);
	@Autowired
	private UserService userService;
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@RequestMapping
	@ResponseBody
	public Result register(User user, HttpServletRequest request) throws Exception {
		Result result = new Result(true, "注册成功");
		try {
			user.setId(UUIDUtils.getUUID());
			user.setCreateDate(DateUtil.getCurDateTime());
			this.userService.add(user);
			request.getSession().setAttribute("currentUser", user);
		} catch (Exception e) {
			logger.error("服务器异常", e);
			result = new Result(true, "登录失败，服务器异常");
			throw e;
		}
		return result;
	}

	@RequestMapping
	@ResponseBody
	public Result ajaxCheckUserNameRepeat(HttpServletRequest request) {
		Result result = new Result(true);
		try {
			String userName = request.getParameter("username");
			boolean exist = this.userService.checkUserNameRepeat(userName);
			if (exist) {
				result.setSuccess(false);
				result.setMessage("此用户名已经注册");
			}
		} catch (Exception e) {
			logger.error("ajaxCheckUserNameRepeat error", e);
			if ((e instanceof DataAccessException)) {
				result.setSuccess(false);
				result.setMessage("校验失败，服务器异常");
			}
		}
		return result;
	}

	@RequestMapping(value = "login")
	public @ResponseBody Result login(HttpServletRequest request,User user,HttpServletResponse response) {
		Result result = new Result(true, "登录成功");
		String username = user.getUsername();
		String password = user.getPassword();
		password = user.getPassword();
		try {
//			int count = this.jdbcTemplate.queryForInt("select count(*) from nm_user where password=? and username=?",password,username);
			int count = this.jdbcTemplate.queryForInt("select count(*) from nm_user where password='"+password+"' and username='"+username+"'");
			if (count == 0) {
				result.setSuccess(false);
				result.setMessage("用户名或者密码输入错误");
				return result; 
			}
		} catch (Exception e) {
			if ((e instanceof DataAccessException)) {
				result.setSuccess(false);
				result.setMessage("登录失败，服务器异常");
				return result;
			}
		}
		request.getSession().setAttribute("currentUser", user);
		response.addCookie(new Cookie("login", "true"));
		response.addHeader("test", "aa");
		return result;
	}

	@RequestMapping(value = "/logout")
	public @ResponseBody Result logout(HttpServletRequest request) {
		Result result = new Result(true, "登出成功");
		request.getSession().removeAttribute("currentUser");
		request.getSession().invalidate();
		return result;
	}

	@RequestMapping(value = "getLoginUserInfo")
	public @ResponseBody Result getLoginUserInfo(HttpServletRequest request) {
		User user = null;
		Result result = null;
		try {
			user = (User) request.getSession().getAttribute("currentUser");
			if (user == null) {
				result = new Result(true, null, "", null);
			} else {
				result = new Result(true, null, "", user);
			}
		} catch (Exception e) {
			logger.error("获取用户信息失败", e);
			result = new Result(false, null, "", null);
		}
		return result;
	}
	
	@RequestMapping(value="getUsernameById")
	public @ResponseBody Result getUsernameById(String id){
		Result result = null;
		String sql = "select username from nm_user where id='"+id+"'";
		try {
			List<String> names = jdbcTemplate.queryForList(sql, String.class);
			result = new Result(true,"根据id获取用户名成功",null,names);
		} catch (Exception e) {
			result = new Result(true,"根据id获取用户名失败");
		}
		return result;
	}
}
