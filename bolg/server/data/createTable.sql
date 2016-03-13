-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 01 月 31 日 10:32
-- 服务器版本: 5.5.24
-- PHP 版本: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `blog`
--
CREATE DATABASE IF NOT EXISTS `blog` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `blog`;

-- --------------------------------------------------------

--
-- 表的结构 `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `id` tinyint(1) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `author` tinyint(1) NOT NULL COMMENT '作者id',
  `content` varchar(500) NOT NULL COMMENT '博客内容',
  `scan` tinyint(1) NOT NULL DEFAULT '0' COMMENT '浏览量',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='博客表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `friend`
--

CREATE TABLE IF NOT EXISTS `friend` (
  `id` tinyint(1) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `gz_id` tinyint(1) NOT NULL COMMENT '关注人ID',
  `bgz_id` tinyint(1) NOT NULL COMMENT '被关注人ID',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='好友关注表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `relative`
--

CREATE TABLE IF NOT EXISTS `relative` (
  `id` tinyint(1) NOT NULL COMMENT '主键',
  `xgr_id` tinyint(1) NOT NULL COMMENT '相关人ID',
  `cfr_id` tinyint(1) NOT NULL COMMENT '触发人ID',
  `type` char(1) NOT NULL COMMENT '类型',
  `content` varchar(200) DEFAULT NULL COMMENT '内容',
  `bg_id` tinyint(1) DEFAULT NULL COMMENT '博客ID',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `read` char(1) NOT NULL DEFAULT '0' COMMENT '是否已读',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='与我相关表';

-- --------------------------------------------------------

--
-- 表的结构 `reply`
--

CREATE TABLE IF NOT EXISTS `reply` (
  `id` tinyint(1) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` char(1) NOT NULL COMMENT '类型（留言/评论）',
  `b_id` tinyint(1) NOT NULL COMMENT '博主ID/博客ID',
  `author` tinyint(1) NOT NULL COMMENT '作者ID',
  `content` varchar(200) NOT NULL COMMENT '内容',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='留言评论表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(1) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(10) NOT NULL COMMENT '昵称',
  `icon` varchar(30) NOT NULL COMMENT '头像路径',
  `pwd` varchar(15) NOT NULL COMMENT '密码',
  `tel` varchar(11) DEFAULT NULL COMMENT '电话',
  `sex` char(1) DEFAULT NULL COMMENT '性别',
  `tags` varchar(100) DEFAULT NULL COMMENT '个人简介',
  `scan` tinyint(1) NOT NULL DEFAULT '0' COMMENT '浏览量',
  `count` tinyint(1) NOT NULL DEFAULT '0' COMMENT '积分',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表' AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
