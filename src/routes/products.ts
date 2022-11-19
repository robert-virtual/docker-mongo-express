import { Router } from "express";
import { ProductsMongoDao } from "../dao/models/mongo/ProductsMongoDao";
const product = new ProductsMongoDao();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const products = await product.findMany(filter);
    res.json({ msg: "get products", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await product.findOne({ _id: id });
    res.json({ msg: "get product", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const newProduct = await product.createOne(req.body);
    res.json({ msg: "post products", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
