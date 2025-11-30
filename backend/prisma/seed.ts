import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { slugify } from '../src/utils/slug.js';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@i-remont.ru' },
    update: {},
    create: { email: 'admin@i-remont.ru', password: passwordHash, name: 'Admin' },
  });

  const categories = [
    { name: 'iPhone', slug: 'iphone' },
    { name: 'iPad', slug: 'ipad' },
    { name: 'Watch', slug: 'watch' },
    { name: 'AirPods', slug: 'airpods' },
    { name: 'Accessories', slug: 'accessories' },
  ];
  for (const category of categories) {
    await prisma.category.upsert({ where: { slug: category.slug }, update: {}, create: category });
  }

  const iphoneCategory = await prisma.category.findUnique({ where: { slug: 'iphone' } });
  const airpodsCategory = await prisma.category.findUnique({ where: { slug: 'airpods' } });

  if (!iphoneCategory || !airpodsCategory) return;

  const demoProducts = [
    {
      name: 'iPhone 15 Pro 256GB',
      brand: 'Apple',
      categoryId: iphoneCategory.id,
      price: 139990,
      oldPrice: 149990,
      inStock: true,
      shortDescription: 'Флагман Apple с камерой Pro и мощным A17 Pro.',
      description: '<p>Дисплей 6.1", OLED, A17 Pro. Титан, USB‑C.</p>',
      memory: '256GB',
      color: 'Titanium',
      mainImageUrl: 'https://images.unsplash.com/photo-1695048133140-61814fdb8658?auto=format&fit=crop&w=900&q=80',
      characteristics: {
        'Дисплей': '6.1" OLED',
        'Процессор': 'A17 Pro',
        'Память': '256GB',
        'Цвет': 'Titanium',
      },
      seoTitle: 'Купить iPhone 15 Pro 256GB — i-Remont',
      seoDescription: 'iPhone 15 Pro 256GB по выгодной цене в наличии. Быстрая доставка.',
      isFeatured: true,
      gallery: [
        { url: 'https://images.unsplash.com/photo-1699530632529-d2b4c8c0d24c?auto=format&fit=crop&w=900&q=80', position: 1 },
        { url: 'https://images.unsplash.com/photo-1694949951788-6c55a5af6532?auto=format&fit=crop&w=900&q=80', position: 2 },
      ],
    },
    {
      name: 'AirPods Pro (2‑е поколение)',
      brand: 'Apple',
      categoryId: airpodsCategory.id,
      price: 23990,
      oldPrice: null,
      inStock: true,
      shortDescription: 'Наушники с активным шумоподавлением и Transparency.',
      description: '<p>USB‑C, до 6 часов прослушивания, адаптивное шумоподавление.</p>',
      memory: undefined,
      color: 'White',
      mainImageUrl: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=900&q=80',
      characteristics: {
        'Шумоподавление': 'Active Noise Cancelling',
        'Разъем': 'USB‑C',
        'Совместимость': 'iOS / macOS / Android',
      },
      seoTitle: 'AirPods Pro 2 — i-Remont',
      seoDescription: 'Оригинальные AirPods Pro 2 с шумоподавлением. Быстрая доставка.',
      isFeatured: true,
      gallery: [
        { url: 'https://images.unsplash.com/photo-1585089999182-2910b8e1dda1?auto=format&fit=crop&w=900&q=80', position: 1 },
      ],
    },
  ];

  for (const item of demoProducts) {
    await prisma.product.upsert({
      where: { slug: slugify(item.name) },
      update: {},
      create: {
        ...item,
        slug: slugify(item.name),
        characteristics: item.characteristics,
        images: { create: item.gallery?.map((img, idx) => ({ url: img.url, position: img.position ?? idx })) },
      },
    });
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
