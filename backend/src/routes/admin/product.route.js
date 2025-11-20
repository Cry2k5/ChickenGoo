import express from "express";
import { productController } from "../../controllers/product.controller.js";
const routerProduct = express.Router();
routerProduct.get("/", productController.getAll);
routerProduct.get("/:id", productController.getById);
routerProduct.post("/", productController.create);
routerProduct.delete("/:id", productController.delete);

export default routerProduct;
