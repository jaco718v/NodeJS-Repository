import { Router } from "express";
import db from "../databases/connection.js";

const router = Router();

router.get("/api/books", async (req,res) => {
    const query = "SELECT b.book_id, b.title, b.author, b.resume, b.available, (SELECT GROUP_CONCAT(g.genre,', ') from genres g WHERE g.book_id = b.book_id) as genre_list FROM books b;";
    const sqlData = await db.get(query);
    res.send({data:{sqlData}})
})

export default router;