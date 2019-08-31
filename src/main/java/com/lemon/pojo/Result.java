package com.lemon.pojo;

public class Result {
	private boolean success;
	private String message;
	private String content;
	private Object object;

	public Result() {
	}

	public Result(boolean isSuccess) {
		this.success = isSuccess;
	}

	public Result(boolean isSuccess, String message) {
		this(isSuccess);
		this.message = message;
	}

	public Result(boolean isSuccess, String message, String content) {
		this(isSuccess, message);
		this.content = content;
	}

	public Result(boolean isSuccess, String message, String content, Object object) {
		this(isSuccess, message, content);
		this.object = object;
	}

	public boolean isSuccess() {
		return this.success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Object getObject() {
		return this.object;
	}

	public void setObject(Object object) {
		this.object = object;
	}
}
