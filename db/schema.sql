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
    username TEXT,
    email TEXT,
    password TEXT,
    favorites TEXT,
    uid TEXT
);

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
    business_id INT,
    user_id TEXT
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 commenter TEXT,
 content TEXT,
 business_id INTEGER REFERENCES businesses (id)
 ON DELETE CASCADE
);