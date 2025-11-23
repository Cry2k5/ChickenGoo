import { cartService } from "../services/cart.service.js";
import { ApiResponse } from "../configs/apiResponse.js";

export const cartController = {
  createCart: async (req, res) => {
    try {
      const { branchId } = req.body;

      if (!branchId) {
        return ApiResponse.error(
          res,
          { message: "Vui lòng chọn chi nhánh." },
          400
        );
      }

      const cart = await cartService.createCart(req.user.id, Number(branchId));

      return ApiResponse.success(res, cart, "Cart rỗng đã được tạo.");
    } catch (error) {
      console.error("[createCart]", error);
      return ApiResponse.error(res, error);
    }
  },
  getCart: async (req, res) => {
    try {
      const { branchId } = req.query;

      if (!branchId) {
        return ApiResponse.error(
          res,
          { message: "Vui lòng chọn chi nhánh (branchId)." },
          400
        );
      }

      const cart = await cartService.getCart(req.user.id, Number(branchId));

      return ApiResponse.success(res, cart, "Lấy giỏ hàng thành công.");
    } catch (error) {
      console.error("[getCart]", error);
      return ApiResponse.error(res, error);
    }
  },

  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity || quantity < 1) {
        return ApiResponse.error(
          res,
          { message: "Thiếu thông tin hoặc số lượng không hợp lệ." },
          400
        );
      }

      // Lấy cart hiện tại theo branchId (cart đã tạo khi chọn branch)
      const cart = await cartService.getCart(req.user.id, req.body.branchId);
      if (!cart || !cart.id) {
        return ApiResponse.error(
          res,
          { message: "Vui lòng tạo cart bằng cách chọn chi nhánh trước." },
          400
        );
      }

      const updatedCart = await cartService.addToCart(
        req.user.id,
        cart.branchId,
        Number(productId),
        Number(quantity)
      );

      return ApiResponse.success(
        res,
        updatedCart,
        "Thêm vào giỏ hàng thành công."
      );
    } catch (error) {
      console.error("[addToCart]", error);
      return ApiResponse.error(res, error);
    }
  },
  updateQuantity: async (req, res) => {
    try {
      const cartItemId = Number(req.params.id);
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return ApiResponse.error(
          res,
          { message: "Số lượng không hợp lệ (phải lớn hơn 0)." },
          400
        );
      }

      const cart = await cartService.updateQuantity(
        cartItemId,
        Number(quantity)
      );

      return ApiResponse.success(res, cart, "Cập nhật số lượng thành công.");
    } catch (error) {
      console.error("[updateQuantity]", error);
      return ApiResponse.error(res, error);
    }
  },

  removeItem: async (req, res) => {
    try {
      const cartItemId = Number(req.params.id);

      const cart = await cartService.removeItem(cartItemId);

      return ApiResponse.success(
        res,
        cart,
        "Xóa sản phẩm khỏi giỏ hàng thành công."
      );
    } catch (error) {
      console.error("[removeItem]", error);
      return ApiResponse.error(res, error);
    }
  },
};
