import prisma from "../configs/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../configs/env.js";

export const shipperService = {
  login: async (phone, password) => {
    const driver = await prisma.driver.findUnique({
      where: { phone },
      include: { branch: true },
    });

    if (!driver) {
      throw new Error("Tài xế không tồn tại");
    }

    const isMatch = await bcrypt.compare(password, driver.passwordHash);
    if (!isMatch) {
      throw new Error("Mật khẩu không đúng");
    }

    const token = jwt.sign(
      { id: driver.id, role: "DRIVER" },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    return { driver, token };
  },

  getAssignedOrders: async (driverId) => {
    return await prisma.order.findMany({
      where: {
        driverId: driverId,
        status: "DRIVER_ASSIGNED",
      },
      include: {
        branch: true,
        user: true,
        orderItem: {
          include: {
            product: true,
            combo: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  updateOrderStatus: async (orderId, driverId, status) => {
    const order = await prisma.order.findFirst({
      where: { id: Number(orderId), driverId: driverId },
    });

    if (!order) {
      throw new Error("Đơn hàng không tồn tại hoặc không thuộc về bạn");
    }

    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status },
    });

    if (status === "DELIVERED") {
      await prisma.driver.update({
        where: { id: driverId },
        data: { status: "AVAILABLE" },
      });
    }

    return updatedOrder;
  },

  updateLocation: async (driverId, latitude, longitude) => {
    return await prisma.driver.update({
      where: { id: driverId },
      data: {
        latitude,
        longitude,
      },
    });
  },
};
