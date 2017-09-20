/*
Navicat MySQL Data Transfer

Source Server         : MYDB
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : taskarrange

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-07-14 15:39:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `applies`
-- ----------------------------
DROP TABLE IF EXISTS `applies`;
CREATE TABLE `applies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(40) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `mtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `status` set('created','assigned','recieved','doing','finish','delay') DEFAULT NULL COMMENT '状态',
  `dep_id` int(11) DEFAULT NULL COMMENT '部门ID',
  `type` char(30) DEFAULT NULL COMMENT '故障类型',
  `creator` int(11) DEFAULT NULL COMMENT '创建人',
  `assigner` int(11) DEFAULT NULL COMMENT '指派人',
  `reciever` int(11) DEFAULT NULL COMMENT '接收人',
  `assign_time` timestamp NULL DEFAULT NULL,
  `recieve_time` timestamp NULL DEFAULT NULL,
  `job_start` timestamp NULL DEFAULT NULL,
  `job_end` timestamp NULL DEFAULT NULL,
  `job_desc` text,
  `addr` char(50) DEFAULT NULL COMMENT '故障地点',
  `tel` char(15) DEFAULT NULL COMMENT '联系电话',
  `result` char(20) DEFAULT NULL COMMENT '维修结果',
  `reason` tinytext COMMENT '维修备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of applies
-- ----------------------------
INSERT INTO `applies` VALUES ('5', '奖金系统', '有问题', '2017-06-08 16:41:38', '2017-06-08 21:37:49', 'assigned', '16', 'other', '33', '28', '27', '2017-06-08 21:37:49', null, null, null, null, '住院部3楼', '2232', null, null);

-- ----------------------------
-- Table structure for `deps`
-- ----------------------------
DROP TABLE IF EXISTS `deps`;
CREATE TABLE `deps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `addr` char(30) DEFAULT NULL,
  `tel` char(15) DEFAULT NULL,
  `manager` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of deps
-- ----------------------------
INSERT INTO `deps` VALUES ('15', '远程会诊中心', '门诊部5楼', '13823682603', '28');
INSERT INTO `deps` VALUES ('16', '内一科', '住院部3楼', null, null);
INSERT INTO `deps` VALUES ('17', '内二科', '住院部2楼', null, null);
INSERT INTO `deps` VALUES ('18', '外一科', '住院部6楼', null, null);

-- ----------------------------
-- Table structure for `duties`
-- ----------------------------
DROP TABLE IF EXISTS `duties`;
CREATE TABLE `duties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `sign_in` timestamp NULL DEFAULT NULL,
  `sign_in2` timestamp NULL DEFAULT NULL,
  `sign_out` timestamp NULL DEFAULT NULL,
  `sign_out2` timestamp NULL DEFAULT NULL,
  `meno` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of duties
-- ----------------------------
INSERT INTO `duties` VALUES ('9', '27', '2017-05-31 04:50:49', null, '2017-05-31 22:37:45', null, null);
INSERT INTO `duties` VALUES ('10', '20', '2017-07-05 05:52:41', null, '2017-07-05 05:52:47', null, null);
INSERT INTO `duties` VALUES ('11', '23', '2017-07-05 08:10:59', null, '2017-07-05 10:48:35', null, null);
INSERT INTO `duties` VALUES ('12', '32', '2017-07-05 11:04:35', '2017-07-05 14:39:53', '2017-07-05 11:31:12', null, null);
INSERT INTO `duties` VALUES ('13', '32', '2017-07-06 11:26:36', '2017-07-06 14:28:25', '2017-07-06 11:34:12', '2017-07-06 17:30:39', null);
INSERT INTO `duties` VALUES ('14', '23', null, '2017-07-06 14:31:02', null, '2017-07-06 17:31:15', null);
INSERT INTO `duties` VALUES ('15', '23', '2017-07-07 07:59:36', '2017-07-07 14:30:22', '2017-07-07 11:30:28', '2017-07-07 17:33:57', null);
INSERT INTO `duties` VALUES ('16', '32', '2017-07-07 08:10:05', '2017-07-07 14:37:27', '2017-07-07 11:30:45', '2017-07-07 17:30:52', null);
INSERT INTO `duties` VALUES ('17', '23', '2017-07-10 07:57:45', '2017-07-10 14:29:11', '2017-07-10 11:31:15', '2017-07-10 17:31:41', null);
INSERT INTO `duties` VALUES ('18', '32', '2017-07-10 08:07:50', '2017-07-10 14:21:50', '2017-07-10 11:32:23', '2017-07-10 17:31:19', null);
INSERT INTO `duties` VALUES ('19', '23', '2017-07-11 08:00:28', '2017-07-11 14:29:24', '2017-07-11 11:33:09', '2017-07-11 17:33:22', null);
INSERT INTO `duties` VALUES ('20', '32', '2017-07-11 08:07:29', '2017-07-11 17:30:07', '2017-07-11 11:30:44', null, null);
INSERT INTO `duties` VALUES ('21', '23', '2017-07-12 07:57:16', '2017-07-12 14:27:40', '2017-07-12 11:37:53', '2017-07-12 17:30:10', null);
INSERT INTO `duties` VALUES ('22', '32', '2017-07-12 08:02:23', '2017-07-12 14:28:13', null, '2017-07-12 17:30:41', null);
INSERT INTO `duties` VALUES ('23', '23', '2017-07-13 07:56:27', '2017-07-13 14:26:34', '2017-07-13 11:30:08', '2017-07-13 17:38:44', null);
INSERT INTO `duties` VALUES ('24', '32', '2017-07-13 08:05:41', '2017-07-13 14:38:02', '2017-07-13 11:30:23', '2017-07-13 17:31:17', null);
INSERT INTO `duties` VALUES ('25', '23', '2017-07-14 07:59:09', null, null, null, null);
INSERT INTO `duties` VALUES ('26', '32', '2017-07-14 08:05:27', '2017-07-14 14:20:06', null, null, null);

-- ----------------------------
-- Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `cname` char(30) DEFAULT NULL,
  `sys_admin` char(1) DEFAULT '0',
  `task_assign` char(1) DEFAULT '0',
  `task_recieve` char(1) DEFAULT '0',
  `task_create` char(1) DEFAULT '0',
  `task_remove` char(1) DEFAULT '0',
  `apply_create` char(1) DEFAULT NULL,
  `apply_update` char(1) DEFAULT NULL,
  `apply_remove` char(1) DEFAULT NULL,
  `user_create` char(1) DEFAULT '0',
  `user_remove` char(1) DEFAULT '0',
  `duty_create` char(1) DEFAULT '0',
  `user_update` char(1) DEFAULT '0',
  `data_stat` char(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('7', 'admin', '系统管理员', '1', '1', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1');
INSERT INTO `roles` VALUES ('8', 'it-manager', '信息科科长', '1', '1', '0', '1', '1', '0', '0', '1', '1', '1', '1', '1', '1');
INSERT INTO `roles` VALUES ('9', 'it-assitant', '任务分派员', '0', '1', '1', '0', '0', '0', '0', '0', '1', '0', '0', '1', '0');
INSERT INTO `roles` VALUES ('10', 'it-worker', '信息技术员', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `roles` VALUES ('11', 'dep-user', '科室护士长', '0', '0', '0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for `tasks`
-- ----------------------------
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(40) NOT NULL COMMENT '任务名称',
  `content` text NOT NULL COMMENT '任务内容',
  `assigner` int(11) DEFAULT NULL COMMENT '指派人',
  `reciever` int(11) DEFAULT NULL COMMENT '接收人',
  `creator` int(11) DEFAULT NULL COMMENT '创建人',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `mtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `status` set('created','assigned','recieved','doing','finish','delay') DEFAULT NULL COMMENT '状态',
  `reason` tinytext,
  `frequency` set('yearly','quarter','monthly','weekly','daily','once') DEFAULT NULL COMMENT '任务的执行频率',
  `expect_start` timestamp NULL DEFAULT NULL COMMENT '期望开展时间',
  `expect_end` timestamp NULL DEFAULT NULL COMMENT '期望结束时间',
  `assign_time` timestamp NULL DEFAULT NULL COMMENT '任务指派时间',
  `recieve_time` timestamp NULL DEFAULT NULL COMMENT '任务接收时间',
  `task_start` timestamp NULL DEFAULT NULL COMMENT '任务开始时间',
  `task_end` timestamp NULL DEFAULT NULL COMMENT '任务结束时间',
  `copy_from` int(11) DEFAULT NULL,
  `xxfsbz` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO `tasks` VALUES ('12', '更新科室U盘远程医疗视频讲座', '更新科室U盘远程医疗视频讲座', '28', '23', '28', '2017-06-09 08:50:12', '2017-06-09 08:50:12', 'assigned', null, 'weekly', '2017-06-09 08:50:08', '2017-12-31 08:50:10', '2017-06-09 08:50:12', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('13', '局域网发通知：远程教学视频讲座安排表', '局域网发通知：远程教学视频讲座安排表', '28', '23', '28', '2017-06-09 09:11:32', '2017-06-09 09:11:32', 'assigned', null, 'weekly', '2017-06-09 09:11:21', '2017-12-31 09:11:23', '2017-06-09 09:11:32', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('14', '远程会诊中心卫生', '保证中心卫生干净，物品摆放整齐。', '28', '23', '28', '2017-06-09 09:23:46', '2017-06-09 09:23:46', 'assigned', null, 'daily', '2017-06-09 09:23:42', '2017-12-31 09:23:45', '2017-06-09 09:23:46', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('15', '叫号系统巡查', '检查医院三个门诊医疗区分诊叫号系统运行情况', '28', '23', '28', '2017-06-09 09:26:40', '2017-07-04 08:47:15', 'finish', '已完成', 'daily', '2017-06-09 09:26:36', '2017-12-31 09:26:39', '2017-06-09 09:26:40', '2017-07-04 08:47:05', '2017-07-04 08:47:07', '2017-07-04 08:47:08', null, null);
INSERT INTO `tasks` VALUES ('16', '瓶签、清单打印系统、供应室消毒巡查', '瓶签、清单打印系统、供应室消毒巡查', '28', '23', '28', '2017-06-09 09:41:09', '2017-06-09 09:41:09', 'assigned', null, 'weekly', '2017-06-09 09:41:06', '2017-12-31 09:41:08', '2017-06-09 09:41:09', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('17', '检查医疗干部休假系统短信发送端运行情况', '检查医疗干部休假系统短信发送端运行情况', '28', '32', '28', '2017-06-09 10:04:44', '2017-06-09 10:04:44', 'assigned', null, 'daily', '2017-06-09 10:04:41', '2017-12-31 10:04:43', '2017-06-09 10:04:44', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('18', '提取医疗干部休假系统干部休假情况', '如果有干部休假同意的，打印批复表，盖章，并发至相应的科室', '28', '32', '28', '2017-06-09 10:07:01', '2017-06-09 10:07:01', 'assigned', null, 'daily', '2017-06-09 10:06:58', '2017-12-31 10:07:01', '2017-06-09 10:07:01', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('19', '病人随访', '须做至少2个病人回访', '28', '32', '28', '2017-06-12 15:22:24', '2017-06-12 15:22:24', 'assigned', null, 'daily', '2017-06-12 15:23:15', '2017-12-31 15:23:23', '2017-06-12 15:23:24', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('20', '更新医院外网信息', '更新医院外网信息', '28', '32', '28', '2017-06-12 15:33:34', '2017-06-12 15:33:34', 'assigned', null, 'daily', '2017-06-12 15:34:27', '2017-12-31 15:34:33', '2017-06-12 15:34:34', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('21', '更新公安网健康服务平台信息', '更新公安网健康服务平台信息', '28', '32', '28', '2017-06-12 15:34:11', '2017-06-12 15:34:11', 'assigned', null, 'daily', '2017-06-12 15:34:34', '2017-12-31 15:35:10', '2017-06-12 15:35:11', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('22', '制作医师资格证、执业证', '制作医师资格证、执业证', '28', '32', '20', '2017-06-12 15:35:15', '2017-06-12 15:35:15', 'assigned', null, 'weekly', '2017-06-12 15:36:08', '2017-12-31 15:36:13', '2017-06-12 15:36:14', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('23', '医务部考勤上报', '医务部考勤上报', '28', '32', '28', '2017-06-12 15:35:40', '2017-06-12 15:35:40', 'assigned', null, 'monthly', '2017-06-12 15:36:15', '2017-12-31 15:36:39', '2017-06-12 15:36:39', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('24', '奖金发放', '奖金发放', '28', '23', '28', '2017-06-12 15:36:46', '2017-06-12 15:36:46', 'assigned', null, 'monthly', '2017-06-12 15:36:39', '2017-12-31 15:37:45', '2017-06-12 15:37:46', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('25', '医务部周报统计', '医务部周报统计', '28', '32', '28', '2017-06-12 15:46:21', '2017-06-12 16:04:05', 'finish', '因。。。问题处理。。', 'weekly', '2017-06-12 15:47:13', '2017-12-31 15:47:20', '2017-06-12 15:47:21', '2017-06-12 16:03:05', '2017-06-12 16:04:39', '2017-06-12 16:04:45', null, null);
INSERT INTO `tasks` VALUES ('26', '工作证制作', '工作证制作\n', '28', '23', '28', '2017-06-12 15:48:18', '2017-06-12 15:48:18', 'assigned', null, 'weekly', '2017-06-12 15:47:21', '2017-12-31 15:49:11', '2017-06-12 15:49:18', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('28', '每天下午在线直播远程医疗视频教学', '开放远程会诊中心，刻录视频', '20', '23', '20', '2017-07-04 08:40:28', '2017-07-04 08:40:28', 'assigned', null, 'daily', '2017-07-04 08:40:24', '2017-12-31 08:40:27', '2017-07-04 08:40:28', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('29', 'test 新建季度任务', 'wer', '20', '28', '20', '2017-07-05 03:54:34', '2017-07-05 03:54:34', 'assigned', null, 'quarter', '2017-07-05 03:54:22', '2017-07-18 03:54:28', '2017-07-05 03:54:34', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('30', 'test 季度任务', 'wewewe', '20', '27', '20', '2017-07-05 05:52:08', '2017-07-05 05:52:08', 'assigned', null, 'quarter', '2017-07-05 05:51:55', '2017-07-18 05:52:01', '2017-07-05 05:52:08', null, null, null, null, null);
INSERT INTO `tasks` VALUES ('54', '远程会诊中心卫生', '保证中心卫生干净，物品摆放整齐。', '28', '23', '28', '2017-07-11 00:30:49', '2017-07-11 00:30:49', 'recieved', '', 'daily', '2017-06-09 09:23:42', '2017-12-31 09:23:45', '2017-07-11 00:30:49', '2017-07-11 00:30:49', null, null, '14', null);
INSERT INTO `tasks` VALUES ('55', '叫号系统巡查', '检查医院三个门诊医疗区分诊叫号系统运行情况', '28', '23', '28', '2017-07-11 00:30:49', '2017-07-11 00:30:49', 'recieved', '', 'daily', '2017-06-09 09:26:36', '2017-12-31 09:26:39', '2017-07-11 00:30:49', '2017-07-11 00:30:49', null, null, '15', null);
INSERT INTO `tasks` VALUES ('56', '检查医疗干部休假系统短信发送端运行情况', '检查医疗干部休假系统短信发送端运行情况', '28', '32', '28', '2017-07-11 00:30:49', '2017-07-11 00:30:49', 'recieved', '', 'daily', '2017-06-09 10:04:41', '2017-12-31 10:04:43', '2017-07-11 00:30:49', '2017-07-11 00:30:49', null, null, '17', null);
INSERT INTO `tasks` VALUES ('57', '提取医疗干部休假系统干部休假情况', '如果有干部休假同意的，打印批复表，盖章，并发至相应的科室', '28', '32', '28', '2017-07-11 00:30:49', '2017-07-11 00:30:49', 'recieved', '', 'daily', '2017-06-09 10:06:58', '2017-12-31 10:07:01', '2017-07-11 00:30:49', '2017-07-11 00:30:49', null, null, '18', null);
INSERT INTO `tasks` VALUES ('58', '病人随访', '须做至少2个病人回访', '28', '32', '28', '2017-07-11 00:30:49', '2017-07-11 00:30:49', 'recieved', '', 'daily', '2017-06-12 15:23:15', '2017-12-31 15:23:23', '2017-07-11 00:30:49', '2017-07-11 00:30:49', null, null, '19', null);
INSERT INTO `tasks` VALUES ('59', '更新医院外网信息', '更新医院外网信息', '28', '32', '28', '2017-07-11 00:30:49', '2017-07-11 00:30:49', 'recieved', '', 'daily', '2017-06-12 15:34:27', '2017-12-31 15:34:33', '2017-07-11 00:30:49', '2017-07-11 00:30:49', null, null, '20', null);
INSERT INTO `tasks` VALUES ('60', '更新公安网健康服务平台信息', '更新公安网健康服务平台信息', '28', '32', '28', '2017-07-11 00:30:49', '2017-07-11 00:30:49', 'recieved', '', 'daily', '2017-06-12 15:34:34', '2017-12-31 15:35:10', '2017-07-11 00:30:49', '2017-07-11 00:30:49', null, null, '21', null);
INSERT INTO `tasks` VALUES ('61', '每天下午在线直播远程医疗视频教学', '开放远程会诊中心，刻录视频', '20', '23', '20', '2017-07-11 00:30:49', '2017-07-11 00:30:49', 'recieved', '', 'daily', '2017-07-04 08:40:24', '2017-12-31 08:40:27', '2017-07-11 00:30:49', '2017-07-11 00:30:49', null, null, '28', null);
INSERT INTO `tasks` VALUES ('62', '远程会诊中心卫生', '保证中心卫生干净，物品摆放整齐。', '28', '23', '28', '2017-07-12 12:46:49', '2017-07-12 12:46:49', 'recieved', '', 'daily', '2017-06-09 09:23:42', '2017-12-31 09:23:45', '2017-07-12 12:46:49', '2017-07-12 12:46:49', null, null, '14', null);
INSERT INTO `tasks` VALUES ('63', '叫号系统巡查', '检查医院三个门诊医疗区分诊叫号系统运行情况', '28', '23', '28', '2017-07-12 12:46:49', '2017-07-12 12:46:49', 'recieved', '', 'daily', '2017-06-09 09:26:36', '2017-12-31 09:26:39', '2017-07-12 12:46:49', '2017-07-12 12:46:49', null, null, '15', null);
INSERT INTO `tasks` VALUES ('64', '检查医疗干部休假系统短信发送端运行情况', '检查医疗干部休假系统短信发送端运行情况', '28', '32', '28', '2017-07-12 12:46:49', '2017-07-12 12:46:49', 'recieved', '', 'daily', '2017-06-09 10:04:41', '2017-12-31 10:04:43', '2017-07-12 12:46:49', '2017-07-12 12:46:49', null, null, '17', null);
INSERT INTO `tasks` VALUES ('65', '提取医疗干部休假系统干部休假情况', '如果有干部休假同意的，打印批复表，盖章，并发至相应的科室', '28', '32', '28', '2017-07-12 12:46:49', '2017-07-12 12:46:49', 'recieved', '', 'daily', '2017-06-09 10:06:58', '2017-12-31 10:07:01', '2017-07-12 12:46:49', '2017-07-12 12:46:49', null, null, '18', null);
INSERT INTO `tasks` VALUES ('66', '病人随访', '须做至少2个病人回访', '28', '32', '28', '2017-07-12 12:46:49', '2017-07-12 12:46:49', 'recieved', '', 'daily', '2017-06-12 15:23:15', '2017-12-31 15:23:23', '2017-07-12 12:46:49', '2017-07-12 12:46:49', null, null, '19', null);
INSERT INTO `tasks` VALUES ('67', '更新医院外网信息', '更新医院外网信息', '28', '32', '28', '2017-07-12 12:46:49', '2017-07-12 12:46:49', 'recieved', '', 'daily', '2017-06-12 15:34:27', '2017-12-31 15:34:33', '2017-07-12 12:46:49', '2017-07-12 12:46:49', null, null, '20', null);
INSERT INTO `tasks` VALUES ('68', '更新公安网健康服务平台信息', '更新公安网健康服务平台信息', '28', '32', '28', '2017-07-12 12:46:49', '2017-07-12 12:46:49', 'recieved', '', 'daily', '2017-06-12 15:34:34', '2017-12-31 15:35:10', '2017-07-12 12:46:49', '2017-07-12 12:46:49', null, null, '21', null);
INSERT INTO `tasks` VALUES ('69', '每天下午在线直播远程医疗视频教学', '开放远程会诊中心，刻录视频', '20', '23', '20', '2017-07-12 12:46:49', '2017-07-12 12:46:49', 'recieved', '', 'daily', '2017-07-04 08:40:24', '2017-12-31 08:40:27', '2017-07-12 12:46:49', '2017-07-12 12:46:49', null, null, '28', null);
INSERT INTO `tasks` VALUES ('102', '远程会诊中心卫生', '保证中心卫生干净，物品摆放整齐。', '28', '23', '28', '2017-07-13 16:14:36', '2017-07-13 16:14:36', 'recieved', '', 'daily', '2017-06-09 09:23:42', '2017-12-31 09:23:45', '2017-07-13 16:14:36', '2017-07-13 16:14:36', null, null, '14', null);
INSERT INTO `tasks` VALUES ('103', '叫号系统巡查', '检查医院三个门诊医疗区分诊叫号系统运行情况', '28', '23', '28', '2017-07-13 16:14:36', '2017-07-13 17:47:39', 'doing', '', 'daily', '2017-06-09 09:26:36', '2017-12-31 09:26:39', '2017-07-13 16:14:36', '2017-07-13 16:14:36', '2017-07-13 17:47:39', null, '15', null);
INSERT INTO `tasks` VALUES ('104', '检查医疗干部休假系统短信发送端运行情况', '检查医疗干部休假系统短信发送端运行情况', '28', '32', '28', '2017-07-13 16:14:36', '2017-07-13 16:14:36', 'recieved', '', 'daily', '2017-06-09 10:04:41', '2017-12-31 10:04:43', '2017-07-13 16:14:36', '2017-07-13 16:14:36', null, null, '17', null);
INSERT INTO `tasks` VALUES ('105', '提取医疗干部休假系统干部休假情况', '如果有干部休假同意的，打印批复表，盖章，并发至相应的科室', '28', '32', '28', '2017-07-13 16:14:36', '2017-07-13 16:14:36', 'recieved', '', 'daily', '2017-06-09 10:06:58', '2017-12-31 10:07:01', '2017-07-13 16:14:36', '2017-07-13 16:14:36', null, null, '18', null);
INSERT INTO `tasks` VALUES ('106', '病人随访', '须做至少2个病人回访', '28', '32', '28', '2017-07-13 16:14:36', '2017-07-13 16:14:36', 'recieved', '', 'daily', '2017-06-12 15:23:15', '2017-12-31 15:23:23', '2017-07-13 16:14:36', '2017-07-13 16:14:36', null, null, '19', null);
INSERT INTO `tasks` VALUES ('107', '更新医院外网信息', '更新医院外网信息', '28', '32', '28', '2017-07-13 16:14:36', '2017-07-13 16:14:36', 'recieved', '', 'daily', '2017-06-12 15:34:27', '2017-12-31 15:34:33', '2017-07-13 16:14:36', '2017-07-13 16:14:36', null, null, '20', null);
INSERT INTO `tasks` VALUES ('108', '更新公安网健康服务平台信息', '更新公安网健康服务平台信息', '28', '32', '28', '2017-07-13 16:14:36', '2017-07-13 16:14:36', 'recieved', '', 'daily', '2017-06-12 15:34:34', '2017-12-31 15:35:10', '2017-07-13 16:14:36', '2017-07-13 16:14:36', null, null, '21', null);
INSERT INTO `tasks` VALUES ('109', '每天下午在线直播远程医疗视频教学', '开放远程会诊中心，刻录视频', '20', '23', '20', '2017-07-13 16:14:36', '2017-07-13 17:18:25', 'doing', '', 'daily', '2017-07-04 08:40:24', '2017-12-31 08:40:27', '2017-07-13 16:14:36', '2017-07-13 16:14:36', '2017-07-13 17:18:25', null, '28', null);
INSERT INTO `tasks` VALUES ('110', '远程会诊中心卫生', '保证中心卫生干净，物品摆放整齐。', '28', '23', '28', '2017-07-14 00:14:37', '2017-07-14 00:14:37', 'recieved', '', 'daily', '2017-06-09 09:23:42', '2017-12-31 09:23:45', '2017-07-14 00:14:37', '2017-07-14 00:14:37', null, null, '14', null);
INSERT INTO `tasks` VALUES ('111', '叫号系统巡查', '检查医院三个门诊医疗区分诊叫号系统运行情况', '28', '23', '28', '2017-07-14 00:14:37', '2017-07-14 00:14:37', 'recieved', '', 'daily', '2017-06-09 09:26:36', '2017-12-31 09:26:39', '2017-07-14 00:14:37', '2017-07-14 00:14:37', null, null, '15', null);
INSERT INTO `tasks` VALUES ('112', '检查医疗干部休假系统短信发送端运行情况', '检查医疗干部休假系统短信发送端运行情况', '28', '32', '28', '2017-07-14 00:14:37', '2017-07-14 00:14:37', 'recieved', '', 'daily', '2017-06-09 10:04:41', '2017-12-31 10:04:43', '2017-07-14 00:14:37', '2017-07-14 00:14:37', null, null, '17', null);
INSERT INTO `tasks` VALUES ('113', '提取医疗干部休假系统干部休假情况', '如果有干部休假同意的，打印批复表，盖章，并发至相应的科室', '28', '32', '28', '2017-07-14 00:14:37', '2017-07-14 00:14:37', 'recieved', '', 'daily', '2017-06-09 10:06:58', '2017-12-31 10:07:01', '2017-07-14 00:14:37', '2017-07-14 00:14:37', null, null, '18', null);
INSERT INTO `tasks` VALUES ('114', '病人随访', '须做至少2个病人回访', '28', '32', '28', '2017-07-14 00:14:37', '2017-07-14 00:14:37', 'recieved', '', 'daily', '2017-06-12 15:23:15', '2017-12-31 15:23:23', '2017-07-14 00:14:37', '2017-07-14 00:14:37', null, null, '19', null);
INSERT INTO `tasks` VALUES ('115', '更新医院外网信息', '更新医院外网信息', '28', '32', '28', '2017-07-14 00:14:37', '2017-07-14 00:14:37', 'recieved', '', 'daily', '2017-06-12 15:34:27', '2017-12-31 15:34:33', '2017-07-14 00:14:37', '2017-07-14 00:14:37', null, null, '20', null);
INSERT INTO `tasks` VALUES ('116', '更新公安网健康服务平台信息', '更新公安网健康服务平台信息', '28', '32', '28', '2017-07-14 00:14:37', '2017-07-14 00:14:37', 'recieved', '', 'daily', '2017-06-12 15:34:34', '2017-12-31 15:35:10', '2017-07-14 00:14:37', '2017-07-14 00:14:37', null, null, '21', null);
INSERT INTO `tasks` VALUES ('117', '每天下午在线直播远程医疗视频教学', '开放远程会诊中心，刻录视频', '20', '23', '20', '2017-07-14 00:14:37', '2017-07-14 00:14:37', 'recieved', '', 'daily', '2017-07-04 08:40:24', '2017-12-31 08:40:27', '2017-07-14 00:14:37', '2017-07-14 00:14:37', null, null, '28', null);

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `nick_name` char(20) DEFAULT NULL,
  `pwd` char(30) DEFAULT '123',
  `avatar` char(40) DEFAULT NULL,
  `sex` set('male','female') DEFAULT 'male',
  `tel` char(15) DEFAULT NULL,
  `addr` varchar(30) DEFAULT NULL,
  `mobile` char(15) DEFAULT NULL,
  `position` char(20) DEFAULT NULL,
  `dep_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('20', 'pan', 'xiaopan', '123', '/uploads/fa7.jpg', 'male', '052-989699', null, '13520215555', 'engineer', '14', '7');
INSERT INTO `users` VALUES ('23', 'liuy', '柳阳', '123', '', 'female', '0755-82699123', '', '18682055251', '职员', '15', '10');
INSERT INTO `users` VALUES ('27', 'binby', 'binby', '123', '/uploads/winry31.jpg', 'male', '0755-82699122', null, '13823682603', '工程师', '15', '9');
INSERT INTO `users` VALUES ('28', 'luo', '罗燕斌', '123', '/uploads/fa6.jpg', 'male', '020-333434', null, '13823682603', '工程师', '15', '8');
INSERT INTO `users` VALUES ('32', 'zhouxy', '周晓云', '123', null, 'female', null, null, '15632016950', '职员', '15', '10');
INSERT INTO `users` VALUES ('33', 'hef', '何方', '123', null, 'female', null, null, null, null, '16', '11');

-- ----------------------------
-- View structure for `v_apply`
-- ----------------------------
DROP VIEW IF EXISTS `v_apply`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_apply` AS select `applies`.`id` AS `id`,`applies`.`title` AS `title`,`applies`.`content` AS `content`,`applies`.`ctime` AS `ctime`,`applies`.`mtime` AS `mtime`,`applies`.`status` AS `status`,`applies`.`dep_id` AS `dep_id`,`applies`.`type` AS `type`,`applies`.`creator` AS `creator`,`applies`.`assigner` AS `assigner`,`applies`.`reciever` AS `reciever`,`applies`.`assign_time` AS `assign_time`,`applies`.`recieve_time` AS `recieve_time`,`applies`.`job_start` AS `job_start`,`applies`.`job_end` AS `job_end`,`applies`.`job_desc` AS `job_desc`,`applies`.`addr` AS `addr`,`applies`.`tel` AS `tel`,`applies`.`result` AS `result`,`cusers`.`name` AS `creatorName`,`ausers`.`name` AS `assignerName`,`rusers`.`name` AS `recieverName` from (((`applies` left join `users` `cusers` on((`cusers`.`id` = `applies`.`creator`))) left join `users` `ausers` on((`applies`.`assigner` = `ausers`.`id`))) left join `users` `rusers` on((`applies`.`reciever` = `rusers`.`id`))) ;

-- ----------------------------
-- View structure for `v_user`
-- ----------------------------
DROP VIEW IF EXISTS `v_user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user` AS select `users`.`id` AS `userId`,`users`.`name` AS `userName`,`users`.`nick_name` AS `userNickName`,`users`.`pwd` AS `userPwd`,`users`.`avatar` AS `userAvatar`,`users`.`sex` AS `userSex`,`users`.`tel` AS `userTel`,`users`.`addr` AS `userAddr`,`users`.`mobile` AS `userMobile`,`users`.`position` AS `userPosition`,`users`.`dep_id` AS `userDepId`,`users`.`role_id` AS `userRoleId`,`deps`.`id` AS `depId`,`deps`.`name` AS `depName`,`deps`.`addr` AS `depAddr`,`deps`.`tel` AS `depTel`,`deps`.`manager` AS `depManager`,`roles`.`id` AS `roleId`,`roles`.`name` AS `roleName`,`roles`.`cname` AS `roleCname`,`roles`.`sys_admin` AS `roleSysAdmin`,`roles`.`task_assign` AS `roleTaskAssign`,`roles`.`task_recieve` AS `roleTaskRecieve`,`roles`.`task_create` AS `roleTaskCreate`,`roles`.`task_remove` AS `roleTaskRemove`,`roles`.`user_create` AS `roleUserCreate`,`roles`.`user_remove` AS `roleUserRemove`,`roles`.`duty_create` AS `roleDutyCreate`,`roles`.`user_update` AS `roleUserUpdate`,`roles`.`data_stat` AS `roleDataStat`,`roles`.`apply_remove` AS `roleApplyRemove`,`roles`.`apply_update` AS `roleApplyUpdate`,`roles`.`apply_create` AS `roleApplyCreate` from ((`users` left join `roles` on((`users`.`role_id` = `roles`.`id`))) left join `deps` on((`users`.`dep_id` = `deps`.`id`))) ;

-- ----------------------------
-- View structure for `v_duty`
-- ----------------------------
DROP VIEW IF EXISTS `v_duty`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_duty` AS select `duties`.`sign_in` AS `signIn`,`duties`.`sign_out` AS `signOut`,`duties`.`meno` AS `meno`,`duties`.`id` AS `id`,`v_user`.`userName` AS `userName`,`v_user`.`userId` AS `userId`,`v_user`.`depName` AS `depName`,`duties`.`sign_out2` AS `signOut2`,`duties`.`sign_in2` AS `signIn2` from (`duties` left join `v_user` on((`v_user`.`userId` = `duties`.`user_id`))) ;

-- ----------------------------
-- View structure for `v_task`
-- ----------------------------
DROP VIEW IF EXISTS `v_task`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_task` AS select `tasks`.`id` AS `id`,`tasks`.`title` AS `title`,`tasks`.`content` AS `content`,`tasks`.`assigner` AS `assigner`,`tasks`.`assign_time` AS `assign_time`,`ausers`.`name` AS `assignerName`,`tasks`.`reciever` AS `reciever`,`tasks`.`recieve_time` AS `recieve_time`,`rusers`.`name` AS `recieverName`,`tasks`.`creator` AS `creator`,`cusers`.`name` AS `creatorName`,`tasks`.`ctime` AS `ctime`,`tasks`.`mtime` AS `mtime`,`tasks`.`status` AS `status`,`tasks`.`reason` AS `reason`,`tasks`.`frequency` AS `frequency`,`tasks`.`expect_start` AS `expect_start`,`tasks`.`expect_end` AS `expect_end`,`tasks`.`task_start` AS `task_start`,`tasks`.`task_end` AS `task_end` from (((`tasks` left join `users` `rusers` on((`rusers`.`id` = `tasks`.`reciever`))) left join `users` `ausers` on((`ausers`.`id` = `tasks`.`assigner`))) left join `users` `cusers` on((`cusers`.`id` = `tasks`.`creator`))) order by `tasks`.`ctime` desc ;


