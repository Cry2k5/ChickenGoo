import prisma from "../configs/prisma.js";

export const userService = {
  async getAllUsers() {
    return await prisma.user.findMany();
  },

  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
    });
  },

  async createUser(data) {
    return await prisma.user.create({ data });
  },

  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id: Number(id) },
    });
  },
};
