import prisma from "../configs/prisma.js";

export const orderService = {
  createOrder: async (userId, cart, body) => {
    const { paymentMethod, deliveryAddress, deliveryPhone } = body;

    // Convert cart items -> order items
    const items = cart.cartItem.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price, // lấy giá từ CartItem
    }));

    // Tính tổng tiền từ cart luôn, không cần map lại
    const totalAmount = cart.totalAmount;

    // Tạo order
    const order = await prisma.order.create({
      data: {
        userId,
        branchId: cart.branchId,
        totalAmount,
        paymentMethod,
        deliveryAddress,
        deliveryPhone,
        orderItem: {
          create: items,
        },
      },
      include: {
        orderItem: true,
      },
    });

    // Xóa cart sau khi tạo order
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    await prisma.cart.delete({
      where: { id: cart.id },
    });

    return order;
  },

  getOrdersByUser: async (userId) => {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        orderItem: {
          include: { product: true },
        },
        branch: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  getOrderDetail: async (orderId, userId) => {
    return await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        orderItem: {
          include: { product: true },
        },
        branch: true,
      },
    });
  },

  // Cập nhật trạng thái đơn hàng
  async updateStatus(orderId, status) {
    // Kiểm tra status hợp lệ
    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "SHIPPING",
      "DELIVERED",
      "CANCELLED",
    ];
    if (!validStatuses.includes(status)) {
      throw new Error(
        `Status không hợp lệ. Chỉ chấp nhận: ${validStatuses.join(", ")}`
      );
    }

    // Cập nhật
    const order = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status },
      include: {
        orderItem: true,
        user: true,
        branch: true,
      },
    });

    return order;
  },
  // ADMIN gán tài xế
  async assignDriver(orderId, driverId) {
    // Kiểm tra driver tồn tại
    const driver = await prisma.driver.findUnique({
      where: { id: Number(driverId) },
    });
    if (!driver) {
      throw new Error("Driver không tồn tại");
    }

    // Cập nhật order
    const order = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { driverId: Number(driverId) },
      include: {
        orderItem: true,
        user: true,
        branch: true,
      },
    });

    return order;
  },
};
