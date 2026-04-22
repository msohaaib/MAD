CREATE DATABASE expense_tracker;

USE expense_tracker;

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount DECIMAL(10,2),
  type ENUM('income', 'expense'),
  category VARCHAR(100),
  date DATE
);

INSERT INTO transactions (amount, type, category, date)
VALUES 
(5000, 'income', 'Salary', '2026-04-01'),
(1000, 'expense', 'Food', '2026-04-02');