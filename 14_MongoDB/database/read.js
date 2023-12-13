import db from './connection.js'

//const allAlbums = await db.albums.find().toaArray()

const favoriteAlbum = await db.albums.find({title:"Piper at the gate of dawn"}).toArray()