import { Router } from "express";
import db from "../databases/connection.js";

const router = Router();

const whiteListArray = ['book_id', 'title', 'author', 'available', 'pages']

router.get("/api/books", async (req,res) => { // page&page_size&sort&order&search
    let pageSize = Number(req.query.page_size) || 10
    let page = Number(req.query.page) || 1
    const Offset = ((pageSize * page) - pageSize) || 0
    
    let verifiedSort = whiteListArray.filter((n) => n === req.query.sortBy)[0]
    if(!verifiedSort){
        verifiedSort = 'book_id'
    }
   
    let orderType = 'ASC'
    if(req.query.order === 'desc'){
        orderType = 'DESC'
    }

    const search = req.query.search? req.query.search+ '%' : '%'
    
    const query = `SELECT b.book_id, b.title, b.author, b.resume, b.available,
     (SELECT GROUP_CONCAT(g.genre,', ') from genres g WHERE g.book_id = b.book_id) as genre_list
      FROM books b WHERE b.title LIKE ? OR b.author LIKE ? ORDER BY ${verifiedSort} ${orderType} LIMIT ${pageSize} OFFSET ${Offset};`;
    const sqlData = await db.all(query, [search, search]);
    res.send({data:[...sqlData]})
})

router.get("/api/books/total", async (req,res) => {
    const search = req.query.search? req.query.search+ '%' : '%'
    const query = 'SELECT COUNT(*) as total FROM books WHERE title LIKE ? OR author LIKE ?'
    const sqlData = await db.get(query, [search, search]);
    res.send({data:sqlData.total})
})

export default router;