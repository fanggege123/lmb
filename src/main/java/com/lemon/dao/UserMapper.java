package com.lemon.dao;

import com.lemon.pojo.User;

public abstract interface UserMapper extends BaseMapper<User> {
	public abstract void add(User paramUser) throws Exception;

	public abstract User getUserByUserName(String paramString) throws Exception;

	public abstract User getUserByNickName(String paramString) throws Exception;

	public abstract User getUserByNameAndPassword(User paramUser) throws Exception;

	public abstract User findByName(String paramString) throws Exception;
}
