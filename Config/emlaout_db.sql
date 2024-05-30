-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: emalof2l_emalout
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_username` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin_password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin_channel` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_user`
--

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'varinder','varinder2good','emalout'),(2,'varinder','varinder2good','emalout');
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emalout_all_buss_categories`
--

DROP TABLE IF EXISTS `emalout_all_buss_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emalout_all_buss_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emalout_all_buss_categories`
--

LOCK TABLES `emalout_all_buss_categories` WRITE;
/*!40000 ALTER TABLE `emalout_all_buss_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `emalout_all_buss_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emalout_bussinesses`
--

DROP TABLE IF EXISTS `emalout_bussinesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emalout_bussinesses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_contact` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `buss_name` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `buss_contact` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `buss_address` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `buss_city` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `buss_district` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `features` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `weekdays` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `buss_images` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emalout_bussinesses`
--

LOCK TABLES `emalout_bussinesses` WRITE;
/*!40000 ALTER TABLE `emalout_bussinesses` DISABLE KEYS */;
/*!40000 ALTER TABLE `emalout_bussinesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emalout_news`
--

DROP TABLE IF EXISTS `emalout_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emalout_news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `facebook_link` varchar(255) DEFAULT NULL,
  `insta_link` varchar(255) DEFAULT NULL,
  `youtube_link` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `videos` varchar(255) DEFAULT NULL,
  `channel_id` varchar(255) DEFAULT NULL,
  `author_id` varchar(255) DEFAULT NULL,
  `city_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emalout_news`
--

LOCK TABLES `emalout_news` WRITE;
/*!40000 ALTER TABLE `emalout_news` DISABLE KEYS */;
INSERT INTO `emalout_news` VALUES (1,'title_3','description_3','author_3','facebook_link_3','insta_link_3','youtube_link_3','1','images_3','videos_3','channel_id_3','author_id_3','city_id_3',NULL,'2024-05-29 21:05:20'),(3,'update_title','description_4','author_4','facebook_link_4','insta_link_4','youtube_link_4','0','images_4','videos_4','channel_id_4','author_id_4','city_id_4','2024-05-29 21:11:56','2024-05-30 21:27:37'),(4,'title_5','description_5','author_5','facebook_link_5','insta_link_5','youtube_link_5','0','images_5','videos_5','channel_id_5','author_id_5','city_id_5','2024-05-29 22:00:27','2024-05-29 22:00:27'),(5,'title_6','description_6','author_6','facebook_link_6','insta_link_6','youtube_link_6','1','images_6','videos_6','channel_id_6','author_id_6','city_id_6','2024-05-29 22:01:52','2024-05-29 22:01:52'),(6,'title_7','description_7','author_7','facebook_link_7','insta_link_7','youtube_link_7','1','images_7','videos_7','channel_id_7','author_id_7','city_id_7','2024-05-29 22:06:21','2024-05-29 22:06:21'),(7,'title_8','description_8','author_8','facebook_link_8','insta_link_8','youtube_link_8','1','images_8','videos_8','channel_id_8','author_id_8','city_id_8','2024-05-29 22:07:09','2024-05-29 22:07:09');
/*!40000 ALTER TABLE `emalout_news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-30 21:39:59
