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
  const catChicken = await prisma.category.create({
    data: { name: "Chicken" },
  });
  const catSides = await prisma.category.create({ data: { name: "Sides" } });
  const catDrinks = await prisma.category.create({ data: { name: "Drinks" } });
  const catDesserts = await prisma.category.create({
    data: { name: "Desserts" },
  });

  // ----------- CHICKEN -----------
  const friedChicken = await prisma.product.create({
    data: {
      categoryId: catChicken.id,
      name: "Gà rán truyền thống",
      price: 70000,
      desc: "Gà rán giòn rụm, thơm ngon",
      image: null,
    },
  });
  const spicyChicken = await prisma.product.create({
    data: {
      categoryId: catChicken.id,
      name: "Gà rán cay",
      price: 75000,
      desc: "Gà rán cay nồng, hấp dẫn",
      image: null,
    },
  });
  const chickenWings = await prisma.product.create({
    data: {
      categoryId: catChicken.id,
      name: "Cánh gà rán",
      price: 60000,
      desc: "Cánh gà giòn, sốt đặc biệt",
      image: null,
    },
  });
  const chickenThigh = await prisma.product.create({
    data: {
      categoryId: catChicken.id,
      name: "Đùi gà rán",
      price: 80000,
      desc: "Đùi gà to, giòn rụm",
      image: null,
    },
  });
  const chickenPopcorn = await prisma.product.create({
    data: {
      categoryId: catChicken.id,
      name: "Gà popcorn",
      price: 50000,
      desc: "Gà chiên nhỏ, giòn tan",
      image: null,
    },
  });
  const chickenBurger = await prisma.product.create({
    data: {
      categoryId: catChicken.id,
      name: "Burger gà rán",
      price: 65000,
      desc: "Burger kẹp gà rán giòn",
      image: null,
    },
  });
  const chickenWrap = await prisma.product.create({
    data: {
      categoryId: catChicken.id,
      name: "Wrap gà rán",
      price: 60000,
      desc: "Bánh cuốn gà rán thơm ngon",
      image: null,
    },
  });

  // ----------- SIDES -----------
  const fries = await prisma.product.create({
    data: {
      categoryId: catSides.id,
      name: "Khoai tây chiên",
      price: 30000,
      desc: "Khoai tây chiên giòn",
      image: null,
    },
  });
  const onionRings = await prisma.product.create({
    data: {
      categoryId: catSides.id,
      name: "Hành tây chiên",
      price: 25000,
      desc: "Hành tây chiên giòn, thơm",
      image: null,
    },
  });
  const coleslaw = await prisma.product.create({
    data: {
      categoryId: catSides.id,
      name: "Salad Coleslaw",
      price: 20000,
      desc: "Salad cải bắp tươi mát",
      image: null,
    },
  });

  // ----------- DRINKS -----------
  const coca = await prisma.product.create({
    data: {
      categoryId: catDrinks.id,
      name: "Coca Cola",
      price: 20000,
      desc: "Nước ngọt Coca",
      image: null,
    },
  });
  const pepsi = await prisma.product.create({
    data: {
      categoryId: catDrinks.id,
      name: "Pepsi",
      price: 20000,
      desc: "Nước ngọt Pepsi",
      image: null,
    },
  });
  const sprite = await prisma.product.create({
    data: {
      categoryId: catDrinks.id,
      name: "Sprite",
      price: 20000,
      desc: "Nước ngọt Sprite",
      image: null,
    },
  });
  const fanta = await prisma.product.create({
    data: {
      categoryId: catDrinks.id,
      name: "Fanta",
      price: 20000,
      desc: "Nước ngọt Fanta",
      image: null,
    },
  });
  const icedTea = await prisma.product.create({
    data: {
      categoryId: catDrinks.id,
      name: "Trà đá",
      price: 15000,
      desc: "Trà đá mát lạnh",
      image: null,
    },
  });

  // ----------- DESSERTS -----------
  const iceCream = await prisma.product.create({
    data: {
      categoryId: catDesserts.id,
      name: "Kem vani",
      price: 25000,
      desc: "Kem vani mát lạnh",
      image: null,
    },
  });
  const pudding = await prisma.product.create({
    data: {
      categoryId: catDesserts.id,
      name: "Pudding socola",
      price: 30000,
      desc: "Pudding mềm mịn, thơm ngon",
      image: null,
    },
  });
  const brownie = await prisma.product.create({
    data: {
      categoryId: catDesserts.id,
      name: "Brownie",
      price: 35000,
      desc: "Brownie socola đậm đà",
      image: null,
    },
  });
  const cheesecake = await prisma.product.create({
    data: {
      categoryId: catDesserts.id,
      name: "Cheesecake",
      price: 40000,
      desc: "Bánh phô mai béo ngậy",
      image: null,
    },
  });
  const donut = await prisma.product.create({
    data: {
      categoryId: catDesserts.id,
      name: "Donut",
      price: 25000,
      desc: "Donut ngọt mềm, thơm ngon",
      image: null,
    },
  });

  // ----------- DRIVERS -----------
  const driver1 = await prisma.driver.create({
    data: {
      branchId: branch1.id,
      name: "Tài xế Minh",
      phone: "0911111111",
      passwordHash,
      status: "AVAILABLE",
      latitude: null,
      longitude: null,
    },
  });

  const driver2 = await prisma.driver.create({
    data: {
      branchId: branch2.id,
      name: "Tài xế Hùng",
      phone: "0922222222",
      passwordHash,
      status: "AVAILABLE",
      latitude: null,
      longitude: null,
    },
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
