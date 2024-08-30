import { Router } from "express";
import db from "../databases/connection.js";

const router = Router();

async function authorizeUser(req, res, next) {
  req.session.user.role = req.session.user.role ?? "";
  if (req.session.user.role === "user") {
    next();
  } else {
    res.status(401).send("Not an authorized user");
  }
}

router.get("/api/favorites", authorizeUser, async (req, res) => {
  const subQuery = `SELECT b.*,
    (SELECT GROUP_CONCAT(g.genre,', ') from genres g WHERE g.book_id = b.book_id) as genre_list
     FROM books b WHERE b.ebook_link IS NOT NULL`;
     
  const query = `SELECT * FROM favorites INNER JOIN (${subQuery}) books ON favorites.book_id=books.book_id WHERE username = ?;`;
  const sqlData = await db.all(query, [req.session.user.name]);
  

  res.send({ data: [...sqlData] });
});

router.get("/api/favorites/min", authorizeUser, async (req, res) => {
  const query = `SELECT book_id FROM favorites WHERE username = ?;`;
  const sqlData = await db.all(query, [req.session.user.name]);

  res.send({ data: [...sqlData] });
});

router.post("/api/favorites", authorizeUser, async (req, res) => {
  const bookResult = await db.run(
    `INSERT INTO favorites(username, book_id) VALUES (?, ?);`,
    [req.session.user.name, req.body.book_id]
  );
  res.send({ data: null });
});

router.delete("/api/favorites:id", authorizeUser, async (req, res) => {
  const deleteBookResult = await db.run(
    "DELETE FROM favorites WHERE book_id = ? AND username = ?;",
    [req.params.id, req.session.user.role]
  );
  res.send({ data: null });
});

export default router;
