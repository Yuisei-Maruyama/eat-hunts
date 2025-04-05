import { Station } from "@/types";

export const stations: Station[] = [
  {
    id: "1",
    name: "Tokyo Station",
    coordinates: {
      latitude: 35.6812,
      longitude: 139.7671,
    },
  },
  {
    id: "2",
    name: "Shibuya Station",
    coordinates: {
      latitude: 35.658,
      longitude: 139.7016,
    },
  },
  {
    id: "3",
    name: "Shinjuku Station",
    coordinates: {
      latitude: 35.6896,
      longitude: 139.7006,
    },
  },
  {
    id: "4",
    name: "Ikebukuro Station",
    coordinates: {
      latitude: 35.7295,
      longitude: 139.7109,
    },
  },
  {
    id: "5",
    name: "Ueno Station",
    coordinates: {
      latitude: 35.7141,
      longitude: 139.7774,
    },
  },
  {
    id: "6",
    name: "Akihabara Station",
    coordinates: {
      latitude: 35.698,
      longitude: 139.7687,
    },
  },
  {
    id: "7",
    name: "Ginza Station",
    coordinates: {
      latitude: 35.6699,
      longitude: 139.7636,
    },
  },
  {
    id: "8",
    name: "Roppongi Station",
    coordinates: {
      latitude: 35.6641,
      longitude: 139.7294,
    },
  },
];

export const getStationById = (id: string): Station | undefined => {
  return stations.find((station) => station.id === id);
};

export const getStationByName = (name: string): Station | undefined => {
  return stations.find((station) =>
    station.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const getNearbyStations = (
  latitude: number,
  longitude: number,
  radius: number = 5
): Station[] => {
  // Simple distance calculation (not accurate for large distances)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  return stations.filter((station) => {
    const distance = calculateDistance(
      latitude,
      longitude,
      station.coordinates.latitude,
      station.coordinates.longitude
    );
    return distance <= radius;
  });
};
