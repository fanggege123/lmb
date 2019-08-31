package com.lemon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lemon.dao.UserMapper;
import com.lemon.pojo.User;
import com.lemon.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	public void add(User user) throws Exception {
		this.userMapper.add(user);
	}

	public void delete(User user) throws Exception {
	}

	public User find(User user) throws Exception {
		return null;
	}

	public void update(User user) throws Exception {
		this.userMapper.update(user);
	}

	public User findById(String userId) throws Exception {
		User user = (User) this.userMapper.findById(userId);
		return user;
	}

	public boolean checkUserNameRepeat(String userName) throws Exception {
		User user = this.userMapper.getUserByUserName(userName);
		return user != null;
	}

	public boolean checkNickNameRepeat(String nickName) throws Exception {
		User user = this.userMapper.getUserByNickName(nickName);
		return user != null;
	}

	public User getUserByNameAndPassword(User user) throws Exception {
		return this.userMapper.getUserByNameAndPassword(user);
	}

	public int total(int start, int end) throws Exception {
		return 0;
	}

	public List<User> query(User t, int start, int end, String orderBy) throws Exception {
		return null;
	}

	public User findByName(String userName) throws Exception {
		User user = this.userMapper.findByName(userName);
		return user;
	}

	public List<User> query(int start, int end, String orderBy) throws Exception {
		return null;
	}

	public List<User> getCachedObjects(String type) {
		return null;
	}

	public void setCachedObjects(List<User> teachers, String type) {
	}
}
