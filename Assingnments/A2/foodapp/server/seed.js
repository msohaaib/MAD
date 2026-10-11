require('dotenv').config();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');
const Reservation = require('./models/Reservation');
const Order = require('./models/Order');

const users = [
  {
    name: 'Ava Chen',
    email: 'customer@bistronova.com',
    password: 'Customer123',
    role: 'customer',
    phone: '0412 000 111',
  },
  {
    name: 'Marcus Hale',
    email: 'manager@bistronova.com',
    password: 'Manager123',
    role: 'manager',
    phone: '0412 000 222',
  },
];

const menuItems = [
  {
    name: 'Burrata & Heirloom Tomato',
    description: 'Creamy burrata, late-summer tomatoes, basil oil, grilled sourdough.',
    price: 18,
    category: 'Starters',
    available: true,
    image: '🍅',
    allergens: ['dairy', 'gluten'],
  },
  {
    name: 'Calamari Fritti',
    description: 'Crisp squid, lemon aioli, chilli salt.',
    price: 19,
    category: 'Starters',
    available: true,
    image: '🦑',
    allergens: ['seafood', 'gluten'],
  },
  {
    name: 'Wild Mushroom Crostini',
    description: 'Thyme butter mushrooms, whipped ricotta, toasted baguette.',
    price: 16,
    category: 'Starters',
    available: true,
    image: '🍄',
    allergens: ['dairy', 'gluten'],
  },
  {
    name: 'Caesar Salad',
    description: 'Cos lettuce, anchovy dressing, parmesan, house croutons.',
    price: 15,
    category: 'Starters',
    available: true,
    image: '🥗',
    allergens: ['dairy', 'gluten', 'egg'],
  },
  {
    name: 'Truffle Tagliatelle',
    description: 'Fresh pasta, black truffle butter, pecorino, cracked pepper.',
    price: 32,
    category: 'Mains',
    available: true,
    image: '🍝',
    allergens: ['dairy', 'gluten', 'egg'],
  },
  {
    name: 'Pan-Seared Salmon',
    description: 'Ocean trout, fennel salad, citrus beurre blanc.',
    price: 36,
    category: 'Mains',
    available: true,
    image: '🐟',
    allergens: ['seafood', 'dairy'],
  },
  {
    name: 'Ribeye Steak',
    description: '300g grass-fed ribeye, café de Paris butter, shoestring fries.',
    price: 48,
    category: 'Mains',
    available: true,
    image: '🥩',
    allergens: ['dairy'],
  },
  {
    name: 'Margherita Pizza',
    description: 'San Marzano tomato, fior di latte, basil, extra virgin olive oil.',
    price: 24,
    category: 'Mains',
    available: true,
    image: '🍕',
    allergens: ['dairy', 'gluten'],
  },
  {
    name: 'Chicken Marsala',
    description: 'Pan-roasted chicken, marsala jus, soft polenta, broccolini.',
    price: 34,
    category: 'Mains',
    available: true,
    image: '🍗',
    allergens: ['dairy'],
  },
  {
    name: 'Mushroom Risotto',
    description: 'Arborio rice, porcini, mascarpone, aged parmesan.',
    price: 28,
    category: 'Mains',
    available: true,
    image: '🍚',
    allergens: ['dairy'],
  },
  {
    name: 'Tiramisu',
    description: 'Espresso-soaked sponge, mascarpone, dark cocoa.',
    price: 14,
    category: 'Desserts',
    available: true,
    image: '🍰',
    allergens: ['dairy', 'gluten', 'egg'],
  },
  {
    name: 'Vanilla Panna Cotta',
    description: 'Set cream, passionfruit, almond crumble.',
    price: 13,
    category: 'Desserts',
    available: true,
    image: '🍮',
    allergens: ['dairy', 'nuts'],
  },
  {
    name: 'Chocolate Fondant',
    description: 'Warm dark chocolate cake, molten centre, vanilla gelato.',
    price: 16,
    category: 'Desserts',
    available: true,
    image: '🍫',
    allergens: ['dairy', 'gluten', 'egg'],
  },
  {
    name: 'House Red Wine',
    description: 'Glass of the weekly Italian red, medium body.',
    price: 12,
    category: 'Drinks',
    available: true,
    image: '🍷',
    allergens: ['sulphites'],
  },
  {
    name: 'Espresso Martini',
    description: 'Vodka, house espresso, coffee liqueur, chocolate bitters.',
    price: 18,
    category: 'Drinks',
    available: true,
    image: '🍸',
    allergens: [],
  },
  {
    name: 'Fresh Lemonade',
    description: 'Pressed lemon, mint, soda, a touch of honey.',
    price: 7,
    category: 'Drinks',
    available: true,
    image: '🍋',
    allergens: [],
  },
  {
    name: 'Sparkling Water',
    description: 'Chilled mineral water, served with citrus.',
    price: 5,
    category: 'Drinks',
    available: true,
    image: '💧',
    allergens: [],
  },
];

const tables = [
  { number: 1, seats: 2, location: 'Window' },
  { number: 2, seats: 2, location: 'Indoor' },
  { number: 3, seats: 4, location: 'Indoor' },
  { number: 4, seats: 4, location: 'Patio' },
  { number: 5, seats: 6, location: 'Indoor' },
  { number: 6, seats: 8, location: 'Patio' },
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not set');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Promise.all([
      User.deleteMany({}),
      MenuItem.deleteMany({}),
      Table.deleteMany({}),
      Reservation.deleteMany({}),
      Order.deleteMany({}),
    ]);

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);
    await MenuItem.insertMany(menuItems);
    await Table.insertMany(tables);

    console.log(`Seeded ${hashedUsers.length} users, ${menuItems.length} menu items, ${tables.length} tables`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
