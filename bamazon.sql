DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  
  item_ID INT AUTO_INCREMENT NOT NULL,
  product_Name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_quantity INT,
  PRIMARY KEY (item_ID)
);
INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Alexah Robot","Toys",27.99,45);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Alexah Drone","Toys",33.99,35);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Supreme Hat v.2.5BS ","Swag",915.99,340);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Roland-909","Music",2700.99,5);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Roland-808","Music",4527.99,4);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Bass Guitar","Music",1027.99,30);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Record Player","Electronics",1127.99,40);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Speakers","Electronics",300.99,38);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Phone Charger","Electronics",17.99,4500);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Gutchi Bag Pleather","Swag",107.99,405);

SELECT * FROM products ;
