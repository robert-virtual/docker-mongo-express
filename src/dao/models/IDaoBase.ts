import { Db, DeleteResult, Filter, InsertManyResult, InsertOneResult, OptionalUnlessRequiredId, UpdateResult, WithId } from "mongodb"

export interface IDaoBase<T>{
  
 db:unknown | Db
 entityName:string
 createOne(data:T | OptionalUnlessRequiredId<T>):Promise<unknown | InsertOneResult<T>>
 createMany(data:T[] | OptionalUnlessRequiredId<T>[]):Promise<unknown | InsertManyResult<T>>
 findMany(filter?:Partial<T> | Filter<T>):Promise<T[] | WithId<T>[]>
 findOne(filter:Partial<T> | Filter<T>):Promise<T | WithId<T>>
 UpdateOne(filter:Partial<T> | Filter<T>,data:Partial<T>):Promise<unknown | UpdateResult>
 UpdateMany(filter:Partial<T> | Filter<T>,data:Partial<T>[]):Promise<unknown | UpdateResult>
 DeleteOne(filter:Partial<T> | Filter<T>):Promise<unknown | DeleteResult>
 DeleteMany(filter:Partial<T> | Filter<T>):Promise<unknown | DeleteResult>
}
