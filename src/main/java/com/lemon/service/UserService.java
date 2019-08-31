package com.lemon.service;

import com.lemon.pojo.User;

public abstract interface UserService extends BaseService<User> {
	public abstract User findById(String paramString) throws Exception;

	public abstract boolean checkUserNameRepeat(String paramString) throws Exception;

	public abstract boolean checkNickNameRepeat(String paramString) throws Exception;

	public abstract User getUserByNameAndPassword(User paramUser) throws Exception;

	public abstract User findByName(String paramString) throws Exception;

	public abstract void add(User user) throws Exception;
}
