import { User } from "@/types";

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    profileImage:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400",
    savedRestaurants: ["1", "3", "5"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    savedRestaurants: ["2", "4", "6"],
  },
];

export const getCurrentUser = (): User => {
  // In a real app, this would check authentication state
  return users[0];
};
