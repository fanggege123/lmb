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
  `username` varchar(32) default NULL COMMENT '�û���',
  `password` varchar(32) default NULL COMMENT '����',
  `nickname` varchar(32) default NULL COMMENT '�ǳ�',
  `sex` varchar(32) default NULL COMMENT '�Ա�',
  `phone` varchar(32) default NULL COMMENT '�ֻ�',
  `address` varchar(200) default NULL COMMENT '��ַ',
  `qq` varchar(32) default NULL COMMENT 'qq����',
  `wechat` varchar(32) default NULL COMMENT '΢��',
  `status` varchar(32) default NULL COMMENT '�˺�״̬',
  `logoId` varchar(32) default NULL COMMENT 'ͷ��Id',
  `createDate` datetime default NULL COMMENT '����ʱ��',
  `createUser` varchar(32) default NULL COMMENT '������',
  `lastUpdateDate` datetime default NULL COMMENT '������ʱ��',
  `lastUpdateUser` varchar(32) default NULL COMMENT '�������û�',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='��վע���û���';

-- ----------------------------
-- Table structure for nm_attachment
-- ----------------------------
DROP TABLE IF EXISTS `nm_attachment`;
CREATE TABLE `nm_attachment` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `fileName` varchar(32) default NULL COMMENT '�ļ���',
  `attachTypeName` varchar(500) default NULL COMMENT '��������',
  `contents` mediumblob COMMENT '�ļ�����',
  `createDate` datetime default NULL COMMENT '����ʱ��',
  `createUser` varchar(32) default NULL COMMENT '������',
  `lastUpdateDate` datetime default NULL COMMENT '������ʱ��',
  `lastUpdateUser` varchar(32) default NULL COMMENT '�������û�',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='������';

-- ----------------------------
-- Table structure for nm_course
-- ----------------------------
DROP TABLE IF EXISTS `nm_course`;
CREATE TABLE `nm_course` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `name` varchar(32) default NULL COMMENT '�γ�����',
  `description` varchar(250) default NULL COMMENT '����',
  `phase` varchar(12) default NULL COMMENT '�ڼ���',
  `pictureId` varchar(32) default NULL COMMENT '����ͼƬ��id',
  `link` varchar(300) default NULL COMMENT '��������',
  `clickCount` int default 0 COMMENT '���ص����',
  `status` char(1) default '1' COMMENT '1:��Ч��2:ʧЧ��3:���ڣ�4��ɾ��',
  `createDate` datetime default NULL COMMENT '����ʱ��',
  `createUser` varchar(32) default NULL COMMENT '������',
  `lastUpdateDate` datetime default NULL COMMENT '������ʱ��',
  `lastUpdateUser` varchar(32) default NULL COMMENT '�������û�',
  `teacherId` char(32) default NULL COMMENT '��ʦ���',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='�γ̱�';

-- ----------------------------
-- Table structure for nm_topic
-- ----------------------------
DROP TABLE IF EXISTS `nm_topic`;
CREATE TABLE `nm_topic` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `title` varchar(80) default NULL COMMENT '����',
  `keywords` varchar(80) default NULL COMMENT '��ǩ',
  `content` text default NULL COMMENT '��������html',
  `text` text default NULL COMMENT '���������ı�',
  `viewCount` int default 1 COMMENT '�����������',
  `status` varchar(32) default NULL COMMENT '״̬',
  `createDate` datetime default NULL COMMENT '����ʱ��',
  `createUser` varchar(32) default NULL COMMENT '������',
  `lastUpdateDate` datetime default NULL COMMENT '������ʱ��',
  `lastUpdateUser` varchar(32) default NULL COMMENT '�������û�',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='���ӱ�';

-- ----------------------------
-- Table structure for nm_reply
-- ----------------------------
DROP TABLE IF EXISTS `nm_reply`;
CREATE TABLE `nm_reply` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `content` text default NULL COMMENT '���ӻظ����ݣ�����html',
  `text` text default NULL COMMENT '���ӻظ�����,���ı�',
  `status` char(1) default '0' COMMENT '״̬,0Ϊ��Ч��1ΪʧЧ',
  `agreeCount` int default 0 COMMENT '��ͬ����', 
  `createDate` datetime default NULL COMMENT '����ʱ��',
  `createUser` varchar(32) default NULL COMMENT '������',
  `lastUpdateDate` datetime default NULL COMMENT '������ʱ��',
  `lastUpdateUser` varchar(32) default NULL COMMENT '�������û�',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='���ӻظ���';


