import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((arg) => arg === "delete") === -1 ? false : true;

if (isDeleteMode) {
  await db.exec(`DROP TABLE IF EXISTS users;`);
  await db.exec(`DROP TABLE IF EXISTS books;`);
  await db.exec(`DROP TABLE IF EXISTS genres;`);
  await db.exec(`DROP TABLE IF EXISTS orders;`);
  await db.exec(`DROP TABLE IF EXISTS order_books;`);
}

db.exec(`CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(255) PRIMARY KEY NOT NULL,
  hashed_password CHAR(60),
  role VARCHAR(50)
);`);

db.exec(`CREATE TABLE IF NOT EXISTS books (
  book_id INTEGER PRIMARY KEY NOT NULL,
  title VARCHAR(100),
  resume TEXT,
  pages INTEGER,
  author VARCHAR(100),
  available BOOLEAN
);`);

db.exec(`CREATE TABLE IF NOT EXISTS genres (
  book_id INTEGER,
  genre VARCHAR(50),
  FOREIGN KEY(book_id) REFERENCES books(book_id)
);`);


db.exec(`CREATE TABLE IF NOT EXISTS orders (
  order_id INTEGER PRIMARY KEY NOT NULL,
  username VARCHAR(255),
  created VARCHAR(50),
  FOREIGN KEY(username) REFERENCES users(username)
);`);

db.exec(`CREATE TABLE IF NOT EXISTS order_books (
  order_id INTEGER,
  book_id INTEGER,
  FOREIGN KEY(order_id) REFERENCES orders(order_id),
  FOREIGN KEY(book_id) REFERENCES books(book_id)
) `)


//SEED //Nacho123
if(isDeleteMode){
  await db.run("INSERT INTO users(username, hashed_password, role) VALUES ('test1', '$2b$14$L7pkPTh4cY3C/KNkZTpMd.2e0nJmxuAeiDlu/c.K.BByMrpRQ.sFq', 'user');")
  await db.run("INSERT INTO users(username, hashed_password, role) VALUES ('test2', '$2b$14$L7pkPTh4cY3C/KNkZTpMd.2e0nJmxuAeiDlu/c.K.BByMrpRQ.sFq', 'admin');")
  await db.run("INSERT INTO books (title, resume, author, pages, available) VALUES ('Potter-man', 'The heroic adventures of the one and only Potter-man.', 'JK. JK ', 321, TRUE);" );
  await db.run("INSERT INTO books (title, resume, author, pages, available) VALUES ('Ring Lords', 'An elf named Ganondorf must brave the oceans to throw the power ring into the seas deepest abyss.', 'R.J.J Neiklot', 419, TRUE);" );
  await db.run("INSERT INTO books (title, resume, author, pages, available) VALUES ('Spooder-man', 'A novel about the legendary underdog, spooderman', 'Lee Stan', 68, FALSE);" );
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (1, 'Action');");
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (1, 'Magic');");
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (2, 'Adventure');")
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (2, 'Pirates');")
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (3, 'Tragedy');")
  await db.run("INSERT INTO genres (book_id, genre) VALUES  (3, 'Mystery');")
  await db.run("INSERT INTO orders (username, created) VALUES ('test1', '17/01/2024, 15.19.28')")
  await db.run("INSERT INTO orders (username, created) VALUES ('test1', '12/01/2024, 12.01.00')")
  await db.run("INSERT INTO order_books (order_id, book_id) VALUES (1, 1)")
  await db.run("INSERT INTO order_books (order_id, book_id) VALUES (1, 2)")
  await db.run("INSERT INTO order_books (order_id, book_id) VALUES (2, 3)")
}

