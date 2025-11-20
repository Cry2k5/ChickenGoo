import { cartService } from "../services/cart.service.js";

export const cartController = {
  getCart: async (req, res) => {
    const { branchId } = req.query;
    const cart = await cartService.getCart(req.user.id, Number(branchId));
    res.json({ success: true, data: cart });
  },

  addToCart: async (req, res) => {
    const { productId, branchId, quantity } = req.body;
    const cart = await cartService.addToCart(
      req.user.id,
      Number(branchId),
      Number(productId),
      Number(quantity)
    );
    res.json({ success: true, data: cart });
  },

  updateQuantity: async (req, res) => {
    const cart = await cartService.updateQuantity(
      Number(req.params.id),
      Number(req.body.quantity)
    );
    res.json({ success: true, data: cart });
  },

  removeItem: async (req, res) => {
    const cart = await cartService.removeItem(Number(req.params.id));
    res.json({ success: true, data: cart });
  },
};
