package com.lemon.dao;

import java.util.List;
import java.util.Map;

public abstract interface BaseMapper<T> {
	public abstract void add(T paramT) throws Exception;

	public abstract void delete(T paramT) throws Exception;

	public abstract T find(T paramT) throws Exception;

	public abstract T findById(String paramString) throws Exception;

	public abstract void update(T paramT) throws Exception;

	public abstract List<T> query(Map<String, Object> paramMap) throws Exception;

	public abstract int total(Map<String, Object> paramMap) throws Exception;
}
