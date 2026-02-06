import express from "express";
import { DatabaseConnection } from "./database/connection.js";
import { booksModel } from "./database/models/books.model.js";
import { logsModel } from "./database/models/logs.model.js";
import { authorModel } from "./database/models/authors.model.js";
import bookRouter from "./modules/books/book.controller.js"
import logRouter from "./modules/logs/log.controller.js"

export const bootStrap = async () => {
  const app = express();

  app.use(express.json());
  await DatabaseConnection();
  app.use('/books',bookRouter)
  app.use('/logs',logRouter)

  app.listen(3000, () => console.log(`server is running at 3000 `));
};
