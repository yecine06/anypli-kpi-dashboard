-- Insert sample data for testing

-- Insert users
INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `role`) VALUES
('Admin', 'User', 'admin@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9MUZWg8TFmkQxW5hQFmXvRzDVJVv2hy', 'admin'), -- password: password
('Jean', 'Dupont', 'jean.dupont@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9MUZWg8TFmkQxW5hQFmXvRzDVJVv2hy', 'manager'),
('Marie', 'Martin', 'marie.martin@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9MUZWg8TFmkQxW5hQFmXvRzDVJVv2hy', 'employee'),
('Pierre', 'Bernard', 'pierre.bernard@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9MUZWg8TFmkQxW5hQFmXvRzDVJVv2hy', 'employee'),
('Sophie', 'Petit', 'sophie.petit@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9MUZWg8TFmkQxW5hQFmXvRzDVJVv2hy', 'employee');

-- Insert salaries
INSERT INTO `salaries` (`employee_id`, `raw`, `start_date_salary`, `end_date_salary`) VALUES
(1, 5000.00, '2023-01-01', NULL),
(2, 4500.00, '2023-01-01', '2023-06-30'),
(2, 4800.00, '2023-07-01', NULL),
(3, 3500.00, '2023-01-01', '2023-03-31'),
(3, 3700.00, '2023-04-01', NULL),
(4, 3800.00, '2023-01-01', NULL),
(5, 3600.00, '2023-01-01', '2023-05-31'),
(5, 3900.00, '2023-06-01', NULL);

-- Insert projects
INSERT INTO `projects` (`name`, `type`, `start_date`, `end_date`) VALUES
('Refonte Site Web', 'Développement', '2023-01-15', '2023-04-30'),
('Application Mobile', 'Développement', '2023-02-01', '2023-06-30'),
('Campagne Marketing Q2', 'Marketing', '2023-04-01', '2023-06-30'),
('Mise à jour ERP', 'Maintenance', '2023-03-15', NULL),
('Nouveau CRM', 'Développement', '2023-05-01', NULL);

-- Insert working slots
-- Project 1: Refonte Site Web
INSERT INTO `working_slots` (`employee_id`, `project_id`, `date`, `slot_type`) VALUES
(2, 1, '2023-01-16', 'morning'),
(2, 1, '2023-01-16', 'afternoon'),
(3, 1, '2023-01-17', 'morning'),
(3, 1, '2023-01-17', 'afternoon'),
(4, 1, '2023-01-18', 'morning'),
(2, 1, '2023-01-23', 'morning'),
(2, 1, '2023-01-23', 'afternoon'),
(3, 1, '2023-01-24', 'morning'),
(3, 1, '2023-01-24', 'afternoon'),
(4, 1, '2023-01-25', 'morning'),
(2, 1, '2023-02-06', 'morning'),
(2, 1, '2023-02-06', 'afternoon'),
(3, 1, '2023-02-07', 'morning'),
(3, 1, '2023-02-07', 'afternoon'),
(4, 1, '2023-02-08', 'morning'),
(2, 1, '2023-02-20', 'morning'),
(2, 1, '2023-02-20', 'afternoon'),
(3, 1, '2023-02-21', 'morning'),
(3, 1, '2023-02-21', 'afternoon'),
(4, 1, '2023-02-22', 'morning');

-- Project 2: Application Mobile
INSERT INTO `working_slots` (`employee_id`, `project_id`, `date`, `slot_type`) VALUES
(2, 2, '2023-02-02', 'morning'),
(2, 2, '2023-02-02', 'afternoon'),
(4, 2, '2023-02-03', 'morning'),
(4, 2, '2023-02-03', 'afternoon'),
(5, 2, '2023-02-06', 'morning'),
(5, 2, '2023-02-06', 'afternoon'),
(2, 2, '2023-02-16', 'morning'),
(2, 2, '2023-02-16', 'afternoon'),
(4, 2, '2023-02-17', 'morning'),
(4, 2, '2023-02-17', 'afternoon'),
(5, 2, '2023-02-20', 'morning'),
(5, 2, '2023-02-20', 'afternoon'),
(2, 2, '2023-03-02', 'morning'),
(2, 2, '2023-03-02', 'afternoon'),
(4, 2, '2023-03-03', 'morning'),
(4, 2, '2023-03-03', 'afternoon'),
(5, 2, '2023-03-06', 'morning'),
(5, 2, '2023-03-06', 'afternoon');

-- Project 3: Campagne Marketing Q2
INSERT INTO `working_slots` (`employee_id`, `project_id`, `date`, `slot_type`) VALUES
(3, 3, '2023-04-03', 'morning'),
(3, 3, '2023-04-03', 'afternoon'),
(5, 3, '2023-04-04', 'morning'),
(5, 3, '2023-04-04', 'afternoon'),
(3, 3, '2023-04-17', 'morning'),
(3, 3, '2023-04-17', 'afternoon'),
(5, 3, '2023-04-18', 'morning'),
(5, 3, '2023-04-18', 'afternoon'),
(3, 3, '2023-05-02', 'morning'),
(3, 3, '2023-05-02', 'afternoon'),
(5, 3, '2023-05-03', 'morning'),
(5, 3, '2023-05-03', 'afternoon');

-- Project 4: Mise à jour ERP
INSERT INTO `working_slots` (`employee_id`, `project_id`, `date`, `slot_type`) VALUES
(2, 4, '2023-03-16', 'morning'),
(4, 4, '2023-03-16', 'afternoon'),
(2, 4, '2023-03-30', 'morning'),
(4, 4, '2023-03-30', 'afternoon'),
(2, 4, '2023-04-13', 'morning'),
(4, 4, '2023-04-13', 'afternoon'),
(2, 4, '2023-04-27', 'morning'),
(4, 4, '2023-04-27', 'afternoon'),
(2, 4, '2023-05-11', 'morning'),
(4, 4, '2023-05-11', 'afternoon'),
(2, 4, '2023-05-25', 'morning'),
(4, 4, '2023-05-25', 'afternoon');

-- Project 5: Nouveau CRM
INSERT INTO `working_slots` (`employee_id`, `project_id`, `date`, `slot_type`) VALUES
(2, 5, '2023-05-02', 'morning'),
(2, 5, '2023-05-02', 'afternoon'),
(3, 5, '2023-05-03', 'morning'),
(3, 5, '2023-05-03', 'afternoon'),
(4, 5, '2023-05-04', 'morning'),
(4, 5, '2023-05-04', 'afternoon'),
(5, 5, '2023-05-05', 'morning'),
(5, 5, '2023-05-05', 'afternoon'),
(2, 5, '2023-05-15', 'morning'),
(2, 5, '2023-05-15', 'afternoon'),
(3, 5, '2023-05-16', 'morning'),
(3, 5, '2023-05-16', 'afternoon'),
(4, 5, '2023-05-17', 'morning'),
(4, 5, '2023-05-17', 'afternoon'),
(5, 5, '2023-05-18', 'morning'),
(5, 5, '2023-05-18', 'afternoon'),
(2, 5, '2023-05-29', 'morning'),
(2, 5, '2023-05-29', 'afternoon'),
(3, 5, '2023-05-30', 'morning'),
(3, 5, '2023-05-30', 'afternoon'),
(4, 5, '2023-05-31', 'morning'),
(4, 5, '2023-05-31', 'afternoon'),
(5, 5, '2023-06-01', 'morning'),
(5, 5, '2023-06-01', 'afternoon');
