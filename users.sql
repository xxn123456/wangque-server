/*
 Navicat Premium Data Transfer

 Source Server         : spring-test
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : koa

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 03/08/2020 00:32:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userId` int(0) NOT NULL AUTO_INCREMENT,
  `mobileNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, '10010', '123456');
INSERT INTO `users` VALUES (3, '10086', '123');
INSERT INTO `users` VALUES (4, '111', '1111');
INSERT INTO `users` VALUES (5, '2222', '2222');
INSERT INTO `users` VALUES (6, '3333', '22222');
INSERT INTO `users` VALUES (7, '5555', '3333');
INSERT INTO `users` VALUES (8, '45566', '33333');
INSERT INTO `users` VALUES (9, '678', '21122');
INSERT INTO `users` VALUES (10, '3333', '44555');
INSERT INTO `users` VALUES (11, '23455', '6788');
INSERT INTO `users` VALUES (12, '111111111', '1111');
INSERT INTO `users` VALUES (15, 'zm', '112222222');
INSERT INTO `users` VALUES (16, 'zm2', '112222222');

SET FOREIGN_KEY_CHECKS = 1;
