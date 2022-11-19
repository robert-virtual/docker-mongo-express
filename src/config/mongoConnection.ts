import { Db, MongoClient } from "mongodb";

let db:Db

export function getMongoDb() {
  if (db) {
   return db 
  }
  
  if (!process.env.MONGO_URI) {
   throw Error("Variable de entorno MONGO_URI no existe") 
  }
  db = new MongoClient(process.env.MONGO_URI).db()
  return db
  
}

