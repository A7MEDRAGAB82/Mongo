import { db } from "../connection.js";


export const logsModel = await db.createCollection("logs",{ capped: true, size: 1000 });