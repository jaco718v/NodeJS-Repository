//snakeCase in sql - Camel in javascript

import db from "./connection.js"

const isDeleteMode = trueprocess.argv.findIndex((arg) => arg === "delete") === -1 ? false : true


if(isDeleteMode){
  await db.exec(`DROP TABLE IF EXISTS customers;`)
  await db.exec(`DROP TABLE IF EXISTS supermarkets;`)
}

db.exec(`CREATE TABLE IF NOT EXISTS supermarkets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT CHECK( name IN ('Netto', 'Rema 1000', 'Lidl') ) NOT NULL,
        address varchar(255),
        city varchar(255)
);`);

db.exec(`CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name varchar(255),
  supermarket_id INTEGER,
  FOREIGN KEY(supermarket_id) REFERENCES supermarkets (id)
);`);

//SEED the database(DML)
if(isDeleteMode){
  await db.run("INSERT INTO supermarkets (name) VALUES ('Netto');")
  await db.run("INSERT INTO supermarkets (name, address) VALUES ('Rema 1000','Smorum 2765');")
  await db.run("INSERT INTO customers (name, supermarket_id) VALUES ('Bob','1');")
}