const foods = [
  // Pizza
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh tomato sauce, mozzarella cheese, and basil leaves on a thin crust.',
    category: 'Pizza',
    price: 249,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Loaded with premium pepperoni slices, mozzarella cheese, and zesty tomato sauce.',
    category: 'Pizza',
    price: 299,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Paneer Tikka Pizza',
    description: 'Indian-style pizza topped with marinated paneer, bell peppers, onions and tangy tikka sauce.',
    category: 'Pizza',
    price: 279,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    isAvailable: true,
  },

  // Burger
  {
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, onion, pickles and our special sauce in a toasted bun.',
    category: 'Burger',
    price: 179,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Crispy Chicken Burger',
    description: 'Golden fried chicken fillet with coleslaw, jalapeños and mayo in a soft brioche bun.',
    category: 'Burger',
    price: 199,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Veggie Delight Burger',
    description: 'Crispy veggie patty with fresh veggies, cheese slice, and garlic aioli.',
    category: 'Burger',
    price: 149,
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=300&fit=crop',
    isAvailable: true,
  },

  // Indian
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, creamy tomato-based gravy with aromatic spices. Served with naan.',
    category: 'Indian',
    price: 249,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in a smooth, buttery tomato gravy. A vegetarian classic.',
    category: 'Indian',
    price: 219,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils and kidney beans in a smoky, buttery gravy. Comfort food at its best.',
    category: 'Indian',
    price: 189,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    isAvailable: true,
  },

  // Chinese
  {
    name: 'Veg Hakka Noodles',
    description: 'Stir-fried noodles tossed with fresh vegetables, soy sauce, and sesame oil.',
    category: 'Chinese',
    price: 159,
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Chicken Fried Rice',
    description: 'Wok-tossed rice with chicken, eggs, spring onions, soy sauce and Chinese spices.',
    category: 'Chinese',
    price: 189,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Manchurian (Dry)',
    description: 'Crispy veggie balls tossed in a tangy, spicy Manchurian sauce. A popular Indo-Chinese snack.',
    category: 'Chinese',
    price: 149,
    image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400&h=300&fit=crop',
    isAvailable: true,
  },

  // Biryani
  {
    name: 'Hyderabadi Chicken Biryani',
    description: 'Aromatic basmati rice layered with spiced chicken, caramelized onions, and saffron.',
    category: 'Biryani',
    price: 299,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Mutton Biryani',
    description: 'Slow-cooked tender mutton pieces with fragrant rice, whole spices, and fried onions.',
    category: 'Biryani',
    price: 349,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with seasonal vegetables, saffron, and whole spices.',
    category: 'Biryani',
    price: 199,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    isAvailable: true,
  },

  // Dessert
  {
    name: 'Gulab Jamun',
    description: 'Soft, melt-in-your-mouth milk solid dumplings soaked in rose-flavored sugar syrup.',
    category: 'Dessert',
    price: 99,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey molten center. Served with a scoop of vanilla ice cream.',
    category: 'Dessert',
    price: 149,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    isAvailable: true,
  },

  // Beverages
  {
    name: 'Mango Lassi',
    description: 'Chilled yogurt-based drink blended with sweet Alphonso mangoes. Refreshing and creamy.',
    category: 'Beverages',
    price: 79,
    image: 'https://images.unsplash.com/photo-1527657304178-d4e6caf7f893?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Fresh Lime Soda',
    description: 'Freshly squeezed lime juice with chilled soda water, a hint of salt and sugar.',
    category: 'Beverages',
    price: 59,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    isAvailable: true,
  },
  {
    name: 'Cold Coffee',
    description: 'Creamy blended cold coffee with milk, ice cream and a drizzle of chocolate syrup.',
    category: 'Beverages',
    price: 99,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    isAvailable: true,
  },
];

module.exports = foods;
