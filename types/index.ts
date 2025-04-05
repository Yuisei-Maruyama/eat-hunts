export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  priceLevel: 1 | 2 | 3 | 4; // $ to $$$$
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  photos: string[];
  hours: {
    [key: string]: string;
  };
  phone?: string;
  website?: string;
  tags: string[];
  savedAt?: string;
}

export interface Station {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  savedRestaurants: string[];
}

export type CuisineType =
  | "Japanese"
  | "Italian"
  | "Chinese"
  | "Mexican"
  | "Indian"
  | "Thai"
  | "American"
  | "French"
  | "Korean"
  | "Mediterranean"
  | "Vegan"
  | "Seafood"
  | "Bakery"
  | "Cafe";
