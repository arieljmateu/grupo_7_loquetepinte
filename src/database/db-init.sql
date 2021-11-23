-- MariaDB dump 10.19  Distrib 10.5.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: loquetepinte
-- ------------------------------------------------------
-- Server version	10.5.12-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `loquetepinte`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `loquetepinte` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `loquetepinte`;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Artística','2021-11-13 21:04:27','2021-11-13 21:04:27'),(2,'Insumos Computación','2021-11-13 21:06:09','2021-11-13 21:06:09'),(3,'Librería Comercial','2021-11-13 21:06:17','2021-11-13 21:06:17'),(4,'Librería Escolar','2021-11-13 21:06:31','2021-11-13 21:06:31'),(5,'Papelera','2021-11-13 21:06:38','2021-11-13 21:06:38');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Blanco','2021-11-14 22:07:34','2021-11-14 22:07:34'),(2,'Negro','2021-11-14 22:07:34','2021-11-14 22:07:34'),(3,'Rojo','2021-11-14 22:07:34','2021-11-14 22:07:34'),(4,'Verde','2021-11-14 22:07:34','2021-11-14 22:07:34'),(5,'Azul','2021-11-14 22:07:34','2021-11-14 22:07:34'),(6,'Amarillo','2021-11-14 22:07:34','2021-11-14 22:07:34');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `discount_percent` decimal(2,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(70) NOT NULL,
  `color_id` int(10) unsigned DEFAULT NULL,
  `size_id` int(10) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `discount_id` int(10) unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `color_id` (`color_id`),
  KEY `size_id` (`size_id`),
  KEY `category_id` (`category_id`),
  KEY `discount_id` (`discount_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Cuaderno','Cuaderno tapa dura, 42 hojas, rayado, Gloria Escolar Araña',170.00,'1.jpg',NULL,NULL,4,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(2,'Cartuchera','Cartuchera desplegable con cierre',1200.00,'2.jpg',NULL,NULL,4,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(3,'Plasticola','Adhesivo vinílico, cola blanca',230.00,'3.jpg',NULL,NULL,4,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(4,'Mochila','Mochila Gremond con carrito reforzada, unisex',5600.00,'4.jpg',NULL,NULL,4,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(5,'Lápices de colores','Lápices de colores Faber Castell supersoft, Caja x 60',750.00,'5.jpg',NULL,NULL,4,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(6,'Abrochadora','Abrochadora MIT, pinza metálica',1250.00,'6.jpg',NULL,NULL,3,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(7,'Bolígrafo','Lapicera Parker, tinta negra',1500.00,'7.jpg',NULL,NULL,3,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(8,'Almoadilla para sellos','Almohadilla de goma para sellos, apta para tinta al agua',185.00,'8.jpg',NULL,NULL,3,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(9,'Calculadora','Calculadora escritorio Casio, display 12 dígitos',890.00,'9.jpg',NULL,NULL,3,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(10,'Cesto papelero','Cesto papelero metálico, ideal oficina',950.00,'10.jpg',NULL,NULL,3,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(11,'Pinceles','Set de 6 pinceles sintéticos',650.00,'11.jpg',NULL,NULL,1,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(12,'Acrílico decorativo','Pintura acrílica Eterna, x 250 ml',129.00,'12.jpg',NULL,NULL,1,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(13,'Acuarela','Lata con 12 acuarelas Reeves',980.00,'13.jpg',NULL,NULL,1,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(14,'Atril','Atril de madera profesional, 1,80 mts',2250.00,'14.jpg',NULL,NULL,1,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(15,'Base de corte','Base plancha, tabla de corte A3, 45x30 cm',1890.00,'15.jpg',NULL,NULL,1,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(16,'Cartucho negro','Cartucho negro HP, original',3480.00,'16.jpg',NULL,NULL,2,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(17,'Cartucho color','Cartucho color HP, original',3650.00,'17.jpg',NULL,NULL,2,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(18,'DVD','DVD grabable Verbatim x 4 unidades',870.00,'18.jpg',NULL,NULL,2,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(19,'Mouse óptico','Mouse inalámbrico Logitech 170, gris y negro',980.00,'19.jpg',NULL,NULL,2,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(20,'Memoria 8GB','Tarjeta de memoria micro SD, clase 10',1100.00,'20.jpg',NULL,NULL,2,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(21,'Bolsa Kraft','Bolsa de papel madera con manija, 34 x 17 x 49 cm. Paquete x 50 unidades',1500.00,'21.jpg',NULL,NULL,5,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(22,'Servilletas','Servilletas de papel, 30 x 40 cm., paquete x 50 unidades',98.00,'22.jpg',NULL,NULL,5,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(23,'Caja','Caja de crtón para envíos, 20 x 20 x 20 cm. Paquete x 25 unidades',870.00,'23.jpg',NULL,NULL,5,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(24,'Platos','Plato biodegradable x 20 cm. Paquete x 20 unidades',1200.00,'24.jpg',NULL,NULL,5,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49'),(25,'Vasos','Vaso descartable con tapa, 200 ml. Paquete x 20 unidades',1150.00,'25.jpg',NULL,NULL,5,NULL,'2021-11-13 22:06:49','2021-11-13 22:06:49');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sizes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'Chico','2021-11-15 17:48:27','2021-11-15 17:48:27'),(2,'Mediano','2021-11-15 17:48:27','2021-11-15 17:48:27'),(3,'Grande','2021-11-15 17:48:27','2021-11-15 17:48:27');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(80) NOT NULL,
  `hashed_password` char(80) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `avatar` varchar(50) NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted at`datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-15 20:58:28
