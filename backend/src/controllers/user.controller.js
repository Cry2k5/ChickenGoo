import { userService } from "../services/user.service.js";
import { ApiResponse } from "../configs/apiResponse.js";

export const userController = {
  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      return ApiResponse.success(res, users, "Lấy danh sách user thành công");
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  },

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) throw new Error("User không tồn tại");
      return ApiResponse.success(res, user, "Lấy user thành công");
    } catch (error) {
      return ApiResponse.error(res, error, 404);
    }
  },

  async create(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      return ApiResponse.success(res, newUser, "Tạo user thành công", 201);
    } catch (error) {
      return ApiResponse.error(res, error, 400);
    }
  },

  async delete(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      return ApiResponse.success(res, null, "Xóa user thành công");
    } catch (error) {
      return ApiResponse.error(res, error, 404);
    }
  },
};
