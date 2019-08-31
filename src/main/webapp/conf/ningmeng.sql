/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50022
Source Host           : localhost:3306
Source Database       : ninmeng

Target Server Type    : MYSQL
Target Server Version : 50022
File Encoding         : 65001

Date: 2016-04-18 21:52:58
*/

SET FOREIGN_KEY_CHECKS=0;


-- ----------------------------
-- Table structure for nm_user
-- ----------------------------
DROP TABLE IF EXISTS `nm_user`;
CREATE TABLE `nm_user` (
  `id` varchar(32) NOT NULL,
  `username` varchar(32) default NULL COMMENT '用户名',
  `password` varchar(32) default NULL COMMENT '密码',
  `nickname` varchar(32) default NULL COMMENT '昵称',
  `sex` varchar(32) default NULL COMMENT '性别',
  `phone` varchar(32) default NULL COMMENT '手机',
  `address` varchar(200) default NULL COMMENT '地址',
  `qq` varchar(32) default NULL COMMENT 'qq号码',
  `wechat` varchar(32) default NULL COMMENT '微信',
  `status` varchar(32) default NULL COMMENT '账号状态',
  `logoId` varchar(32) default NULL COMMENT '头像Id',
  `createDate` datetime default NULL COMMENT '创建时间',
  `createUser` varchar(32) default NULL COMMENT '创建人',
  `lastUpdateDate` datetime default NULL COMMENT '最后更新时间',
  `lastUpdateUser` varchar(32) default NULL COMMENT '最后更新用户',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='网站注册用户表';

-- ----------------------------
-- Table structure for nm_attachment
-- ----------------------------
DROP TABLE IF EXISTS `nm_attachment`;
CREATE TABLE `nm_attachment` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `fileName` varchar(32) default NULL COMMENT '文件名',
  `attachTypeName` varchar(500) default NULL COMMENT '附件类型',
  `contents` mediumblob COMMENT '文件内容',
  `createDate` datetime default NULL COMMENT '创建时间',
  `createUser` varchar(32) default NULL COMMENT '创建人',
  `lastUpdateDate` datetime default NULL COMMENT '最后更新时间',
  `lastUpdateUser` varchar(32) default NULL COMMENT '最后更新用户',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='附件表';

-- ----------------------------
-- Table structure for nm_course
-- ----------------------------
DROP TABLE IF EXISTS `nm_course`;
CREATE TABLE `nm_course` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `name` varchar(32) default NULL COMMENT '课程名字',
  `description` varchar(250) default NULL COMMENT '描述',
  `phase` varchar(12) default NULL COMMENT '第几期',
  `pictureId` varchar(32) default NULL COMMENT '封面图片的id',
  `link` varchar(300) default NULL COMMENT '课堂链接',
  `clickCount` int default 0 COMMENT '下载点击量',
  `status` char(1) default '1' COMMENT '1:生效，2:失效，3:过期，4：删除',
  `createDate` datetime default NULL COMMENT '创建时间',
  `createUser` varchar(32) default NULL COMMENT '创建人',
  `lastUpdateDate` datetime default NULL COMMENT '最后更新时间',
  `lastUpdateUser` varchar(32) default NULL COMMENT '最后更新用户',
  `teacherId` char(32) default NULL COMMENT '老师编号',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程表';

-- ----------------------------
-- Table structure for nm_topic
-- ----------------------------
DROP TABLE IF EXISTS `nm_topic`;
CREATE TABLE `nm_topic` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `title` varchar(80) default NULL COMMENT '标题',
  `keywords` varchar(80) default NULL COMMENT '标签',
  `content` text default NULL COMMENT '帖子内容html',
  `text` text default NULL COMMENT '帖子内容文本',
  `viewCount` int default 1 COMMENT '帖子浏览次数',
  `status` varchar(32) default NULL COMMENT '状态',
  `createDate` datetime default NULL COMMENT '创建时间',
  `createUser` varchar(32) default NULL COMMENT '创建人',
  `lastUpdateDate` datetime default NULL COMMENT '最后更新时间',
  `lastUpdateUser` varchar(32) default NULL COMMENT '最后更新用户',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='帖子表';

-- ----------------------------
-- Table structure for nm_reply
-- ----------------------------
DROP TABLE IF EXISTS `nm_reply`;
CREATE TABLE `nm_reply` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `content` text default NULL COMMENT '帖子回复内容，包含html',
  `text` text default NULL COMMENT '帖子回复内容,纯文本',
  `status` char(1) default '0' COMMENT '状态,0为有效，1为失效',
  `agreeCount` int default 0 COMMENT '赞同次数', 
  `createDate` datetime default NULL COMMENT '创建时间',
  `createUser` varchar(32) default NULL COMMENT '创建人',
  `lastUpdateDate` datetime default NULL COMMENT '最后更新时间',
  `lastUpdateUser` varchar(32) default NULL COMMENT '最后更新用户',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='帖子回复表';


-- ----------------------------
-- Table structure for nm_topic_reply
-- ----------------------------
DROP TABLE IF EXISTS `nm_topic_reply`;
CREATE TABLE `nm_topic_reply` (
  `topicid` varchar(32) NOT NULL COMMENT '帖子id',
  `replyId` varchar(32) NOT NULL COMMENT '回复id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='一个帖子跟下面所有回复的关系，一对多';

-- ----------------------------
-- Table structure for nm_reply_reply
-- ----------------------------
DROP TABLE IF EXISTS `nm_reply_reply`;
CREATE TABLE `nm_reply_reply` (
  `parent_replyId` varchar(32) NOT NULL COMMENT '回复父id',
  `child_replyId` varchar(32) NOT NULL COMMENT '回复子id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='一个回复跟下面所有回复的关系，一对多';

-- ----------------------------
-- Table structure for nm_download
-- ----------------------------
DROP TABLE IF EXISTS `nm_download`;
CREATE TABLE `nm_download` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `teacherId` varchar(32) NOT NULL COMMENT '上课老师',
  `phase` varchar(32) default NULL COMMENT '期数',
  `description` varchar(250) default NULL COMMENT '描述',
  `link` varchar(250) default NULL COMMENT '360网盘链接',
  `accessPassword` varchar(32) default NULL COMMENT '访问密码',
  `clickCount` int default 0 COMMENT '下载点击量',
  `status` char(1) default '1' COMMENT '1:生效，2:失效，3:过期，4：删除',
  `createDate` datetime default NULL COMMENT '创建时间',
  `createUser` varchar(32) default NULL COMMENT '创建人',
  `lastUpdateDate` datetime default NULL COMMENT '最后更新时间',
  `lastUpdateUser` varchar(32) default NULL COMMENT '最后更新用户',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='下载表';

-- ----------------------------
-- Table structure for nm_teacher
-- ----------------------------
DROP TABLE IF EXISTS `nm_teacher`;
CREATE TABLE `nm_teacher` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `name` varchar(32) NOT NULL COMMENT '名字',
  `nickName` varchar(32) default NULL COMMENT '昵称',
  `pictureId` varchar(32) default NULL COMMENT '头像',
  `gender` char(1) default NULL COMMENT '1:男；2:女',
  `address` varchar(100) default NULL COMMENT '地址',
  `mobile` varchar(20) default NULL COMMENT '手机',
  `qq` char(10) default '1' COMMENT 'qq号码',
  `wechat` char(50) default '1' COMMENT '微信',
  `link` char(100) default '1' COMMENT '老师的在腾讯课堂上的介绍',
  `status` char(1) default '1' COMMENT '1:生效，2:失效，3:过期，4：删除',
  `description` text default null COMMENT '描述',
  `createDate` datetime default NULL COMMENT '创建时间',
  `createUser` varchar(32) default NULL COMMENT '创建人',
  `lastUpdateDate` datetime default NULL COMMENT '最后更新时间',
  `lastUpdateUser` varchar(32) default NULL COMMENT '最后更新用户',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='老师表';



-- ----------------------------
-- Table structure for nm_reply_agree
-- ----------------------------
DROP TABLE IF EXISTS `nm_reply_agree`;
CREATE TABLE `nm_reply_agree` (
  `replyId` varchar(32) NOT NULL COMMENT '直接回复的id值',
  `userId` varchar(32) NOT NULL COMMENT '用户id值'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='记录一个直接回复下有多少个人赞同';


