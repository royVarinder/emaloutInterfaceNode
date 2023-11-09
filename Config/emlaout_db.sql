/*
SQLyog Ultimate v8.53 
MySQL - 5.5.5-10.4.28-MariaDB : Database - emalof2l_emalout
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`emalof2l_emalout` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `emalof2l_emalout`;

/*Table structure for table `admin_user` */

DROP TABLE IF EXISTS `admin_user`;

CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_username` varchar(250) NOT NULL,
  `admin_password` varchar(250) NOT NULL,
  `admin_channel` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `admin_user` */

insert  into `admin_user`(`id`,`admin_username`,`admin_password`,`admin_channel`) values (1,'varinder','varinder2good','emalout'),(2,'varinder','varinder2good','emalout');

/*Table structure for table `emalout_all_buss_categories` */

DROP TABLE IF EXISTS `emalout_all_buss_categories`;

CREATE TABLE `emalout_all_buss_categories` (
  `id` int(211) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `emalout_all_buss_categories` */

/*Table structure for table `emalout_bussinesses` */

DROP TABLE IF EXISTS `emalout_bussinesses`;

CREATE TABLE `emalout_bussinesses` (
  `id` int(211) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(211) NOT NULL,
  `user_contact` varchar(211) NOT NULL,
  `buss_name` varchar(211) NOT NULL,
  `buss_contact` varchar(211) NOT NULL,
  `category_id` varchar(211) NOT NULL,
  `buss_address` varchar(211) NOT NULL,
  `buss_city` varchar(211) NOT NULL,
  `buss_district` varchar(211) NOT NULL,
  `features` varchar(211) NOT NULL,
  `weekdays` varchar(211) NOT NULL,
  `buss_images` varchar(211) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `emalout_bussinesses` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
