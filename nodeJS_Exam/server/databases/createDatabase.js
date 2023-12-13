import db from "./connection.js";

const isDeleteMode =
  process.argv.findIndex((arg) => arg === "delete") === -1 ? false : true;

if (isDeleteMode) {
  console.log("oi");
  await db.exec(`DROP TABLE IF EXISTS users;`);
}

db.exec(`CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(255) PRIMARY KEY NOT NULL,
  hashed_password CHAR(60)
);`);

/*SEED
if(isDeleteMode){
  await db.run("INSERT INTO users (username, hashed)" )
}
*/
