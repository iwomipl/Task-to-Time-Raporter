-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Lut 2022, 08:52
-- Wersja serwera: 10.4.16-MariaDB
-- Wersja PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `nextrope`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tasks`
--

CREATE TABLE `tasks` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `endTime` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `timeOfTask` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `startTime`, `endTime`, `status`, `timeOfTask`) VALUES
('125581e4-9093-11ec-add2-5405db46f860', 'Cośtam', '2022-02-17 08:16:28', '2022-02-17 18:16:28', 0, '00:10:00'),
('154c7ff8-91f4-4f86-b5ec-9d4ea3968283', 'kolejny raz', '2022-02-18 08:16:08', '2022-02-18 08:16:08', 0, '00:14:48'),
('35b2b30f-5948-407f-bcd8-350c23cd912d', 'Kolejny dzień czas zacząć', '2022-02-19 05:38:04', '2022-02-19 05:38:04', 0, '00:00:05'),
('3ff81d7e-33c9-46f8-acf2-1ca4cf37a83f', 'Kolejny get data', '2022-02-19 07:35:33', '2022-02-19 07:35:33', 0, '00:00:04'),
('47db9da4-3541-4d09-9368-f6bbe9d8599b', 'Sprawdzamy fetcha', '2022-02-18 08:01:14', '2022-02-18 08:01:14', 0, '00:00:08'),
('5e7607a9-4b18-4a55-a04c-a3727032694a', 'get data', '2022-02-19 07:35:18', '2022-02-19 07:35:18', 0, '00:00:04'),
('6b1c8bc7-edab-4e3e-ae3f-62e579631ccf', 'Kolejne zadanie', '2022-02-18 08:00:59', '2022-02-18 08:00:59', 0, '00:02:27'),
('7110d030-8a2f-4722-8d16-efabda7fdf4d', 'KOlejny', '2022-02-18 18:12:40', '2022-02-18 18:12:40', 0, '00:08:23'),
('8585dbdd-9093-11ec-add2-5405db46f860', 'coś innego', '2022-02-18 08:20:24', '2022-02-16 08:19:54', 0, '00:00:10'),
('ac32ab1e-ed94-4152-8dc7-57021aad0ca2', 'newTitle', '2022-02-18 18:12:44', '2022-02-18 18:12:44', 0, '00:06:08'),
('bc281196-6f58-4465-a9c8-508b16528ca6', 'KOlejny start', '2022-02-19 06:02:38', '2022-02-19 06:02:38', 0, '00:02:22'),
('bd0fe8f0-ab12-4636-874e-b0bdf8ff549b', 'dodaje po usunięciu działającego', '2022-02-18 16:49:38', '2022-02-18 16:49:38', 0, '08:24:08'),
('c53ee355-563e-4a16-8882-eb111d218033', 'asdasd', '2022-02-18 07:55:32', '2022-02-18 07:55:32', 0, '00:04:29'),
('e5073305-17fe-4041-a5c0-30b412b49660', 'Nowy ten teges', '2022-02-19 07:21:39', '2022-02-19 07:21:39', 0, '00:00:00');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
