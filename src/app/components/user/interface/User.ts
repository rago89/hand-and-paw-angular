export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  website: string;
  avatar: { data: string; contentType: string };
  favorites: string[];
  publicAccess?: {
    monday?: {
      access: string;
      hours: string;
    };
    tuesday?: {
      access: string;
      hours: string;
    };
    wednesday?: {
      access: string;
      hours: string;
    };
    thursday?: {
      access: string;
      hours: string;
    };
    friday?: {
      access: string;
      hours: string;
    };
    saturday?: {
      access: string;
      hours: string;
    };
    sunday?: {
      access: string;
      hours: string;
    };
  };
  registeredAnimals: string[];
}
