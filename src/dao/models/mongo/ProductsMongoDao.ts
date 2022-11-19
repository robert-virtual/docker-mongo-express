import { Filter, InsertOneResult, ObjectId, WithId } from "mongodb";
import { getMongoDb } from "../../../config/mongoConnection";
import { IProduct } from "../entities/IProduct";
import { MongoDao } from "./MongoDao";

export class ProductsMongoDao extends MongoDao<IProduct> {
  /**
   *
   */
  constructor() {
    super("products", getMongoDb());
  }
  createOne(data: IProduct): Promise<InsertOneResult<IProduct>> {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return super.createOne(data);
  }
  findMany(filter?: Partial<IProduct>): Promise<WithId<IProduct>[]> {
    if (filter && filter._id) {
      filter._id = new ObjectId(filter._id);
    }
    filter.price && (filter.price = Number(filter.price))
    filter.stock && (filter.stock = Number(filter.stock))

    return this.collection.find(filter).toArray();
  }
  findOne(filter: Partial<IProduct>): Promise<WithId<IProduct>> {
    filter._id = new ObjectId(filter._id);
    return super.findOne(filter);
  }
}
