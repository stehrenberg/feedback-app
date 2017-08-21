-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 16. Aug 2017 um 16:23
-- Server Version: 5.5.57-0ubuntu0.14.04.1
-- PHP-Version: 5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `feedback`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` varchar(32) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `customer`
--

INSERT INTO `customer` (`customer_id`, `name`) VALUES
('1', '"Kurt Kunde"');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_shorttext` varchar(100) NOT NULL,
  `question_text` tinytext NOT NULL,
  `question_preload` tinyint(1) NOT NULL DEFAULT '1',
  `input_type` varchar(50) NOT NULL DEFAULT 'text',
  PRIMARY KEY (`question_id`),
  UNIQUE KEY `question_shorttext` (`question_shorttext`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Daten für Tabelle `questions`
--

INSERT INTO `questions` (`question_id`, `question_shorttext`, `question_text`, `question_preload`, `input_type`) VALUES
(1, 'understanding', 'How well do we understand what your company actually needs from us?', 0, 'number'),
(2, 'cooperation', 'How well do we cooperate?', 0, 'number'),
(3, 'deliveriesAndRoles', 'Core Deliveries and Roles', 1, 'text'),
(4, 'essentials', 'What are essentials we have to deliver?', 1, 'text'),
(5, 'deliverMore', 'What should we deliver more of?', 1, 'text'),
(6, 'avoid', 'What should we avoid to do in the future?', 1, 'text'),
(7, 'deliverAdditionally', 'What should we deliver additionally?', 1, 'text'),
(8, 'acquire', 'What competencies and abilities should we acquire?', 1, 'text'),
(9, 'nps', 'How likely is it that you would recommend our company/product to a friend or colleague?', 0, 'number'),
(10, 'tasks', 'Tasks for the next iteration:', 0, 'input'),
(11, 'nextMeeting', 'Next Meeting:', 0, 'date');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `survey`
--

CREATE TABLE IF NOT EXISTS `survey` (
  `survey_id` varchar(32) NOT NULL,
  `customer_id` varchar(32) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`survey_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `survey`
--

INSERT INTO `survey` (`survey_id`, `customer_id`, `created_at`) VALUES
('20170816', NULL, '2017-08-16 14:17:13');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `survey_result`
--

CREATE TABLE IF NOT EXISTS `survey_result` (
  `survey_result_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_id` varchar(32) NOT NULL,
  `question_id` int(11) NOT NULL,
  `question_answer` tinytext NOT NULL,
  PRIMARY KEY (`survey_result_id`),
  KEY `question_id` (`question_id`),
  KEY `survey_id` (`survey_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Daten für Tabelle `survey_result`
--

INSERT INTO `survey_result` (`survey_result_id`, `survey_id`, `question_id`, `question_answer`) VALUES
(2, '20170816', 1, '8');

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `survey_result`
--
ALTER TABLE `survey_result`
  ADD CONSTRAINT `survey_result_ibfk_3` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`),
  ADD CONSTRAINT `survey_result_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;