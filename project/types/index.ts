export interface Destination {
  id: string;
  name: string;
  continent: string;
  capital: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  badge?: string;
  greetings?: { [key: string]: string };
} 