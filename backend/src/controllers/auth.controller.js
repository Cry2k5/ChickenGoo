import { authService } from "../services/auth.service.js";
import { ApiResponse } from "../configs/apiResponse.js";

export const userAuthController = {
  async signUp(req, res) {
    try {
      const { name, phone, email, password } = req.body;

      if (!name || !phone || !email || !password) {
        return ApiResponse.error(res, new Error("Vui long dien day du"), 400);
      }

      const result = await authService.signUp(name, phone, email, password);

      return ApiResponse.success(res, result, "Đăng ký thành công", 201);
    } catch (err) {
      return ApiResponse.error(res, err, 400);
    }
  },

  async signIn(req, res) {
    try {
      const { phone, password } = req.body;

      if (!phone || !password) {
        return ApiResponse.error(
          res,
          new Error("All fields are required"),
          400
        );
      }

      const result = await authService.signIn(phone, password);

      return ApiResponse.success(res, result, "Đăng nhập thành công");
    } catch (err) {
      return ApiResponse.error(res, err, 400);
    }
  },

  async signOut(req, res) {
    try {
      // Nếu bạn dùng cookie để lưu token, xoá cookie
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return ApiResponse.success(res, null, "Đăng xuất thành công");
    } catch (err) {
      return ApiResponse.error(res, err, 500);
    }
  },
};
