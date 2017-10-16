-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 02, 2017 at 08:45 PM
-- Server version: 5.5.57-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cfq_mayflower_de`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `email` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`email`, `name`) VALUES
('"kurt@kunde.de"', '"Kurt Kunde"'),
('rupert.rockinger@refinedlabs.com', 'Rupert Rockinger'),
('sehrenbe@hm.edu', 'Steff Testkunde');

-- --------------------------------------------------------

--
-- Table structure for table `customer_projects`
--

DROP TABLE IF EXISTS `customer_projects`;
CREATE TABLE IF NOT EXISTS `customer_projects` (
  `customer_email` varchar(50) NOT NULL,
  `project_id` varchar(32) NOT NULL,
  PRIMARY KEY (`customer_email`,`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer_projects`
--

INSERT INTO `customer_projects` (`customer_email`, `project_id`) VALUES
('kurt@kunde.de', '3'),
('rupert.rockinger@refinedlabs.com', '2'),
('sehrenbe@hm.edu', '1'),
('sehrenbe@hm.edu', '2');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `project_name` (`project_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `project_name`) VALUES
(3, 'kundenprojekt'),
(2, 'RefinedLabs'),
(1, 'testproject');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
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
-- Dumping data for table `questions`
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
(10, 'nextMeeting', 'Next Meeting:', 0, 'date'),
(11, 'tasks', 'Tasks for the next iteration:', 0, 'todo');

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
CREATE TABLE IF NOT EXISTS `survey` (
  `survey_id` varchar(32) NOT NULL,
  `project_name` varchar(32) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`survey_id`),
  KEY `customer_id` (`project_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `survey`
--

INSERT INTO `survey` (`survey_id`, `project_name`, `created_at`) VALUES
('20171001-testproject', 'testproject', '2017-10-01 16:57:19'),
('20171002-kundenprojekt', 'kundenprojekt', '2017-10-02 16:57:19'),
('20171002-testproject', 'testproject', '2017-10-02 16:57:19');

-- --------------------------------------------------------

--
-- Stand-in structure for view `survey_kundenprojekt`
--
DROP VIEW IF EXISTS `survey_kundenprojekt`;
CREATE TABLE IF NOT EXISTS `survey_kundenprojekt` (
`survey_id` varchar(32)
,`project_name` varchar(32)
,`created_at` timestamp
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `survey_refinedlabs`
--
DROP VIEW IF EXISTS `survey_refinedlabs`;
CREATE TABLE IF NOT EXISTS `survey_refinedlabs` (
`survey_id` varchar(32)
,`project_name` varchar(32)
,`created_at` timestamp
);
-- --------------------------------------------------------

--
-- Table structure for table `survey_result`
--

DROP TABLE IF EXISTS `survey_result`;
CREATE TABLE IF NOT EXISTS `survey_result` (
  `survey_result_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_id` varchar(32) NOT NULL,
  `question_id` int(11) NOT NULL,
  `question_answer` tinytext NOT NULL,
  PRIMARY KEY (`survey_result_id`),
  KEY `question_id` (`question_id`),
  KEY `survey_id` (`survey_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=678 ;

--
-- Dumping data for table `survey_result`
--

INSERT INTO `survey_result` (`survey_result_id`, `survey_id`, `question_id`, `question_answer`) VALUES
(656, '20171002-testproject', 1, '9'),
(657, '20171002-testproject', 2, '9'),
(658, '20171002-testproject', 3, 'Frische Kuhmilch, Kuhbändiger'),
(659, '20171002-testproject', 4, 'Kuhmilch, Kälber zum Schlachten'),
(660, '20171002-testproject', 5, 'Kälber'),
(661, '20171002-testproject', 6, 'Kühe Nachbars Wiese zerstören lassen'),
(662, '20171002-testproject', 7, 'Weihnachtsgeschenke'),
(663, '20171002-testproject', 8, 'Weidefläche besser sichern'),
(664, '20171002-testproject', 9, '6'),
(665, '20171002-testproject', 10, '2017-10-25T22:00:00.000Z'),
(666, '20171002-testproject', 11, '');
(1, '20171001-kundenprojekt', 1, '3'),
(2, '20171001-kundenprojekt', 2, '3'),
(3, '20171001-kundenprojekt', 3, 'Clown'),
(4, '20171001-kundenprojekt', 4, 'Wasser, Papierblumen'),
(5, '20171001-kundenprojekt', 5, 'Lacher'),
(6, '20171001-kundenprojekt', 6, 'den CEO bespritzen'),
(7, '20171001-kundenprojekt', 7, 'Torten'),
(8, '20171001-kundenprojekt', 8, 'Zielgenauigkeit'),
(9, '20171001-kundenprojekt', 9, '9'),
(10, '20171001-kundenprojekt', 10, '2017-09-25T22:00:00.000Z'),
(11, '20171001-kundenprojekt', 11, '');


-- --------------------------------------------------------

--
-- Stand-in structure for view `survey_result_kundenprojekt`
--
DROP VIEW IF EXISTS `survey_result_kundenprojekt`;
CREATE TABLE IF NOT EXISTS `survey_result_kundenprojekt` (
`survey_id` varchar(32)
,`question_id` int(11)
,`question_answer` tinytext
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `survey_result_refinedlabs`
--
DROP VIEW IF EXISTS `survey_result_refinedlabs`;
CREATE TABLE IF NOT EXISTS `survey_result_refinedlabs` (
`survey_id` varchar(32)
,`question_id` int(11)
,`question_answer` tinytext
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `survey_result_testproject`
--
DROP VIEW IF EXISTS `survey_result_testproject`;
CREATE TABLE IF NOT EXISTS `survey_result_testproject` (
`survey_id` varchar(32)
,`question_id` int(11)
,`question_answer` tinytext
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `survey_testproject`
--
DROP VIEW IF EXISTS `survey_testproject`;
CREATE TABLE IF NOT EXISTS `survey_testproject` (
`survey_id` varchar(32)
,`project_name` varchar(32)
,`created_at` timestamp
);
-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
CREATE TABLE IF NOT EXISTS `todos` (
  `todo_id` varchar(36) NOT NULL,
  `survey_id` varchar(32) NOT NULL,
  `text` text NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`todo_id`),
  KEY `survey_id` (`survey_id`,`completed`,`created_at`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=38 ;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`todo_id`, `survey_id`, `text`, `completed`, `created_at`) VALUES
(34, '20171002-testproject', 'stall bauen', 0, '2017-10-02 16:57:19'),
(35, '20171002-testproject', 'kühe kaufen', 0, '2017-10-02 16:57:19'),
(36, '20171001-testproject', 'Tutorial durcharbeiten zu "DIY - Kuhstall bauen" (@Schateff Epünkt)', 1, '2017-10-01 17:03:06'),
(37, '20171002-kundenprojekt', 'Tutorial durcharbeiten zu "wie atmet man" (@Kurt Kunde)', 1, '2017-10-01 17:03:06');

-- --------------------------------------------------------

--
-- Stand-in structure for view `todos_kundenprojekt`
--
DROP VIEW IF EXISTS `todos_kundenprojekt`;
CREATE TABLE IF NOT EXISTS `todos_kundenprojekt` (
`todo_id` varchar(36)
,`survey_id` varchar(32)
,`text` text
,`completed` tinyint(1)
,`created_at` timestamp
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `todos_refinedlabs`
--
DROP VIEW IF EXISTS `todos_refinedlabs`;
CREATE TABLE IF NOT EXISTS `todos_refinedlabs` (
`todo_id` varchar(36)
,`survey_id` varchar(32)
,`text` text
,`completed` tinyint(1)
,`created_at` timestamp
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `todos_testproject`
--
DROP VIEW IF EXISTS `todos_testproject`;
CREATE TABLE IF NOT EXISTS `todos_testproject` (
`todo_id` varchar(36)
,`survey_id` varchar(32)
,`text` text
,`completed` tinyint(1)
,`created_at` timestamp
);
-- --------------------------------------------------------

--
-- Structure for view `survey_kundenprojekt`
--
DROP TABLE IF EXISTS `survey_kundenprojekt`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `survey_kundenprojekt` AS select `survey`.`survey_id` AS `survey_id`,`survey`.`project_name` AS `project_name`,`survey`.`created_at` AS `created_at` from `survey` where (`survey`.`project_name` = 'kundenprojekt');

-- --------------------------------------------------------

--
-- Structure for view `survey_refinedlabs`
--
DROP TABLE IF EXISTS `survey_refinedlabs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `survey_refinedlabs` AS select `survey`.`survey_id` AS `survey_id`,`survey`.`project_name` AS `project_name`,`survey`.`created_at` AS `created_at` from `survey` where (`survey`.`project_name` = 'RefinedLabs');

-- --------------------------------------------------------

--
-- Structure for view `survey_result_kundenprojekt`
--
DROP TABLE IF EXISTS `survey_result_kundenprojekt`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `survey_result_kundenprojekt` AS select distinct `survey_result`.`survey_id` AS `survey_id`,`survey_result`.`question_id` AS `question_id`,`survey_result`.`question_answer` AS `question_answer` from (`survey_result` join `survey` on((`survey`.`survey_id` = `survey_result`.`survey_id`))) where (`survey`.`project_name` = 'kundenprojekt') group by `survey_result`.`survey_id`,`survey_result`.`question_id`;

-- --------------------------------------------------------

--
-- Structure for view `survey_result_refinedlabs`
--
DROP TABLE IF EXISTS `survey_result_refinedlabs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `survey_result_refinedlabs` AS select distinct `survey_result`.`survey_id` AS `survey_id`,`survey_result`.`question_id` AS `question_id`,`survey_result`.`question_answer` AS `question_answer` from (`survey_result` join `survey` on((`survey`.`survey_id` = `survey_result`.`survey_id`))) where (`survey`.`project_name` = 'RefinedLabs') group by `survey_result`.`survey_id`,`survey_result`.`question_id`;

-- --------------------------------------------------------

--
-- Structure for view `survey_result_testproject`
--
DROP TABLE IF EXISTS `survey_result_testproject`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `survey_result_testproject` AS select distinct `survey_result`.`survey_id` AS `survey_id`,`survey_result`.`question_id` AS `question_id`,`survey_result`.`question_answer` AS `question_answer` from (`survey_result` join `survey` on((`survey`.`survey_id` = `survey_result`.`survey_id`))) where (`survey`.`project_name` = 'testproject') group by `survey_result`.`survey_id`,`survey_result`.`question_id`;

-- --------------------------------------------------------

--
-- Structure for view `survey_testproject`
--
DROP TABLE IF EXISTS `survey_testproject`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `survey_testproject` AS select `survey`.`survey_id` AS `survey_id`,`survey`.`project_name` AS `project_name`,`survey`.`created_at` AS `created_at` from `survey` where (`survey`.`project_name` = 'testproject');

-- --------------------------------------------------------

--
-- Structure for view `todos_kundenprojekt`
--
DROP TABLE IF EXISTS `todos_kundenprojekt`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `todos_kundenprojekt` AS select `todos`.`todo_id` AS `todo_id`,`todos`.`survey_id` AS `survey_id`,`todos`.`text` AS `text`,`todos`.`completed` AS `completed`,`todos`.`created_at` AS `created_at` from `todos` where `todos`.`survey_id` in (select `survey_kundenprojekt`.`survey_id` from `survey_kundenprojekt`);

-- --------------------------------------------------------

--
-- Structure for view `todos_refinedlabs`
--
DROP TABLE IF EXISTS `todos_refinedlabs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `todos_refinedlabs` AS select `todos`.`todo_id` AS `todo_id`,`todos`.`survey_id` AS `survey_id`,`todos`.`text` AS `text`,`todos`.`completed` AS `completed`,`todos`.`created_at` AS `created_at` from `todos` where `todos`.`survey_id` in (select `survey_refinedlabs`.`survey_id` from `survey_refinedlabs`);

-- --------------------------------------------------------

--
-- Structure for view `todos_testproject`
--
DROP TABLE IF EXISTS `todos_testproject`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `todos_testproject` AS select `todos`.`todo_id` AS `todo_id`,`todos`.`survey_id` AS `survey_id`,`todos`.`text` AS `text`,`todos`.`completed` AS `completed`,`todos`.`created_at` AS `created_at` from `todos` where `todos`.`survey_id` in (select `survey_testproject`.`survey_id` from `survey_testproject`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
