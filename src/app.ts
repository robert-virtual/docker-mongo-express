if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
import express from "express";
import cors from "cors";
import productsRouter from "./routes/products";

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//routes
app.get("/hola",(req,res)=>{
  res.json({msg:"Hola"})
})
app.use("/products",productsRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
