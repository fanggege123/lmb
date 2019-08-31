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
		Result result = new Result(true, "ע��ɹ�");
		try {
			user.setId(UUIDUtils.getUUID());
			user.setCreateDate(DateUtil.getCurDateTime());
			this.userService.add(user);
			request.getSession().setAttribute("currentUser", user);
		} catch (Exception e) {
			logger.error("�������쳣", e);
			result = new Result(true, "��¼ʧ�ܣ��������쳣");
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
				result.setMessage("���û����Ѿ�ע��");
			}
		} catch (Exception e) {
			logger.error("ajaxCheckUserNameRepeat error", e);
			if ((e instanceof DataAccessException)) {
				result.setSuccess(false);
				result.setMessage("У��ʧ�ܣ��������쳣");
			}
		}
		return result;
	}

	@RequestMapping(value = "login")
	public @ResponseBody Result login(HttpServletRequest request,User user,HttpServletResponse response) {
		Result result = new Result(true, "��¼�ɹ�");
		String username = user.getUsername();
		String password = user.getPassword();
		password = user.getPassword();
		try {
//			int count = this.jdbcTemplate.queryForInt("select count(*) from nm_user where password=? and username=?",password,username);
			int count = this.jdbcTemplate.queryForInt("select count(*) from nm_user where password='"+password+"' and username='"+username+"'");
			if (count == 0) {
				result.setSuccess(false);
				result.setMessage("�û������������������");
				return result; 
			}
		} catch (Exception e) {
			if ((e instanceof DataAccessException)) {
				result.setSuccess(false);
				result.setMessage("��¼ʧ�ܣ��������쳣");
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
		Result result = new Result(true, "�ǳ��ɹ�");
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
			logger.error("��ȡ�û���Ϣʧ��", e);
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
			result = new Result(true,"����id��ȡ�û����ɹ�",null,names);
		} catch (Exception e) {
			result = new Result(true,"����id��ȡ�û���ʧ��");
		}
		return result;
	}
}
