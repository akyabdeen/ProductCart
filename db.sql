CREATE DATABASE product_cart;

USE product_cart;

CREATE TABLE Product (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    image_url VARCHAR(255),
    record_status INT NOT NULL DEFAULT 2
);

INSERT INTO Product (id, title, description, price, quantity, delivery_fee, image_url, record_status) VALUES
(1, 'Wireless Headphones', 'High-quality noise-cancelling headphones', 99.99, 50, 5.00, 'https://isystem.jo/wp-content/uploads/2024/09/6925281967061-4.jpeg', 2),
(2, 'Smartphone', 'Latest model with 128GB storage', 599.99, 20, 10.00, 'https://images.samsung.com/levant/smartphones/galaxy-s25-ultra/buy/kv_global_PC_v2.jpg?imbypass=true', 2),
(3, 'Laptop', '13-inch lightweight laptop with 16GB RAM', 1299.99, 10, 15.00, 'https://techterms.com/img/xl/laptop_586.png', 2),
(4, 'Bluetooth Speaker', 'Portable speaker with 12-hour battery life', 49.99, 100, 3.00, 'https://images.philips.com/is/image/philipsconsumer/df545073a8474e55bb16b0c40120ff1c?wid=700&hei=700&$pnglarge$', 2),
(5, 'Fitness Tracker', 'Water-resistant fitness tracker with heart rate monitor', 79.99, 30, 5.00, 'https://i5.walmartimages.com/seo/Fitbit-Charge-5-Fitness-Tracker-Black-Graphite-Stainless-Steel_fe2ec232-431a-42d8-92b5-2b548d12d728.ac4090b6583f80fef99395be32294a92.jpeg', 1);