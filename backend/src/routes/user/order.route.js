import express from "express";
import { orderController } from "../../controllers/order.controller.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const routerOrder = express.Router();

// User phải đăng nhập
routerOrder.use(protectRoute);

// Tạo đơn hàng từ cart
routerOrder.post("/", orderController.createFromCart);

// Lấy danh sách đơn của user (không lấy tất cả như admin)
routerOrder.get("/", (req, res) => {
  orderController.getAllOfUser(req, res); // cần thêm hàm ở controller
});

// Lấy chi tiết đơn hàng
routerOrder.get("/:id", orderController.getById);

export default routerOrder;
