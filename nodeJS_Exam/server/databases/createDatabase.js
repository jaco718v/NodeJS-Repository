import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((arg) => arg === "delete") === -1 ? false : true;

if (isDeleteMode) {
  await db.exec(`DROP TABLE IF EXISTS users;`);
  await db.exec(`DROP TABLE IF EXISTS books;`);
  await db.exec(`DROP TABLE IF EXISTS genres;`);
  await db.exec(`DROP TABLE IF EXISTS ratings;`);
}

db.exec(`CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(255) PRIMARY KEY NOT NULL,
  hashed_password CHAR(60)
);`);

db.exec(`CREATE TABLE IF NOT EXISTS books (
  book_id INTEGER PRIMARY KEY NOT NULL,
  title VARCHAR(100),
  resume TEXT,
  author VARCHAR(100),
  available BOOLEAN
);`);

db.exec(`CREATE TABLE IF NOT EXISTS genres (
  book_id INTEGER,
  genre VARCHAR(50),
  FOREIGN KEY(book_id) REFERENCES books(book_id)
);`);

db.exec(`CREATE TABLE IF NOT EXISTS ratings (
  book_id INTEGER,
  username VARCHAR(255),
  rating INTEGER CHECK(rating <=  10 AND rating >= 0),
  FOREIGN KEY(book_id) REFERENCES books(book_id),
  FOREIGN KEY(username) REFERENCES users(username)
);`);


//SEED
if(isDeleteMode){
  await db.run("INSERT INTO books (title, resume, author, available) VALUES ('Potter-man', 'The heroic adventures of the one and only Potter-man.', 'JK. JK ', TRUE);" );
  await db.run("INSERT INTO books (title, resume, author, available) VALUES ('Ring Lords', 'An elf named Ganondorf must brave the oceans to throw the power ring into the seas deepest abyss.', 'R.J.J Neiklot', TRUE);" );
  await db.run("INSERT INTO books (title, resume, author, available) VALUES ('Spooder-man', 'A novel about the legendary underdog, spooderman', 'Lee Stan', FALSE);" );
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (1, 'Action');");
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (1, 'Magic');");
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (2, 'Adventure');")
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (2, 'Pirates');")
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (3, 'Tragedy');")
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (3, 'Mystery');")
}

