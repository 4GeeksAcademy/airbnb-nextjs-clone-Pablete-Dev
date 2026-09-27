export type RoomImage = {
  src: string;
  alt: string;
};

export type RoomAmenity = {
  id: string;
  icon: "key" | "pool" | "location" | "wifi" | "kitchen";
  title: string;
  description: string;
};

export type RoomDetails = {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  host: {
    name: string;
    avatarSrc: string;
    avatarAlt: string;
    hostingDuration: string;
  };
  images: RoomImage[];
  amenities: RoomAmenity[];
  booking: {
    currentPrice: number;
    previousPrice: number;
    nights: number;
    dates: string;
    minimumGuests: number;
    maximumGuests: number;
  };
};