-- ----------------------------
-- Table structure for nm_topic_reply
-- ----------------------------
DROP TABLE IF EXISTS `nm_topic_reply`;
CREATE TABLE `nm_topic_reply` (
  `topicid` varchar(32) NOT NULL COMMENT '����id',
  `replyId` varchar(32) NOT NULL COMMENT '�ظ�id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='һ�����Ӹ��������лظ��Ĺ�ϵ��һ�Զ�';

-- ----------------------------
-- Table structure for nm_reply_reply
-- ----------------------------
DROP TABLE IF EXISTS `nm_reply_reply`;
CREATE TABLE `nm_reply_reply` (
  `parent_replyId` varchar(32) NOT NULL COMMENT '�ظ���id',
  `child_replyId` varchar(32) NOT NULL COMMENT '�ظ���id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='һ���ظ����������лظ��Ĺ�ϵ��һ�Զ�';

-- ----------------------------
-- Table structure for nm_download
-- ----------------------------
DROP TABLE IF EXISTS `nm_download`;
CREATE TABLE `nm_download` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `teacherId` varchar(32) NOT NULL COMMENT '�Ͽ���ʦ',
  `phase` varchar(32) default NULL COMMENT '����',
  `description` varchar(250) default NULL COMMENT '����',
  `link` varchar(250) default NULL COMMENT '360��������',
  `accessPassword` varchar(32) default NULL COMMENT '��������',
  `clickCount` int default 0 COMMENT '���ص����',
  `status` char(1) default '1' COMMENT '1:��Ч��2:ʧЧ��3:���ڣ�4��ɾ��',
  `createDate` datetime default NULL COMMENT '����ʱ��',
  `createUser` varchar(32) default NULL COMMENT '������',
  `lastUpdateDate` datetime default NULL COMMENT '������ʱ��',
  `lastUpdateUser` varchar(32) default NULL COMMENT '�������û�',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='���ر�';

-- ----------------------------
-- Table structure for nm_teacher
-- ----------------------------
DROP TABLE IF EXISTS `nm_teacher`;
CREATE TABLE `nm_teacher` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `name` varchar(32) NOT NULL COMMENT '����',
  `nickName` varchar(32) default NULL COMMENT '�ǳ�',
  `pictureId` varchar(32) default NULL COMMENT 'ͷ��',
  `gender` char(1) default NULL COMMENT '1:�У�2:Ů',
  `address` varchar(100) default NULL COMMENT '��ַ',
  `mobile` varchar(20) default NULL COMMENT '�ֻ�',
  `qq` char(10) default '1' COMMENT 'qq����',
  `wechat` char(50) default '1' COMMENT '΢��',
  `link` char(100) default '1' COMMENT '��ʦ������Ѷ�����ϵĽ���',
  `status` char(1) default '1' COMMENT '1:��Ч��2:ʧЧ��3:���ڣ�4��ɾ��',
  `description` text default null COMMENT '����',
  `createDate` datetime default NULL COMMENT '����ʱ��',
  `createUser` varchar(32) default NULL COMMENT '������',
  `lastUpdateDate` datetime default NULL COMMENT '������ʱ��',
  `lastUpdateUser` varchar(32) default NULL COMMENT '�������û�',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='��ʦ��';



-- ----------------------------
-- Table structure for nm_reply_agree
-- ----------------------------
DROP TABLE IF EXISTS `nm_reply_agree`;
CREATE TABLE `nm_reply_agree` (
  `replyId` varchar(32) NOT NULL COMMENT 'ֱ�ӻظ���idֵ',
  `userId` varchar(32) NOT NULL COMMENT '�û�idֵ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='��¼һ��ֱ�ӻظ����ж��ٸ�����ͬ';


