import { Router } from "express";
import db from "../databases/connection.js";

const router = Router();

async function authorizeUserSession(req, res, next) {
  req.session.user.role = req.session.user.role ?? "";
  if (req.session.user.role === "user") {
    next();
  } else {
    res.status(401).send("Not an authorized user");
  }
}

async function authorizeAdminSession(req, res, next) {
  req.session.user.role = req.session.user.role ?? "";
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.status(401).send("Not an authorized admin");
  }
}

router.get("/api/orders", authorizeUserSession, async (req, res, next) => {
  const user = req.session.user.name;
  const foundOrders = await db.all(
    `SELECT order_id, created FROM orders WHERE username = ? LIMIT 4;`,
    [user]
  );
  const idArray = [];

  for (let i = 0; i < 4; i++) {
    if (foundOrders[i]) {
      idArray.push(foundOrders[i].order_id);
    } else {
      idArray.push(-1);
    }
  }
  const foundBooks = await db.all(
    `SELECT b.book_id, ob.order_id, b.title, b.author FROM order_books ob 
        INNER JOIN books b on ob.book_id = b.book_id WHERE ob.order_id IN (?, ?, ?, ?);`,
    [idArray[0], idArray[1], idArray[2], idArray[3]]
  );
  const combinedArray = [];
  for (let order of foundOrders) {
    combinedArray.push({
      ...order,
      books: foundBooks.filter((n) => n.order_id === order.order_id),
    });
  }

  res.send({ data: combinedArray });
});

router.get(
  "/api/orders/admin",
  authorizeAdminSession,
  async (req, res, next) => {
    const user = req.session.user.name;
    const foundOrders = await db.all(
      `SELECT order_id, created FROM orders LIMIT 8;`
    );
    const idArray = [];

    for (let i = 0; i < 8; i++) {
      if (foundOrders[i]) {
        idArray.push(foundOrders[i].order_id);
      } else {
        idArray.push(-1);
      }
    }
    const foundBooks = await db.all(
      `SELECT b.book_id, ob.order_id, b.title, b.author FROM order_books ob 
        INNER JOIN books b on ob.book_id = b.book_id WHERE ob.order_id IN (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        idArray[0],
        idArray[1],
        idArray[2],
        idArray[3],
        idArray[4],
        idArray[5],
        idArray[6],
        idArray[7],
      ]
    );
    const combinedArray = [];
    for (let order of foundOrders) {
      combinedArray.push({
        ...order,
        books: foundBooks.filter((n) => n.order_id === order.order_id),
      });
    }

    res.send({ data: combinedArray });
  }
);

router.post("/api/orders", authorizeUserSession, async (req, res, next) => {
  const date = new Date().toLocaleString();
  const orderResponse = await db.run(
    `INSERT INTO orders (username, created) VALUES (?,?);`,
    [req.session.user.name, date]
  );
  for (let book of req.body.books) {
    const updateResponse = await db.run(
      "UPDATE books SET available = false WHERE book_id = ?;",
      [book.book_id]
    );
    const obResponse = await db.all(
      `INSERT INTO order_books (order_id, book_id) VALUES (?, ?);`,
      [orderResponse.lastID, book.book_id]
    );
  }
  res.send({ data: "Success" });
});

export default router;
