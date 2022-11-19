import { ObjectId } from "mongodb"

export interface IProduct{
  name:string
  description:string
  stock:number
  price:number
  createdAt:Date
  updatedAt:Date
  _id?:string  | ObjectId
}
