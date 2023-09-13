DROP TABLE IF EXISTS comments;

DROP TABLE IF EXISTS favorites;

DROP TABLE IF EXISTS user_profile;

DROP TABLE IF EXISTS login;

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

CREATE TABLE login (
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT
);


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


CREATE TABLE favorites (
    business_id INT,
    user_id TEXT
);


CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 commenter TEXT,
 content TEXT,
 business_id INTEGER REFERENCES businesses (id)
 ON DELETE CASCADE
);