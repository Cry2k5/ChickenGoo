import { orderService } from "../services/order.service.js";
import { cartService } from "../services/cart.service.js";
import { ApiResponse } from "../configs/apiResponse.js";

export const orderController = {
  createOrder: async (req, res) => {
    try {
      const userId = req.user.id;
      const { branchId, paymentMethod, deliveryAddress, deliveryPhone } =
        req.body;

      if (!branchId || !paymentMethod || !deliveryAddress || !deliveryPhone) {
        return ApiResponse.error(
          res,
          { message: "Thiếu thông tin đặt hàng." },
          400
        );
      }

      const cart = await cartService.getCart(userId, Number(branchId));

      if (!cart || cart.cartItem.length === 0) {
        return ApiResponse.error(
          res,
          { message: "Giỏ hàng trống, không thể tạo đơn hàng." },
          400
        );
      }

      const order = await orderService.createOrder(userId, cart, req.body);

      return ApiResponse.success(res, order, "Đặt hàng thành công.");
    } catch (error) {
      console.error("[createOrder]", error);
      return ApiResponse.error(res, error);
    }
  },

  getOrders: async (req, res) => {
    try {
      const userId = req.user.id;

      const orders = await orderService.getOrdersByUser(userId);

      return ApiResponse.success(
        res,
        orders,
        "Lấy danh sách đơn hàng thành công."
      );
    } catch (error) {
      console.error("[getOrders]", error);
      return ApiResponse.error(res, error);
    }
  },

  getOrderDetail: async (req, res) => {
    try {
      const orderId = Number(req.params.id);
      const userId = req.user.id;

      const order = await orderService.getOrderDetail(orderId, userId);

      if (!order) {
        return ApiResponse.error(
          res,
          { message: "Đơn hàng không tồn tại." },
          404
        );
      }

      return ApiResponse.success(
        res,
        order,
        "Lấy chi tiết đơn hàng thành công."
      );
    } catch (error) {
      console.error("[getOrderDetail]", error);
      return ApiResponse.error(res, error);
    }
  },
  async updateStatus(req, res) {
    try {
      const order = await orderService.updateStatus(
        req.params.id,
        req.body.status
      );

      return ApiResponse.success(res, order, "Cập nhật trạng thái thành công");
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  },
  async assignDriver(req, res) {
    try {
      const { orderId } = req.params;
      const { driverId } = req.body;

      const order = await orderService.assignDriver(orderId, driverId);

      return ApiResponse.success(res, order, "Gán tài xế thành công");
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  },
};
