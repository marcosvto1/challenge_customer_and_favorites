CREATE DATABASE whitelist;

\connect whitelist;

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


