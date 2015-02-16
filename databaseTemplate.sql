
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS car (
  id int(11) NOT NULL AUTO_INCREMENT,
  model_name varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  year_built int(11) DEFAULT NULL,
  mileage int(11) DEFAULT NULL,
  max_speed int(11) DEFAULT NULL,
  description text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  sold_date DATE DEFAULT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS sales (
  id int(11) NOT NULL AUTO_INCREMENT,
  car_id int(11) NOT NULL,
  price float(7,2) DEFAULT NULL,
  sale_date DATE DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (car_id) REFERENCES car(id) ON DELETE CASCADE
);