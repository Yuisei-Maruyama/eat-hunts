import { Restaurant, CuisineType } from "@/types";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Sakura Sushi",
    description:
      "Authentic Japanese sushi restaurant with fresh ingredients imported daily from Tokyo's fish market. Our master chef has over 20 years of experience crafting the perfect sushi experience.",
    cuisine: "Japanese",
    rating: 4.7,
    priceLevel: 3,
    address: "123 Cherry Blossom St, Tokyo District",
    coordinates: {
      latitude: 35.6895,
      longitude: 139.6917,
    },
    photos: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1000",
      "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1000",
    ],
    hours: {
      Monday: "11:30 AM - 10:00 PM",
      Tuesday: "11:30 AM - 10:00 PM",
      Wednesday: "11:30 AM - 10:00 PM",
      Thursday: "11:30 AM - 10:00 PM",
      Friday: "11:30 AM - 11:00 PM",
      Saturday: "12:00 PM - 11:00 PM",
      Sunday: "12:00 PM - 9:00 PM",
    },
    phone: "+81-3-1234-5678",
    website: "https://sakurasushi.example.com",
    tags: ["sushi", "omakase", "sake", "traditional"],
  },
  {
    id: "2",
    name: "Pasta Paradise",
    description:
      "Family-owned Italian restaurant serving homemade pasta and wood-fired pizzas. Our recipes have been passed down for generations, bringing the authentic taste of Italy to your table.",
    cuisine: "Italian",
    rating: 4.5,
    priceLevel: 2,
    address: "456 Olive Garden Ave, Little Italy",
    coordinates: {
      latitude: 35.6805,
      longitude: 139.7026,
    },
    photos: [
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000",
      "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=1000",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000",
    ],
    hours: {
      Monday: "Closed",
      Tuesday: "5:00 PM - 10:00 PM",
      Wednesday: "5:00 PM - 10:00 PM",
      Thursday: "5:00 PM - 10:00 PM",
      Friday: "5:00 PM - 11:00 PM",
      Saturday: "12:00 PM - 11:00 PM",
      Sunday: "12:00 PM - 9:00 PM",
    },
    phone: "+1-555-123-4567",
    website: "https://pastaparadise.example.com",
    tags: ["pasta", "pizza", "wine", "tiramisu"],
  },
  {
    id: "3",
    name: "Spice Route",
    description:
      "Award-winning Indian cuisine featuring regional specialties from across the subcontinent. Our spice blends are made in-house daily for the most authentic flavors.",
    cuisine: "Indian",
    rating: 4.8,
    priceLevel: 2,
    address: "789 Curry Lane, Spice District",
    coordinates: {
      latitude: 35.6625,
      longitude: 139.712,
    },
    photos: [
      "https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=1000",
      "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?q=80&w=1000",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000",
    ],
    hours: {
      Monday: "11:30 AM - 10:00 PM",
      Tuesday: "11:30 AM - 10:00 PM",
      Wednesday: "11:30 AM - 10:00 PM",
      Thursday: "11:30 AM - 10:00 PM",
      Friday: "11:30 AM - 11:00 PM",
      Saturday: "12:00 PM - 11:00 PM",
      Sunday: "12:00 PM - 10:00 PM",
    },
    phone: "+1-555-987-6543",
    website: "https://spiceroute.example.com",
    tags: ["curry", "tandoori", "naan", "spicy"],
  },
  {
    id: "4",
    name: "Taco Fiesta",
    description:
      "Vibrant Mexican taqueria serving street-style tacos and fresh margaritas. Our corn tortillas are made fresh daily and all salsas are prepared in-house.",
    cuisine: "Mexican",
    rating: 4.3,
    priceLevel: 1,
    address: "101 Salsa Street, Taco Town",
    coordinates: {
      latitude: 35.67,
      longitude: 139.76,
    },
    photos: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1000",
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=1000",
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1000",
    ],
    hours: {
      Monday: "11:00 AM - 9:00 PM",
      Tuesday: "11:00 AM - 9:00 PM",
      Wednesday: "11:00 AM - 9:00 PM",
      Thursday: "11:00 AM - 9:00 PM",
      Friday: "11:00 AM - 11:00 PM",
      Saturday: "11:00 AM - 11:00 PM",
      Sunday: "11:00 AM - 9:00 PM",
    },
    phone: "+1-555-789-0123",
    website: "https://tacofiesta.example.com",
    tags: ["tacos", "margaritas", "guacamole", "casual"],
  },
  {
    id: "5",
    name: "Le Petit Bistro",
    description:
      "Charming French bistro offering classic dishes in an intimate setting. Our chef trained in Paris and brings authentic techniques to every dish.",
    cuisine: "French",
    rating: 4.9,
    priceLevel: 4,
    address: "202 Champs-Élysées, French Quarter",
    coordinates: {
      latitude: 35.655,
      longitude: 139.72,
    },
    photos: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000",
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1000",
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1000",
    ],
    hours: {
      Monday: "Closed",
      Tuesday: "6:00 PM - 10:00 PM",
      Wednesday: "6:00 PM - 10:00 PM",
      Thursday: "6:00 PM - 10:00 PM",
      Friday: "6:00 PM - 11:00 PM",
      Saturday: "5:00 PM - 11:00 PM",
      Sunday: "5:00 PM - 9:00 PM",
    },
    phone: "+1-555-456-7890",
    website: "https://lepetitbistro.example.com",
    tags: ["escargot", "coq au vin", "wine", "elegant"],
  },
  {
    id: "6",
    name: "Seoul Kitchen",
    description:
      "Modern Korean restaurant specializing in BBQ and traditional dishes with a contemporary twist. Our tabletop grills provide an interactive dining experience.",
    cuisine: "Korean",
    rating: 4.6,
    priceLevel: 3,
    address: "303 Gangnam Way, K-Town",
    coordinates: {
      latitude: 35.69,
      longitude: 139.7,
    },
    photos: [
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1000",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1000",
      "https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=1000",
    ],
    hours: {
      Monday: "5:00 PM - 10:30 PM",
      Tuesday: "5:00 PM - 10:30 PM",
      Wednesday: "5:00 PM - 10:30 PM",
      Thursday: "5:00 PM - 10:30 PM",
      Friday: "5:00 PM - 12:00 AM",
      Saturday: "12:00 PM - 12:00 AM",
      Sunday: "12:00 PM - 10:00 PM",
    },
    phone: "+1-555-234-5678",
    website: "https://seoulkitchen.example.com",
    tags: ["bbq", "kimchi", "bibimbap", "soju"],
  },
  {
    id: "7",
    name: "Green Garden",
    description:
      "Plant-based restaurant serving creative vegan dishes using locally-sourced organic ingredients. Our seasonal menu changes monthly to showcase the freshest produce.",
    cuisine: "Vegan",
    rating: 4.4,
    priceLevel: 2,
    address: "404 Sprout Street, Green District",
    coordinates: {
      latitude: 35.675,
      longitude: 139.74,
    },
    photos: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000",
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000",
    ],
    hours: {
      Monday: "11:00 AM - 8:00 PM",
      Tuesday: "11:00 AM - 8:00 PM",
      Wednesday: "11:00 AM - 8:00 PM",
      Thursday: "11:00 AM - 8:00 PM",
      Friday: "11:00 AM - 9:00 PM",
      Saturday: "10:00 AM - 9:00 PM",
      Sunday: "10:00 AM - 8:00 PM",
    },
    phone: "+1-555-876-5432",
    website: "https://greengarden.example.com",
    tags: ["vegan", "organic", "gluten-free", "sustainable"],
  },
  {
    id: "8",
    name: "Coastal Catch",
    description:
      "Seafood restaurant with panoramic ocean views and the freshest daily catch. Our relationships with local fishermen ensure we serve only the highest quality seafood.",
    cuisine: "Seafood",
    rating: 4.7,
    priceLevel: 3,
    address: "505 Harbor Drive, Seaside",
    coordinates: {
      latitude: 35.66,
      longitude: 139.77,
    },
    photos: [
      "https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=1000",
      "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=1000",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1000",
    ],
    hours: {
      Monday: "Closed",
      Tuesday: "5:00 PM - 10:00 PM",
      Wednesday: "5:00 PM - 10:00 PM",
      Thursday: "5:00 PM - 10:00 PM",
      Friday: "5:00 PM - 11:00 PM",
      Saturday: "12:00 PM - 11:00 PM",
      Sunday: "12:00 PM - 9:00 PM",
    },
    phone: "+1-555-345-6789",
    website: "https://coastalcatch.example.com",
    tags: ["seafood", "oysters", "lobster", "oceanview"],
  },
];

export const cuisineTypes: CuisineType[] = [
  "Japanese",
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "Thai",
  "American",
  "French",
  "Korean",
  "Mediterranean",
  "Vegan",
  "Seafood",
  "Bakery",
  "Cafe",
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find((restaurant) => restaurant.id === id);
};

export const getRestaurantsByCuisine = (cuisine: string): Restaurant[] => {
  return restaurants.filter(
    (restaurant) => restaurant.cuisine.toLowerCase() === cuisine.toLowerCase()
  );
};

export const getRestaurantsByIds = (ids: string[]): Restaurant[] => {
  return restaurants.filter((restaurant) => ids.includes(restaurant.id));
};
