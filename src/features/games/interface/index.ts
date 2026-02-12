import { SelectOption } from "@/src/components/AdvancedSelect/AdvancedSelect";

export interface Game {
  id: number;
  name: string;
  genres: string[];
  released: string; 
  rating: number;
  background_image?: string;
}

export interface GameFilters {
  searchQuery: string;
  selectedGenres: SelectOption[];
  selectedYear: SelectOption | null;
  minRating: number;
}
