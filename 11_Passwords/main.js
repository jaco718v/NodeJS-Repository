import bcrypt from 'bcrypt'
const saltRounds = 14

const plainTextPassword = "1"

const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds)

const compareResult = await bcrypt.compare(plainTextPassword, hashedPassword)

console.log(hashedPassword)
console.log(compareResult)