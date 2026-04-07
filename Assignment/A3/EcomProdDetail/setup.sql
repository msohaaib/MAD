CREATE DATABASE IF NOT EXISTS ecommerce_app;
USE ecommerce_app;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  price DECIMAL(10,2),
  description TEXT,
  image VARCHAR(500)
);

INSERT INTO products (title, price, description, image)
VALUES 
('Wireless Headphones', 59.99, 'Noise cancelling headphones', 'https://audionic.co/cdn/shop/files/Black2.png?v=1775456457'),
('Smart Watch', 99.99, 'Fitness tracking smartwatch', 'https://via.placeholder.com/300');