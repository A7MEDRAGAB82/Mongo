import { db } from "../connection.js";

export const booksModel = await db.createCollection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
    },
  },
})

booksModel.createIndex({title:1})
