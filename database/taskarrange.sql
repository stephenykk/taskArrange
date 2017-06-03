/*
Navicat MySQL Data Transfer

Source Server         : myown
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : taskarrange

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-06-03 17:55:26
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of applies
-- ----------------------------
INSERT INTO `applies` VALUES ('2', '打印机有点奇怪的响声', '次哦么and ahs  dofodfo', '2017-05-28 17:02:20', '2017-05-31 22:26:44', 'assigned', '10', 'print', '27', '27', '27', '2017-05-31 22:26:44', null, null, null, null, '行政楼402', '3230044', null, null);
INSERT INTO `applies` VALUES ('4', 'sodoodo oeowoe ddf 3', 'sewoeo ', '2017-05-28 17:03:25', '2017-06-02 04:58:56', 'assigned', '10', 'print', '27', '27', '27', '2017-06-02 04:58:56', '2017-05-30 04:50:59', '2017-05-30 04:56:10', '2017-05-30 04:56:14', null, '行政楼402', '3230044', 'unfixed', '定位不到具体原因，请大神帮忙..');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of deps
-- ----------------------------
INSERT INTO `deps` VALUES ('1', '信息科热rbbn', '行政楼203', '3822829', '20');
INSERT INTO `deps` VALUES ('2', '小儿科2', '门诊楼203', '324342', '17');
INSERT INTO `deps` VALUES ('3', '内科', '门诊楼242', '222342', '17');
INSERT INTO `deps` VALUES ('4', '内科2', '门诊楼243', '44432', '17');
INSERT INTO `deps` VALUES ('5', '外科', '门诊楼443', '2311233', '17');
INSERT INTO `deps` VALUES ('6', '外科2', '门诊楼443', '2311233', '17');
INSERT INTO `deps` VALUES ('10', '小儿保健科', '行政楼402', '3230044', '20');
INSERT INTO `deps` VALUES ('11', '小儿保健科2-cc', '行政楼402-3', '020-908763', '6');
INSERT INTO `deps` VALUES ('13', '生活科', '23ff', '0755-6996985', '7');
INSERT INTO `deps` VALUES ('14', '信息科', '信息楼202', '020-55254', '28');

-- ----------------------------
-- Table structure for `duties`
-- ----------------------------
DROP TABLE IF EXISTS `duties`;
CREATE TABLE `duties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `sign_in` timestamp NULL DEFAULT NULL,
  `sign_out` timestamp NULL DEFAULT NULL,
  `meno` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of duties
-- ----------------------------
INSERT INTO `duties` VALUES ('9', '27', '2017-05-31 04:50:49', '2017-05-31 22:37:45', null);
INSERT INTO `duties` VALUES ('10', '9', '2017-05-31 05:15:02', '2017-05-31 05:17:40', null);
INSERT INTO `duties` VALUES ('11', '20', '2017-05-31 05:22:25', '2017-05-31 05:22:47', null);
INSERT INTO `duties` VALUES ('12', '20', '2017-06-02 06:41:18', '2017-06-02 06:41:22', null);
INSERT INTO `duties` VALUES ('13', '20', '2017-06-03 13:30:55', null, null);
INSERT INTO `duties` VALUES ('14', '26', '2017-06-03 17:42:32', '2017-06-03 17:42:36', null);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO `tasks` VALUES ('2', 'ertr', 'trtr', '27', '27', '27', '2017-05-17 01:10:09', '2017-05-28 10:17:03', 'finish', 'helo world3', 'daily', '2017-05-17 01:09:50', '2017-05-27 01:10:01', '2017-05-17 01:10:08', '2017-05-28 04:55:22', '2017-05-28 04:55:29', '2017-05-28 04:55:32');
INSERT INTO `tasks` VALUES ('3', '新任务001', 'keep health , to be youself, think deep', '27', '22', '27', '2017-05-18 00:57:10', '2017-05-18 00:57:10', 'assigned', null, 'daily', '2017-05-18 00:56:43', '2017-05-19 00:56:52', '2017-05-18 00:57:10', null, null, null);
INSERT INTO `tasks` VALUES ('4', '哈奥', 'so many thing to carry out...', '27', '26', '27', '2017-05-18 00:57:54', '2017-05-18 00:57:54', 'assigned', null, 'once', '2017-05-19 00:56:43', '2017-05-30 00:56:52', '2017-05-18 00:57:54', null, null, null);
INSERT INTO `tasks` VALUES ('5', '我们的周末3', '好偶尔偶然', '27', '27', '27', '2017-05-18 00:58:58', '2017-06-02 22:55:52', 'finish', null, 'monthly', '2017-05-18 00:58:52', '2017-05-31 00:58:56', '2017-05-25 00:12:10', null, null, '2017-06-02 22:55:52');
INSERT INTO `tasks` VALUES ('9', 'dfdf-socool-2', 'sdd', '27', '22', '9', '2017-05-28 11:45:33', '2017-05-28 11:45:33', 'assigned', null, 'daily', '2017-05-28 11:45:12', '2017-05-30 11:45:15', '2017-05-28 12:23:10', null, null, null);

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('6', 'nurse4', 'sindy', '123', '/uploads/fa1.jpg', 'female', '020-0909494', null, '13809092039', '护士', '10', '11');
INSERT INTO `users` VALUES ('7', 'asigner3', 'andy', '123', null, 'male', '0220-665554', null, '13546885585', 'iter', '14', '9');
INSERT INTO `users` VALUES ('19', 'asigner2', 'john', '123', null, 'male', '252-696565', null, '135252525', 'it technonical', '14', '9');
INSERT INTO `users` VALUES ('20', 'pan', 'xiaopan', '123', '/uploads/fa7.jpg', 'male', '052-989699', null, '13520215555', 'engineer', '14', '7');
INSERT INTO `users` VALUES ('22', 'nurse1', 'kitty', '123', null, 'female', '020-965585', null, '1365221522', 'nurse', '10', '11');
INSERT INTO `users` VALUES ('23', 'iter3', 'robin', '123', '', 'male', '029039302', '', '13652425257', 'doctor', '14', '10');
INSERT INTO `users` VALUES ('24', 'iter2', 'winry', '123', '/uploads/fa5.jpg', 'female', '025-96965655', null, '159632552', 'technician', '14', '10');
INSERT INTO `users` VALUES ('26', 'iter1', 'lucy-huang', '123', '/uploads/winry5.jpg', 'female', '020-9383894', null, '139092029303', 'doctor', '14', '10');
INSERT INTO `users` VALUES ('27', 'asigner1', 'daizy', '123', '/uploads/winry31.jpg', 'female', '020-30394', null, '12033434', 'tech-00933', '14', '9');
INSERT INTO `users` VALUES ('28', 'luo', 'luo-leader', '123', '/uploads/fa6.jpg', 'male', '020-333434', null, '136201315545', '信息科科长', '5', '8');
INSERT INTO `users` VALUES ('29', 'nurse3', 'alice', '123', null, 'female', '020-59898989', null, '135869555', 'nurse', '4', '11');
INSERT INTO `users` VALUES ('31', 'nurse2', 'nami', '123', null, 'female', '252-9865566', null, '1352201211', 'nurse', '5', '11');

-- ----------------------------
-- View structure for `v_apply`
-- ----------------------------
DROP VIEW IF EXISTS `v_apply`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_apply` AS select `applies`.`id` AS `id`,`applies`.`title` AS `title`,`applies`.`content` AS `content`,`applies`.`ctime` AS `ctime`,`applies`.`mtime` AS `mtime`,`applies`.`status` AS `status`,`applies`.`dep_id` AS `dep_id`,`applies`.`type` AS `type`,`applies`.`creator` AS `creator`,`applies`.`assigner` AS `assigner`,`applies`.`reciever` AS `reciever`,`applies`.`assign_time` AS `assign_time`,`applies`.`recieve_time` AS `recieve_time`,`applies`.`job_start` AS `job_start`,`applies`.`job_end` AS `job_end`,`applies`.`job_desc` AS `job_desc`,`applies`.`addr` AS `addr`,`applies`.`tel` AS `tel`,`applies`.`result` AS `result`,`cusers`.`name` AS `creatorName`,`ausers`.`name` AS `assignerName`,`rusers`.`name` AS `recieverName` from (((`applies` left join `users` `cusers` on((`cusers`.`id` = `applies`.`creator`))) left join `users` `ausers` on((`applies`.`assigner` = `ausers`.`id`))) left join `users` `rusers` on((`applies`.`reciever` = `rusers`.`id`))) ;

-- ----------------------------
-- View structure for `v_task`
-- ----------------------------
DROP VIEW IF EXISTS `v_task`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_task` AS select `tasks`.`id` AS `id`,`tasks`.`title` AS `title`,`tasks`.`content` AS `content`,`tasks`.`assigner` AS `assigner`,`tasks`.`assign_time` AS `assign_time`,`ausers`.`name` AS `assignerName`,`tasks`.`reciever` AS `reciever`,`tasks`.`recieve_time` AS `recieve_time`,`rusers`.`name` AS `recieverName`,`tasks`.`creator` AS `creator`,`cusers`.`name` AS `creatorName`,`tasks`.`ctime` AS `ctime`,`tasks`.`mtime` AS `mtime`,`tasks`.`status` AS `status`,`tasks`.`reason` AS `reason`,`tasks`.`frequency` AS `frequency`,`tasks`.`expect_start` AS `expect_start`,`tasks`.`expect_end` AS `expect_end`,`tasks`.`task_start` AS `task_start`,`tasks`.`task_end` AS `task_end` from (((`tasks` left join `users` `rusers` on((`rusers`.`id` = `tasks`.`reciever`))) left join `users` `ausers` on((`ausers`.`id` = `tasks`.`assigner`))) left join `users` `cusers` on((`cusers`.`id` = `tasks`.`creator`))) order by `tasks`.`ctime` desc ;

-- ----------------------------
-- View structure for `v_user`
-- ----------------------------
DROP VIEW IF EXISTS `v_user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_user` AS select `users`.`id` AS `userId`,`users`.`name` AS `userName`,`users`.`nick_name` AS `userNickName`,`users`.`pwd` AS `userPwd`,`users`.`avatar` AS `userAvatar`,`users`.`sex` AS `userSex`,`users`.`tel` AS `userTel`,`users`.`addr` AS `userAddr`,`users`.`mobile` AS `userMobile`,`users`.`position` AS `userPosition`,`users`.`dep_id` AS `userDepId`,`users`.`role_id` AS `userRoleId`,`deps`.`id` AS `depId`,`deps`.`name` AS `depName`,`deps`.`addr` AS `depAddr`,`deps`.`tel` AS `depTel`,`deps`.`manager` AS `depManager`,`roles`.`id` AS `roleId`,`roles`.`name` AS `roleName`,`roles`.`cname` AS `roleCname`,`roles`.`sys_admin` AS `roleSysAdmin`,`roles`.`task_assign` AS `roleTaskAssign`,`roles`.`task_recieve` AS `roleTaskRecieve`,`roles`.`task_create` AS `roleTaskCreate`,`roles`.`task_remove` AS `roleTaskRemove`,`roles`.`user_create` AS `roleUserCreate`,`roles`.`user_remove` AS `roleUserRemove`,`roles`.`duty_create` AS `roleDutyCreate`,`roles`.`user_update` AS `roleUserUpdate`,`roles`.`data_stat` AS `roleDataStat`,`roles`.`apply_remove` AS `roleApplyRemove`,`roles`.`apply_update` AS `roleApplyUpdate`,`roles`.`apply_create` AS `roleApplyCreate` from ((`users` left join `roles` on((`users`.`role_id` = `roles`.`id`))) left join `deps` on((`users`.`dep_id` = `deps`.`id`))) ;
