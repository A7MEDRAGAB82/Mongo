import { MongoClient } from 'mongodb';
import {DB_URI , DB_NAME} from "../../config/env.service.js"

  
  
  const client = new MongoClient(DB_URI);
 export const db = client.db(DB_NAME)

  export const DatabaseConnection = async ()=> {
       await client.connect()
              .then(()=>{
                console.log("connected to mongodb");
              })
              .catch(err =>{
                console.log('Failed to connect to MongoDB' , err);
              })
   


  }

  
