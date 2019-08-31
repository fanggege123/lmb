package com.lemon.util;
import java.util.UUID;
public class UUIDUtils {
	/**
	 * 鑷姩鐢熸垚鐨刄UID锛屼綔涓烘暟鎹簱瀛楁鐨勪富閿�
	 * @return
	 */
    public static String getUUID(){
    	return UUID.randomUUID().toString().replaceAll("-", "");   
    }
}
