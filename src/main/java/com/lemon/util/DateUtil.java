package com.lemon.util;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DateUtil {
		public static final String yyyy_MM_dd_HH_mm_ss_EN = "yyyy-MM-dd HH:mm:ss";
		private static Map<String, DateFormat> dateFormatMap = new HashMap<String, DateFormat>();
		public static String getCurDateTime() {
			return dateToDateString(new Date(), yyyy_MM_dd_HH_mm_ss_EN);
		}
		public static String dateToDateString(Date date, String formatStr) {
			DateFormat df = getDateFormat(formatStr);
			return df.format(date);
		}
		public static DateFormat getDateFormat(String formatStr) {
			DateFormat df = dateFormatMap.get(formatStr);
			if (df == null) {
				df = new SimpleDateFormat(formatStr);
				dateFormatMap.put(formatStr, df);
			}
			return df;
		}

	}
