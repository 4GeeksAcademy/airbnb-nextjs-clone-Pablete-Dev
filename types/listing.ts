export type Listing = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  badge?: string;
  price: number;
  currency: "CLP";
  nights: number;
  rating: number;
};