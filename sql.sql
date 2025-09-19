CREATE DATABASE rkbikes;
USE rkbikes;

-- ----------------------
-- Users Table
-- ----------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender ENUM('male','female','other') NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 
-- ----------------------
-- Categories Table
-- ----------------------
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO categories (name, code) VALUES
('Commuter Bikes', 'commuter_bikes'),
('Dominar Series', 'dominar_series'),
('Pulsar Series', 'pulsar_series'),
('Avenger Series', 'avenger_series'),
('Electric Scooters', 'electric_scooters'),
('CNG Bikes', 'cng_bikes');

-- ----------------------
-- Bikes Table
-- ----------------------
CREATE TABLE bikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price VARCHAR(20),
    engine VARCHAR(50),
    mileage VARCHAR(50),
    thumbnail VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ----------------------
-- Bike Images
-- ----------------------
CREATE TABLE bike_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bike_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (bike_id) REFERENCES bikes(id) ON DELETE CASCADE
);

-- ----------------------
-- Bike Features
-- ----------------------
CREATE TABLE bike_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bike_id INT NOT NULL,
    feature VARCHAR(100) NOT NULL,
    FOREIGN KEY (bike_id) REFERENCES bikes(id) ON DELETE CASCADE
);

-- ----------------------
-- Test Drive Bookings
-- ----------------------
DROP TABLE IF EXISTS testdrive_bookings;

CREATE TABLE testdrive_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    bike_model VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    driving_license VARCHAR(50) NOT NULL,
    experience ENUM('beginner', 'intermediate', 'expert') NOT NULL,
    agreed_terms BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------
-- Services Table
-- ----------------------
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    description TEXT,
    type ENUM('periodic','repair') NOT NULL
);

-- ----------------------
-- Service Bookings Table
-- ----------------------
CREATE TABLE IF NOT EXISTS service_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    bike_model VARCHAR(50) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    notes TEXT,
    status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);


-- ----------------------
-- Bookings Table
-- ----------------------
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- User Link
    user_id INT NULL,
    
    -- Personal Details
    full_name VARCHAR(30) NOT NULL,
    father_name VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    alternate_phone VARCHAR(15),
    email VARCHAR(100) NOT NULL,
    occupation VARCHAR(30) NOT NULL,
    
    -- Current Address
    current_address TEXT NOT NULL,
    city VARCHAR(15) NOT NULL,
    state VARCHAR(15) NOT NULL,
    pincode INT(8) NOT NULL,
    
    -- Permanent Address
    permanent_address TEXT NOT NULL,
    permanent_city VARCHAR(15) NOT NULL,
    permanent_state VARCHAR(15) NOT NULL,
    permanent_pincode INT(8) NOT NULL,
    
    -- Document Details (all BIGINT)
  
     aadhar_number CHAR(12) NOT NULL,
     pan_number CHAR(10) NOT NULL,
     driving_license CHAR(16) NOT NULL,
     voter_id_number VARCHAR(20),
     passport_number VARCHAR(20),
    
    -- Meta
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
ALTER TABLE bookings
ADD COLUMN bike_id INT NOT NULL AFTER booking_id,
ADD COLUMN bike_name VARCHAR(50) NOT NULL AFTER bike_id;

-- Create table for contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(35) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(35) NOT NULL,
    subject ENUM('general','bikebooking','servicebooking','testdrivebooking') DEFAULT 'general',
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




UPDATE users SET role='admin' WHERE email='admin@rk.com';




