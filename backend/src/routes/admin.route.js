import express from "express";
import routerAuth from "./admin/admin-auth.route.js";
import routerCategory from "./admin/category.route.js";
import routerProduct from "./admin/product.route.js";
import routerUser from "./admin/user.route.js";
import routerOrder from "./admin/order.route.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.midlleware.js";

const routerAdmin = express.Router();

// Public auth routes
routerAdmin.use("/auth", routerAuth);

// Các route admin cần login + role ADMIN
routerAdmin.use(protectRoute);

routerAdmin.use("/categories", checkRole("ADMIN"), routerCategory);
routerAdmin.use("/products", checkRole("ADMIN"), routerProduct);
routerAdmin.use("/users", checkRole("ADMIN"), routerUser);
routerAdmin.use("/orders", checkRole("ADMIN"), routerOrder);
export default routerAdmin;
