import { Router } from "express";
import db from "../databases/connection.js";

const router = Router();

const pageSize = 2

router.get("/api/books/:page/:sort/:order", async (req,res) => {
    const Offset = (pageSize * req.params.page) - pageSize
    const query = "SELECT b.book_id, b.title, b.author, b.resume, b.available, (SELECT GROUP_CONCAT(g.genre,', ') from genres g WHERE g.book_id = b.book_id) as genre_list FROM books b ORDER BY ? ? LIMIT ? OFFSET ?;";
    const sqlData = await db.all(query,[req.params.sort],[req.params.order],[pageSize], [Offset]);
    res.send({data:{sqlData}})
})

export default router;