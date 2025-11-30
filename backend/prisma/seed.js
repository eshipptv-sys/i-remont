import { PrismaClient, ProductCategory, Condition } from '@prisma/client';
const prisma = new PrismaClient();
const demoProducts = [
    {
        slug: 'iphone-15-pro-128-titanium',
        name: 'iPhone 15 Pro 128GB Титановый',
        category: ProductCategory.IPHONE,
        brand: 'Apple',
        priceCurrent: 112990,
        priceOld: 119990,
        memory: '128 ГБ',
        color: 'Титановый',
        condition: Condition.NEW,
        isAvailable: true,
        shortDescription: 'Легкий титановый корпус, камера Pro и экран 120 Гц.',
        fullDescription: 'Флагман для тех, кто хочет максимум: мощный чип A17 Pro, аккумулятор на весь день, поддержка eSIM и физической SIM.',
        mainImageUrl: 'https://images.unsplash.com/photo-1695048376956-5ee11ad1ed7e',
        gallery: [
            'https://images.unsplash.com/photo-1695048376956-5ee11ad1ed7e',
            'https://images.unsplash.com/photo-1690906979907-78bd344303e9',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
        ]
    },
    {
        slug: 'iphone-15-256-blue',
        name: 'iPhone 15 256GB Синий',
        category: ProductCategory.IPHONE,
        brand: 'Apple',
        priceCurrent: 96990,
        priceOld: 102990,
        memory: '256 ГБ',
        color: 'Синий',
        condition: Condition.LIKE_NEW,
        isAvailable: true,
        shortDescription: 'Яркий OLED-дисплей, двойная камера и USB‑C.',
        fullDescription: 'Отличный выбор для ежедневных задач: мощный процессор, поддержка 5G и выдающаяся автономность.',
        mainImageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        gallery: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
            'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b'
        ]
    },
    {
        slug: 'iphone-14-pro-512-purple',
        name: 'iPhone 14 Pro 512GB Фиолетовый',
        category: ProductCategory.IPHONE,
        brand: 'Apple',
        priceCurrent: 99990,
        priceOld: 109990,
        memory: '512 ГБ',
        color: 'Фиолетовый',
        condition: Condition.LIKE_NEW,
        isAvailable: true,
        shortDescription: 'Dynamic Island, тройная камера Pro и 512 ГБ для контента.',
        fullDescription: 'Снимайте в ProRAW, записывайте видео в 4K и не переживайте за место: 512 ГБ памяти хватит для всего.',
        mainImageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5',
        gallery: [
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'
        ]
    },
    {
        slug: 'iphone-13-128-starlight',
        name: 'iPhone 13 128GB Сияние',
        category: ProductCategory.IPHONE,
        brand: 'Apple',
        priceCurrent: 57990,
        priceOld: 62990,
        memory: '128 ГБ',
        color: 'Сияние',
        condition: Condition.USED,
        isAvailable: true,
        shortDescription: 'Надежный смартфон на каждый день с двойной камерой.',
        fullDescription: 'Идеально сбалансированный iPhone: яркий экран, быстрый A15 Bionic и поддержка съемки в кинематографическом режиме.',
        mainImageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        gallery: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
            'https://images.unsplash.com/photo-1529612700005-e35377bf1415'
        ]
    },
    {
        slug: 'iphone-se-64-red',
        name: 'iPhone SE 64GB Красный',
        category: ProductCategory.IPHONE,
        brand: 'Apple',
        priceCurrent: 34990,
        priceOld: 38990,
        memory: '64 ГБ',
        color: 'Красный',
        condition: Condition.LIKE_NEW,
        isAvailable: true,
        shortDescription: 'Компактный корпус и мощность A15 по отличной цене.',
        fullDescription: 'Любимый форм‑фактор с кнопкой Touch ID, быстрый процессор и поддержка беспроводной зарядки.',
        mainImageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
        gallery: [
            'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
            'https://images.unsplash.com/photo-1592750475338-74b476aecat0?auto=format&fit=crop&w=600&q=80'
        ]
    },
    {
        slug: 'airpods-pro-2',
        name: 'AirPods Pro 2 с MagSafe',
        category: ProductCategory.AIRPODS,
        brand: 'Apple',
        priceCurrent: 23990,
        priceOld: 26990,
        memory: '—',
        color: 'Белый',
        condition: Condition.NEW,
        isAvailable: true,
        shortDescription: 'Активное шумоподавление и прозрачный режим.',
        fullDescription: 'Наушники, которые всегда с вами: пространственное аудио, 6 часов работы от батареи и чехол с динамиком.',
        mainImageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad',
        gallery: [
            'https://images.unsplash.com/photo-1585386959984-a4155224a1ad',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b'
        ]
    },
    {
        slug: 'apple-watch-series9-starlight',
        name: 'Apple Watch Series 9 Starlight',
        category: ProductCategory.WATCH,
        brand: 'Apple',
        priceCurrent: 44990,
        priceOld: null,
        memory: '64 ГБ',
        color: 'Starlight',
        condition: Condition.NEW,
        isAvailable: true,
        shortDescription: 'Жест двойного касания, яркий экран и быстрая зарядка.',
        fullDescription: 'Отслеживайте спорт, сон и здоровье с новыми датчиками и мощным процессором S9.',
        mainImageUrl: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c',
        gallery: [
            'https://images.unsplash.com/photo-1523475472560-d2df97ec485c',
            'https://images.unsplash.com/photo-1523475472560-6433ff5e4199'
        ]
    },
    {
        slug: 'dyson-v15-detect',
        name: 'Dyson V15 Detect',
        category: ProductCategory.OTHER,
        brand: 'Dyson',
        priceCurrent: 73990,
        priceOld: 79990,
        memory: '—',
        color: 'Желтый',
        condition: Condition.NEW,
        isAvailable: true,
        shortDescription: 'Пылесос с лазерной подсветкой пыли и мощной турбиной.',
        fullDescription: 'Высокая мощность всасывания, умный дисплей и набор насадок для любых задач уборки.',
        mainImageUrl: 'https://images.unsplash.com/photo-1582719478215-2f2df1b5b3c1',
        gallery: [
            'https://images.unsplash.com/photo-1582719478215-2f2df1b5b3c1',
            'https://images.unsplash.com/photo-1523475472560-d2df97ec485c'
        ]
    },
    {
        slug: 'playstation-5-slim',
        name: 'PlayStation 5 Slim',
        category: ProductCategory.OTHER,
        brand: 'Sony',
        priceCurrent: 62990,
        priceOld: 67990,
        memory: '1 ТБ',
        color: 'Белый',
        condition: Condition.NEW,
        isAvailable: true,
        shortDescription: 'Новая ревизия PS5 с тонким корпусом и 1 ТБ памяти.',
        fullDescription: 'Игры нового поколения с трассировкой лучей, 4K HDR и быстрыми загрузками благодаря SSD.',
        mainImageUrl: 'https://images.unsplash.com/photo-1606813902914-9a6c87d52c7b',
        gallery: [
            'https://images.unsplash.com/photo-1606813902914-9a6c87d52c7b',
            'https://images.unsplash.com/photo-1606813902922-7e272f182fbd'
        ]
    }
];
async function main() {
    for (const product of demoProducts) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: product,
            create: product
        });
    }
    console.log(`Seeded ${demoProducts.length} products for i-Remont.`);
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
