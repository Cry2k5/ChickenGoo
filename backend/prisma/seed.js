import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("RESETTING DATABASE...");

  // Xóa theo thứ tự quan hệ để tránh conflict
  await prisma.billItem.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.comboItem.deleteMany();
  await prisma.combo.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.user.deleteMany();

  console.log("SEEDING...");

  const passwordHash = await bcrypt.hash("123456", 10);

  // ----------- USERS -----------
  const userA = await prisma.user.create({
    data: {
      name: "Nguyen Van A",
      email: "a@example.com",
      phone: "0912345671",
      passwordHash,
      role: "CUSTOMER",
      address: "123 đường ABC, Quận 1",
    },
  });

  const userB = await prisma.user.create({
    data: {
      name: "Nguyen Van B",
      email: "b@example.com",
      phone: "0912345672",
      passwordHash,
      role: "CUSTOMER",
      address: "456 đường XYZ, Quận 2",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      phone: "0900000000",
      passwordHash,
      role: "ADMIN",
    },
  });

  // ----------- BRANCHES -----------
  const branch1 = await prisma.branch.create({
    data: {
      name: "Chi nhánh 1",
      phone: "0123456789",
      address: "123 CN 1, Quận 1",
      latitude: 10.762622,
      longitude: 106.660172,
    },
  });

  const branch2 = await prisma.branch.create({
    data: {
      name: "Chi nhánh 2",
      phone: "0987654321",
      address: "456 CN 2, Quận 2",
      latitude: 10.802622,
      longitude: 106.700172,
    },
  });

  // ----------- CATEGORIES -----------
  const catFood = await prisma.category.create({
    data: { name: "Fast Food" },
  });

  const catDrink = await prisma.category.create({
    data: { name: "Beverages" },
  });

  // ----------- PRODUCTS -----------
  const burger = await prisma.product.create({
    data: {
      categoryId: catFood.id,
      name: "Burger",
      price: 50000,
      desc: "Burger thơm ngon",
      image: null,
    },
  });

  const pizza = await prisma.product.create({
    data: {
      categoryId: catFood.id,
      name: "Pizza",
      price: 120000,
      desc: "Pizza thượng hạng",
      image: null,
    },
  });

  const coca = await prisma.product.create({
    data: {
      categoryId: catDrink.id,
      name: "Coca Cola",
      price: 20000,
      desc: "Nước ngọt Coca",
      image: null,
    },
  });

  // ----------- COMBO -----------
  const combo1 = await prisma.combo.create({
    data: {
      categoryId: catFood.id,
      name: "Combo Burger + Coca",
      price: 65000,
      desc: "Combo tiết kiệm",
      image: null,
    },
  });

  await prisma.comboItem.createMany({
    data: [
      { comboId: combo1.id, productId: burger.id, quantity: 1 },
      { comboId: combo1.id, productId: coca.id, quantity: 1 },
    ],
  });

  // ----------- DRIVERS -----------
  const driver1 = await prisma.driver.create({
    data: {
      branchId: branch1.id,
      name: "Tài xế Minh",
      phone: "0911111111",
      passwordHash,
      status: "AVAILABLE",
    },
  });

  const driver2 = await prisma.driver.create({
    data: {
      branchId: branch2.id,
      name: "Tài xế Hùng",
      phone: "0922222222",
      passwordHash,
      status: "AVAILABLE",
    },
  });

  // ----------- CART -----------
  const cart1 = await prisma.cart.create({
    data: {
      userId: userA.id,
      branchId: branch1.id,
      totalAmount: 0,
    },
  });

  const cart2 = await prisma.cart.create({
    data: {
      userId: userB.id,
      branchId: branch2.id,
      totalAmount: 0,
    },
  });

  // ----------- CART ITEMS -----------
  await prisma.cartItem.createMany({
    data: [
      { cartId: cart1.id, productId: burger.id, quantity: 2, price: 50000 },
      { cartId: cart1.id, comboId: combo1.id, quantity: 1, price: 65000 },
      { cartId: cart2.id, productId: pizza.id, quantity: 1, price: 120000 },
    ],
  });

  // Update total amount
  async function updateCartTotal(cartId) {
    const items = await prisma.cartItem.findMany({
      where: { cartId },
    });
    const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    await prisma.cart.update({
      where: { id: cartId },
      data: { totalAmount: total },
    });
  }

  await updateCartTotal(cart1.id);
  await updateCartTotal(cart2.id);

  // ----------- ORDER -----------
  const order1 = await prisma.order.create({
    data: {
      userId: userA.id,
      branchId: branch1.id,
      driverId: driver1.id,
      totalAmount: 170000,
      status: "ACCEPTED",
      paymentMethod: "COD",
      deliveryAddress: "123 đường ABC, Quận 1",
      deliveryPhone: "0912345671",
      latitude: 10.76,
      longitude: 106.67,
    },
  });

  await prisma.orderItem.createMany({
    data: [
      { orderId: order1.id, productId: burger.id, quantity: 2, price: 50000 },
      { orderId: order1.id, comboId: combo1.id, quantity: 1, price: 65000 },
    ],
  });

  // ----------- BILLS -----------
  const bill1 = await prisma.bill.create({
    data: {
      userId: userA.id,
      branchId: branch1.id,
      totalPrice: 170000,
    },
  });

  await prisma.billItem.createMany({
    data: [
      { billId: bill1.id, productId: burger.id, quantity: 2, price: 50000 },
      { billId: bill1.id, productId: coca.id, quantity: 1, price: 20000 },
    ],
  });

  console.log("SEEDING DONE!");
}

main()
  .catch((e) => {
    console.error("SEED ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
