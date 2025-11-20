import prisma from "../configs/prisma.js";

export const productService = {
  // Lấy tất cả sản phẩm, có thể filter theo category
  async getAll(categoryId) {
    const where = categoryId ? { categoryId } : {};
    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return products;
  },

  // Lấy sản phẩm theo id
  async getById(id) {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });
    if (!product) throw new Error("Product not found");
    return product;
  },

  // Tạo sản phẩm mới
  async create({ name, price, categoryId, desc, image }) {
    // Kiểm tra category tồn tại
    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });
    if (!category) throw new Error("Category not found");

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        categoryId: Number(categoryId),
        desc,
        image,
      },
    });
    return newProduct;
  },

  // Cập nhật sản phẩm
  async update(id, { name, price, categoryId, desc, image }) {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) throw new Error("Product not found");

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: Number(categoryId) },
      });
      if (!category) throw new Error("Category not found");
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: price !== undefined ? Number(price) : undefined,
        categoryId,
        desc,
        image,
      },
    });
    return updatedProduct;
  },

  // Xoá sản phẩm
  async delete(id) {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) throw new Error("Product not found");

    await prisma.product.delete({ where: { id: Number(id) } });
    return { message: "Product deleted successfully" };
  },
};
