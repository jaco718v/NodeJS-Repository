import bcrypt from "bcrypt";
const saltRounds = 14;

const plainTextPassword = "Nacho123";

const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

const hashedPassword2 = await bcrypt.hash(plainTextPassword, saltRounds);

const compareResult = await bcrypt.compare(plainTextPassword, hashedPassword);

const compareResult1 = await bcrypt.compare(plainTextPassword, hashedPassword2);

console.log(hashedPassword , hashedPassword2);

console.log(compareResult, compareResult1)

