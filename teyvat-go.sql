CREATE DATABASE IF NOT EXISTS teyvatgo_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
  
USE teyvatgo_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS inquiries;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. USERS / ADMINS TABLE
-- Stores the Agency Director and regional branch coordinators
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('Director', 'Staff') NOT NULL DEFAULT 'Staff',
  assigned_nation VARCHAR(50) NOT NULL DEFAULT 'All Nations',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. TOUR PACKAGES TABLE
-- Catalog of the 7 regional expedition packages across Teyvat
CREATE TABLE packages (
  package_code VARCHAR(20) PRIMARY KEY,
  nation_name VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB;

-- 3. BOOKINGS / RESERVATIONS TABLE
-- Stores customer tour reservations linked to packages and overseeing staff
CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  package_code VARCHAR(20) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  travel_date DATE NOT NULL,
  travelers INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  managed_by INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_package
    FOREIGN KEY (package_code) REFERENCES packages(package_code)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_bookings_user
    FOREIGN KEY (managed_by) REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. CLIENTS / INQUIRIES TABLE
-- Stores prospective traveler questions submitted via about.php
CREATE TABLE inquiries (
  inquiry_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  comments TEXT NOT NULL,
  handled_by INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_inquiries_user
    FOREIGN KEY (handled_by) REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO users (full_name, email, password_hash, role, assigned_nation) VALUES
('Agency Director (Alhaitham)', 'director@teyvatgo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Director', 'All Nations'),
('Jean Gunnhildr', 'mondstadt.ops@teyvatgo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Staff', 'Mondstadt'),
('Zhongli', 'liyue.ops@teyvatgo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Staff', 'Liyue'),
('Yae Miko', 'inazuma.ops@teyvatgo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Staff', 'Inazuma'),
('Nahida', 'sumeru.ops@teyvatgo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Staff', 'Sumeru'),
('Neuvillette', 'fontaine.ops@teyvatgo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Staff', 'Fontaine'),
('Mavuika', 'natlan.ops@teyvatgo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Staff', 'Natlan'),
('Childe Tartaglia', 'snezhnaya.ops@teyvatgo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Staff', 'Snezhnaya');

INSERT INTO packages (package_code, nation_name, duration, base_price) VALUES
  ('MOND-01', 'Mondstadt', '3 days / 2 nights', 12500.00),
  ('LIYUE-02', 'Liyue', '4 days / 3 nights', 15000.00),
  ('INAZ-03', 'Inazuma', '4 days / 3 nights', 18000.00),
  ('SUME-04', 'Sumeru', '3 days / 3 nights', 14000.00),
  ('FONT-05', 'Fontaine', '5 days / 4 nights', 20000.00),
  ('NATL-06', 'Natlan', '4 days / 3 nights', 16500.00),
  ('SNEZ-07', 'Snezhnaya', '5 days / 4 nights', 22000.00);