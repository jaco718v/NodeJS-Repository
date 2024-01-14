import { Router } from "express";
import db from "../databases/connection.js";

const router = Router();

const pageSize = 2
const whiteListArray = ['book_id', 'title', 'author', 'available', 'pages']

router.get("/api/books/:page/:sort/:order", async (req,res) => {
    let verifiedSort = whiteListArray.filter((n) => n === req.params.sort)[0]
    if(verifiedSort.length === 0){
        verifiedSort[0] === 'book_id'
    }
    const Offset = ((pageSize * Number(req.params.page)) - pageSize) || 0
    let orderType = 'ASC'
    if(req.params.order === 'desc'){
        orderType = 'DESC'
    }
    const query = `SELECT b.book_id, b.title, b.author, b.resume, b.available,
     (SELECT GROUP_CONCAT(g.genre,', ') from genres g WHERE g.book_id = b.book_id) as genre_list
      FROM books b ORDER BY ${verifiedSort} ${orderType} LIMIT ${pageSize} OFFSET ${Offset};`;
    const sqlData = await db.all(query);
    res.send({data:{...sqlData}})
})

export default router;