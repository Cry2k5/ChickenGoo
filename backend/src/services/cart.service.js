import prisma from "../configs/prisma.js";

export const cartService = {
  getCart: async (userId, branchId) => {
    return prisma.cart.findFirst({
      where: { userId, branchId },
      include: {
        cartItem: {
          include: { product: true },
        },
      },
    });
  },

  addToCart: async (userId, branchId, productId, quantity = 1) => {
    // Kiểm tra cart tồn tại chưa
    let cart = await prisma.cart.findFirst({
      where: { userId, branchId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          branchId,
          totalAmount: 0,
        },
      });
    }

    // Kiểm tra item
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return cartService.recalculate(cart.id);
  },

  updateQuantity: async (cartItemId, quantity) => {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    return cartService.recalculate(item.cartId);
  },

  removeItem: async (cartItemId) => {
    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return cartService.recalculate(item.cartId);
  },

  recalculate: async (cartId) => {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        cartItem: { include: { product: true } },
      },
    });

    let total = 0;
    cart.cartItem.forEach((item) => {
      total += item.quantity * item.product.price;
    });

    return prisma.cart.update({
      where: { id: cartId },
      data: { totalAmount: total },
      include: {
        cartItem: { include: { product: true } },
      },
    });
  },
};
