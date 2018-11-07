CREATE TABLE Book (
	book_id INT NOT NULL AUTO_INCREMENT,
	book_name VARCHAR(255) NOT NULL UNIQUE,
	book_description VARCHAR(255) NOT NULL,
	author_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY (book_id)
);

CREATE TABLE Category (
	category_id INT NOT NULL AUTO_INCREMENT,
	category_name VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (category_id)
);

CREATE TABLE Author (
	author_id INT NOT NULL AUTO_INCREMENT,
	author_name VARCHAR(255) NOT NULL,
	author_information VARCHAR(255),
	PRIMARY KEY (author_id)
);

ALTER TABLE Book ADD CONSTRAINT Book_fk0 FOREIGN KEY (author_id) REFERENCES Author(author_id);

ALTER TABLE Book ADD CONSTRAINT Book_fk1 FOREIGN KEY (category_id) REFERENCES Category(category_id);

