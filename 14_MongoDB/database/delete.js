import db from './connection.js'

await db.albums.deleteOne({title:"Shine on you crazy diamond"})