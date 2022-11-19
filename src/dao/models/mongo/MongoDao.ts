import {
  Collection,
  Db,
  DeleteResult,
  Filter,
  InsertManyResult,
  InsertOneResult,
  ObjectId,
  OptionalUnlessRequiredId,
  UpdateResult,
  WithId,
} from "mongodb";
import { IDaoBase } from "../IDaoBase";

export abstract class MongoDao<T> implements IDaoBase<T> {
  db: Db;
  entityName: string;
  collection: Collection<T>;
  /**
   *
   */
  constructor(entityName: string, db: Db) {
    this.entityName = entityName;
    this.db = db;
    this.collection = this.db.collection(this.entityName);
  }
  createMany(
    data: OptionalUnlessRequiredId<T>[]
  ): Promise<InsertManyResult<T>> {
    return this.collection.insertMany(data);
  }
  createOne(data: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>> {
    return this.collection.insertOne(data);
  }
  findMany(filter?: Filter<T> | undefined): Promise<WithId<T>[]> {
    return this.collection.find(filter ?? {}).toArray();
  }
  findOne(filter: Filter<T>): Promise<WithId<T>> {
    return this.collection.findOne(filter ?? {});
  }
  UpdateOne(filter: Filter<T>, data: Partial<T>): Promise<UpdateResult> {
    return this.collection.updateOne(filter, data);
  }
  UpdateMany(
    filter: Filter<T>,
    data: Partial<T>[]
  ): Promise<unknown | UpdateResult> {
    return this.collection.updateMany(filter, data);
  }
  DeleteOne(filter: Filter<T>): Promise<DeleteResult> {
    return this.collection.deleteOne(filter);
  }
  DeleteMany(filter: Filter<T>): Promise<DeleteResult> {
    return this.collection.deleteMany(filter);
  }
}
