DROP DATABASE IF EXISTS melanated_diamonds_dev;
CREATE DATABASE melanated_diamonds_dev;

\c melanated_diamonds_dev;

DROP TABLE IF EXISTS businesses;

CREATE TABLE businesses (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    address TEXT,
    contact_num TEXT,
    year_opened NUMERIC,
    is_online BOOLEAN,
    is_store BOOLEAN,
    img TEXT,
    category TEXT,
    website TEXT,
    description TEXT
);

DROP TABLE IF EXISTS login;

CREATE TABLE login (
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT
);

DROP TABLE IF EXISTS user_profile;

CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    usernmae TEXT,
    email TEXT,
    password TEXT
);