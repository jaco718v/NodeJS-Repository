import { Router } from "express";
import db from "../databases/connection.js";

const router = Router();

const whiteListArray = ['book_id', 'title', 'author', 'available', 'pages']


async function authorizeAdminSession(req, res, next) {
    if(req.session.user.role === 'admin'){
        next()
    } else{
        res.status(401).send("Not an authorized admin")
    }
}

router.get("/api/books", async (req,res) => { // page&page_size&sort&order&search
    let pageSize = Number(req.query.page_size) || 10
    let page = Number(req.query.page) || 1
    const Offset = ((pageSize * page) - pageSize) || 0
    
    let verifiedSort = 'book_id'
    if(req.query.sort){
        verifiedSort = whiteListArray.filter((n) => n === (req.query.sort).toLowerCase())[0]
        if((req.query.sort.toLocaleLowerCase()) == 'status'){
            verifiedSort = 'available'
        }
    }
    if(!verifiedSort){
        verifiedSort = 'book_id'
    }
   
    let orderType = 'ASC'
    if(req.query.order == 'desc'){
        orderType = 'DESC'
    }

    const search = req.query.search? req.query.search+ '%' : '%'
    
    const query = `SELECT b.*,
     (SELECT GROUP_CONCAT(g.genre,', ') from genres g WHERE g.book_id = b.book_id) as genre_list
      FROM books b WHERE b.title LIKE ? OR b.author LIKE ? ORDER BY ${verifiedSort} ${orderType} LIMIT ${pageSize} OFFSET ${Offset};`;
    const sqlData = await db.all(query, [search, search]);
    if(req.query.search){
        if(!req.session.recOptions){
            req.session.recOptions = []
        }
        const newRecs = sqlData.map((n) => {return {title: n.title, genres: [...(n.genre_list.split(", "))]}})
        const nonDuplicates = newRecs.filter((n => !((req.session.recOptions).find((p)=> p.title === n.title))))
        req.session.recOptions = [...req.session.recOptions, ...nonDuplicates]
    }
    if(req.query.search && req.query.page_size != 5){
        if(!req.session.history){
            req.session.history = []
        }
        req.session.history = [...req.session.history, req.query.search]
    }
    res.send({data:[...sqlData]})
})

router.get("/api/books/total", async (req,res) => {
    const search = req.query.search? req.query.search+ '%' : '%'
    const query = 'SELECT COUNT(*) as total FROM books WHERE title LIKE ? OR author LIKE ?'
    const sqlData = await db.get(query, [search, search]);
    res.send({data:sqlData.total})
})

router.post("/api/books", authorizeAdminSession , async (req, res, next) => {
    const bookResult = await db.run(`INSERT INTO books (title, resume, author, pages, available) VALUES (?, ?, ?, ?, 1);`, 
                                [req.body.title, req.body.resume, req.body.author, req.body.pages]);
    const concatGenres = (req.body.genres).split('-')
    
    for (let genre of concatGenres){
        const genreResult = await db.run(`INSERT INTO genres (book_id, genre) VALUES (?, ?);`, 
        [bookResult.lastID , genre]);
    }

    res.send({data: null });
})

router.put("/api/books/:id", authorizeAdminSession, async (req, res, next) => {
    const editResult = await db.run('UPDATE books SET title = ?, resume = ?, author = ?, pages = ? WHERE book_id = ?;', 
    [req.body.title, req.body.resume, req.body.author, req.body.pages, req.params.id])
    const deleteResult = await db.run('DELETE FROM genres WHERE book_id = ?;',
    [req.params.id])
    const concatGenres = (req.body.genres).split('-')
    for (let genre of concatGenres){
        const genreResult = await db.run(`INSERT INTO genres (book_id, genre) VALUES (?, ?);`, 
        [req.params.id , genre]);
    }
})

router.delete("/api/books/:id", authorizeAdminSession, async (req, res, next) => {
    const deleteBookResult = await db.run('DELETE FROM books WHERE book_id = ?;',
    [req.params.id])
    const deleteGenreResult = await db.run('DELETE FROM genres WHERE book_id = ?;',
    [req.params.id])
})

export default router;