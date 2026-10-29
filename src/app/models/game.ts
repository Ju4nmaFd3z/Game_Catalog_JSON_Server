export interface Game {
  id: number;
  title: string;
  genre: string;
  platform: string;
  price: number;
}

export interface GameFilters {
  genre: string;
  platform: string;
  title: string;
  minPrice: string;
  maxPrice: string;
}
