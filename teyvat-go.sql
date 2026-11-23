CREATE DATABASE IF NOT EXISTS teyvatgo_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE teyvatgo_db;

CREATE TABLE IF NOT EXISTS packages (
  package_code VARCHAR(20) PRIMARY KEY,
  nation_name VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  package_code VARCHAR(20) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  travel_date DATE NOT NULL,
  travelers INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_package
    FOREIGN KEY (package_code) REFERENCES packages(package_code)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS inquiries (
  inquiry_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  comments TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO packages (package_code, nation_name, duration, base_price) VALUES
  ('MOND-01', 'Mondstadt', '3 days / 2 nights', 12500.00),
  ('LIYUE-02', 'Liyue', '4 days / 3 nights', 15000.00),
  ('INAZ-03', 'Inazuma', '4 days / 3 nights', 18000.00),
  ('SUME-04', 'Sumeru', '3 days / 3 nights', 14000.00),
  ('FONT-05', 'Fontaine', '5 days / 4 nights', 20000.00),
  ('NATL-06', 'Natlan', '4 days / 3 nights', 16500.00),
  ('SNEZ-07', 'Snezhnaya', '5 days / 4 nights', 22000.00);