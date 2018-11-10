/*CREATE DATABASE book_store;*/

CREATE TABLE Book (
	book_id INT NOT NULL ,
	book_name VARCHAR(255) CHARACTER SET utf8 NOT NULL UNIQUE,
	book_description VARCHAR(255) CHARACTER SET utf8 ,
	book_image_url VARCHAR(255) CHARACTER SET utf8 NOT NULL,
	author_id INT NOT NULL,
	category_id INT NOT NULL,
	book_price FLOAT NOT NULL,
	PRIMARY KEY (book_id)
);

CREATE TABLE Category (
	category_id INT NOT NULL ,
	category_name VARCHAR(255) CHARACTER SET utf8 NOT NULL UNIQUE,
	PRIMARY KEY (category_id)
);

CREATE TABLE Author (
	author_name VARCHAR(255) CHARACTER SET utf8 NOT NULL,
	author_id INT NOT NULL,
	PRIMARY KEY (author_id)
);

ALTER TABLE Book ADD CONSTRAINT Book_fk0 FOREIGN KEY (author_id) REFERENCES Author(author_id);

ALTER TABLE Book ADD CONSTRAINT Book_fk1 FOREIGN KEY (category_id) REFERENCES Category(category_id);

