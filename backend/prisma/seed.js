import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ----------- Users -----------
  const passwordHash = await bcrypt.hash("123456", 10);

  const users = await prisma.user.createMany({
    data: [
      {
        name: "Nguyen Van A",
        email: "a@example.com",
        phone: "0912345671",
        passwordHash,
        role: "CUSTOMER",
        address: "123 Đường ABC, Quận 1",
      },
      {
        name: "Nguyen Van B",
        email: "b@example.com",
        phone: "0912345672",
        passwordHash,
        role: "CUSTOMER",
        address: "456 Đường XYZ, Quận 2",
      },
      {
        name: "Admin",
        email: "admin@example.com",
        phone: "0900000000",
        passwordHash,
        role: "ADMIN",
      },
    ],
  });

  // ----------- Branches -----------
  const branches = await prisma.branch.createMany({
    data: [
      {
        userId: 3, // admin
        name: "Chi nhánh 1",
        phone: "0123456789",
        address: "123 Đường Branch, Quận 1",
      },
      {
        userId: 3, // admin
        name: "Chi nhánh 2",
        phone: "0987654321",
        address: "456 Đường Branch, Quận 2",
      },
    ],
  });

  // ----------- Categories -----------
  const categories = await prisma.category.createMany({
    data: [{ name: "Fast Food" }, { name: "Beverages" }, { name: "Desserts" }],
  });

  // ----------- Products -----------
  const products = await prisma.product.createMany({
    data: [
      {
        categoryId: 1,
        name: "Burger",
        price: 50000,
        desc: "Burger thơm ngon",
      },
      {
        categoryId: 1,
        name: "Pizza",
        price: 120000,
        desc: "Pizza hảo hạng",
      },
      {
        categoryId: 2,
        name: "Coca Cola",
        price: 20000,
        desc: "Nước ngọt giải khát",
      },
      {
        categoryId: 3,
        name: "Kem",
        price: 30000,
        desc: "Kem mát lạnh",
      },
    ],
  });

  // ----------- Drivers -----------
  const drivers = await prisma.driver.createMany({
    data: [
      {
        branchId: 1,
        name: "Driver 1",
        phone: "0911111111",
        passwordHash,
        status: "AVAILABLE",
      },
      {
        branchId: 2,
        name: "Driver 2",
        phone: "0922222222",
        passwordHash,
        status: "AVAILABLE",
      },
    ],
  });

  // ----------- Carts for customers -----------
  const cart1 = await prisma.cart.create({
    data: {
      userId: 1,
      branchId: 1,
      totalAmount: 0,
    },
  });

  const cart2 = await prisma.cart.create({
    data: {
      userId: 2,
      branchId: 2,
      totalAmount: 0,
    },
  });

  // ----------- CartItems sample -----------
  await prisma.cartItem.createMany({
    data: [
      {
        cartId: cart1.id,
        productId: 1,
        quantity: 2,
        price: 50000,
      },
      {
        cartId: cart1.id,
        productId: 3,
        quantity: 1,
        price: 20000,
      },
      {
        cartId: cart2.id,
        productId: 2,
        quantity: 1,
        price: 120000,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
