CREATE DATABASE whitelist;

\connect whitelist;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL
);

INSERT 
	INTO users 
    (name, email, password) 
    VALUES ('administrador', 'admin@admin.com', '$2b$12$jMfmJpofJYeiT7UqwBWtse.7leFfM8Mr9lfFUtfVkuj/C.MkF5BQq');



CREATE TABLE IF NOT EXISTS wishlist (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  customer_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  product_id UUID NOT NULL,
  image VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  review_score FLOAT NULL,
  CONSTRAINT pkey_id PRIMARY KEY(id)
);


