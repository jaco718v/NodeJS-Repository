import db from './connection.js'

await db.albums.updateOne({title:"The Wall"}, {$set:{score:9.3}})