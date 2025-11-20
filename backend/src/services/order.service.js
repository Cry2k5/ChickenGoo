import prisma from "../configs/prisma.js";

export const orderService = {
  // Tạo đơn hàng từ cart
  createOrderFromCart: async (userId, data) => {
    const { paymentMethod, deliveryAddress, deliveryPhone } = data;

    // Lấy cart của user
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        cartItem: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.cartItem.length === 0) {
      throw new Error("Cart is empty");
    }

    // Tính tổng tiền
    let totalAmount = 0;
    for (const item of cart.cartItem) {
      totalAmount += item.quantity * item.product.price;
    }

    // Tạo đơn hàng
    const order = await prisma.order.create({
      data: {
        branchId: cart.branchId,
        totalAmount,
        paymentMethod,
        deliveryAddress,
        deliveryPhone,
        orderItem: {
          create: cart.cartItem.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // Xóa cart sau khi tạo đơn
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    await prisma.cart.delete({ where: { id: cart.id } });

    return order;
  },

  getAll: async () => {
    return prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  getById: async (id) => {
    return prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        orderItem: true,
        branch: true,
      },
    });
  },

  updateStatus: async (id, status) => {
    return prisma.order.update({
      where: { id: Number(id) },
      data: { status },
    });
  },

  delete: async (id) => {
    return prisma.order.delete({ where: { id: Number(id) } });
  },
};
