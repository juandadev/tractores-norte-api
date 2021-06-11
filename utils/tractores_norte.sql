-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2021 a las 22:05:56
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tractores_norte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name_category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `name_category`) VALUES
(1, 'recepción de compra'),
(2, 'transferencia de orden abierta'),
(3, 'estatus de inventario'),
(4, 'transferencia de salida'),
(5, 'transferencia de entrada'),
(6, 'transferencia de producto entrante'),
(7, 'mantenimiento de óptimos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id_client` int(11) NOT NULL,
  `name_client` varchar(100) NOT NULL,
  `address_client` varchar(100) DEFAULT NULL,
  `phone_client` bigint(10) DEFAULT NULL,
  `email_client` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id_client`, `name_client`, `address_client`, `phone_client`, `email_client`) VALUES
(1, 'hermenegildo barrera', 'independencia #82 col. centro', 6271234567, 'hermenegildo@gmail.com'),
(2, 'mario flores', 'yaquis #12 col. villas del tecnológico', 6271458326, 'mariof@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `key_product` varchar(10) NOT NULL,
  `name_product` varchar(50) NOT NULL,
  `fk_category_id` int(11) NOT NULL,
  `fk_store_id` int(11) NOT NULL,
  `stock_product` int(11) NOT NULL,
  `fk_vendor_id` int(11) NOT NULL,
  `state_product` enum('success','warning','danger') NOT NULL DEFAULT 'warning'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `key_product`, `name_product`, `fk_category_id`, `fk_store_id`, `stock_product`, `fk_vendor_id`, `state_product`) VALUES
(1, '01-01', 'bulldozer', 1, 1, 5, 1, 'success'),
(2, '02-05', 'cargador', 2, 3, 1, 1, 'warning'),
(3, '03-02', 'excavadora', 3, 5, 3, 2, 'danger');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stores`
--

CREATE TABLE `stores` (
  `id_store` int(11) NOT NULL,
  `name_store` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `stores`
--

INSERT INTO `stores` (`id_store`, `name_store`) VALUES
(1, 'delicias'),
(2, 'jiménez'),
(3, 'cuauhtémoc'),
(4, 'casas grandes'),
(5, 'torreón'),
(6, 'durango');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(50) NOT NULL,
  `address_user` varchar(100) DEFAULT NULL,
  `phone_user` bigint(10) DEFAULT NULL,
  `email_user` varchar(50) NOT NULL,
  `password_user` varchar(100) NOT NULL,
  `level_user` enum('admin','user') NOT NULL DEFAULT 'user',
  `auth_token` varchar(100) DEFAULT NULL,
  `refresh_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `address_user`, `phone_user`, `email_user`, `password_user`, `level_user`, `auth_token`, `refresh_token`) VALUES
(1, 'Juan Daniel Martínez', '15 de Mayo #26 Col. Centro', 6271225229, 'jdmartinez@itparral.edu.mx', '$2b$10$g4b9W/MhG4VKX4wCFvdX7OxmV1mgt6AjnRNbXCPXV1E4FlrirS/rO', 'admin', NULL, NULL),
(2, 'Anahis Lopez', 'CNOP', 6271234567, 'anahis@gmail.com', '$2b$10$BHYwb2MrjS2iq4HZraADIOK.Sx4R71jhBObd3erPNIz/wJTmORpQ6', 'admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendors`
--

CREATE TABLE `vendors` (
  `id_vendor` int(11) NOT NULL,
  `name_vendor` varchar(100) NOT NULL,
  `phone_vendor` bigint(10) DEFAULT NULL,
  `social_vendor` varchar(100) DEFAULT NULL,
  `address_vendor` varchar(100) DEFAULT NULL,
  `bank_vendor` bigint(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `vendors`
--

INSERT INTO `vendors` (`id_vendor`, `name_vendor`, `phone_vendor`, `social_vendor`, `address_vendor`, `bank_vendor`) VALUES
(1, 'uniformes y equipos', 6271463589, 'surtidora de uniformes y equipos s. a. de c. v.', 'calle chihuahua #50 col. centro', 1132254687799634),
(2, 'stylos', 6271234863, 'grupo stylos s. a. de c. v.', 'calle ojinaga #30 col. centro', 11332456789955);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id_client`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `fk_vendor_id` (`fk_vendor_id`),
  ADD KEY `fk_category_id` (`fk_category_id`),
  ADD KEY `fk_store_id` (`fk_store_id`);

--
-- Indices de la tabla `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id_store`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id_vendor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `stores`
--
ALTER TABLE `stores`
  MODIFY `id_store` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id_vendor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`fk_vendor_id`) REFERENCES `vendors` (`id_vendor`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`id_category`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`fk_store_id`) REFERENCES `stores` (`id_store`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
