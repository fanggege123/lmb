package com.lemon.service;

import java.util.List;

public abstract interface BaseService<T> {
	public abstract void add(T paramT) throws Exception;

	public abstract void delete(T paramT) throws Exception;

	public abstract T find(T paramT) throws Exception;

	public abstract T findById(String paramString) throws Exception;

	public abstract void update(T paramT) throws Exception;

	public abstract int total(int paramInt1, int paramInt2) throws Exception;

	public abstract List<T> query(T paramT, int paramInt1, int paramInt2, String paramString) throws Exception;

	public abstract List<T> query(int paramInt1, int paramInt2, String paramString) throws Exception;

	public abstract List<T> getCachedObjects(String paramString);

	public abstract void setCachedObjects(List<T> paramList, String paramString);
}
