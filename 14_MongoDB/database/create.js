import db from './connection.js'

await db.albums.insertOne({title:"Shine on you crazy diamond", score: 9.8});