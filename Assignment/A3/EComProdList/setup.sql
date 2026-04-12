CREATE DATABASE shop;

USE shop;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  image VARCHAR(500),
  price DECIMAL(10,2)
);

INSERT INTO products (name, image, price) VALUES
('iPhone 14', 'https://via.placeholder.com/150', 999.00),
('Samsung Galaxy S23', 'https://via.placeholder.com/150', 899.00),
('Google Pixel 7', 'https://via.placeholder.com/150', 799.00);