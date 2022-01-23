CREATE DATABASE storage;

CREATE TABLE storagebalance(
    product_id TEXT, 
    city TEXT, 
    storage_balance INTEGER
);

CREATE TABLE products(
    id TEXT PRIMARY KEY,
    product_name TEXT,
    price INTEGER
);

CREATE TABLE storagecities(
    storage_id SERIAL PRIMARY KEY, 
    city TEXT
);

CREATE TABLE storagedelivery(
    storage_adjustment TEXT, 
    product_id TEXT,
    city TEXT, 
    quantity INTEGER
);

