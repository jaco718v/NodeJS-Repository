import { Router } from "express";
import db from "../databases/connection.js";

const router = Router();

async function authorizeAdminSession(req, res, next) {
  req.session.user.role = req.session.user.role ?? "";
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.status(401).send("Not an authorized admin");
  }
}

router.get("/api/locations", async (req, res) => {
  const query = `SELECT * FROM locations;`;
  const sqlData = await db.all(query);

  res.send({ data: [...sqlData] });
});

router.post("/api/locations", authorizeAdminSession, async (req, res) => {
  const locationData = await db.run(
    `INSERT INTO locations(location_name, postal_code, address, x_coordinate, y_coordinate) VALUES (?, ?, ?, ?, ?);`,
    [
      req.body.location_name,
      req.body.postal_code,
      req.body.address,
      req.body.x_coordinate,
      req.body.y_coordinate,
    ]
  );

  res.send({ data: null });
});

router.delete("/api/locations", authorizeAdminSession, async (req, res) => {
  const deleteLocationResult = await db.run(
    "DELETE FROM locations WHERE book_id = ?;",
    [req.params.id]
  );

  res.send({ data: null });
});

export default router;
