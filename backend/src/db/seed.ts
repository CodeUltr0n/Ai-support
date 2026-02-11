import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.messages.deleteMany();
  await prisma.conversations.deleteMany();
  await prisma.user.deleteMany();

  // Create user
  const user = await prisma.user.create({
    data: {
      email: 'user@test.com',
      name: 'Test User',
    },
  });

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling headphones with 30hr battery',
        price: 1499,
        category: 'Electronics',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cotton T-Shirt (Blue)',
        description: '100% organic cotton, size M',
        price: 599,
        category: 'Clothing',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Running Shoes',
        description: 'Lightweight running shoes, size 10',
        price: 2999,
        category: 'Footwear',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Laptop Stand',
        description: 'Adjustable aluminum laptop stand',
        price: 899,
        category: 'Accessories',
      },
    }),
  ]);

  // Create orders with items
  const order1 = await prisma.order.create({
    data: {
      userId: user.id,
      status: 'SHIPPED',
      totalAmount: 2098,
      trackingNumber: 'TRK123456789',
      shippingAddress: '123 Main St, New York, NY 10001',
      items: {
        create: [
          { productId: products[0].id, quantity: 1, price: products[0].price },
          { productId: products[1].id, quantity: 1, price: products[1].price },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user.id,
      status: 'DELIVERED',
      totalAmount: 2999,
      trackingNumber: 'TRK987654321',
      shippingAddress: '123 Main St, New York, NY 10001',
      items: {
        create: [
          { productId: products[2].id, quantity: 1, price: products[2].price },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      userId: user.id,
      status: 'PROCESSING',
      totalAmount: 899,
      shippingAddress: '123 Main St, New York, NY 10001',
      items: {
        create: [
          { productId: products[3].id, quantity: 1, price: products[3].price },
        ],
      },
    },
  });

  console.log('Seed data created successfully!');
  console.log(`Created user: ${user.email}`);
  console.log(`Created ${products.length} products`);
  console.log(`Created 3 orders`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
