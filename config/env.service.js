import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

 const DB_URI = process.env.DATABASE_URI
 const DB_NAME = process.env.DATABASE_NAME



 export {DB_URI , DB_NAME}
