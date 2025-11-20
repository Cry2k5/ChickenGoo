import { orderService } from "../services/order.service.js";

export const orderController = {
  getAllOfUser: async (req, res) => {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: orders });
  },

  createFromCart: async (req, res) => {
    try {
      const order = await orderService.createOrderFromCart(
        req.user.id,
        req.body
      );
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getAll: async (req, res) => {
    const orders = await orderService.getAll();
    res.json({ success: true, data: orders });
  },

  getById: async (req, res) => {
    const order = await orderService.getById(req.params.id);
    res.json({ success: true, data: order });
  },

  updateStatus: async (req, res) => {
    try {
      const order = await orderService.updateStatus(
        req.params.id,
        req.body.status
      );
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  delete: async (req, res) => {
    await orderService.delete(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  },
};
