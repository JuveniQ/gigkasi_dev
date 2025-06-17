export type review = {
    id: string,
    reviewer: string,
    rating: number,
    comment: string,
    date: string,
}

export type service = {
    id: string,
    title: string,
    category: string,
    description: string,
    price: string,
    icon: string,
}
export type request = {
    id: string,
    title: string,
    category: string,
    status: 'COMPLETED' | 'PENDING' | 'DELETED' | null,
    date: string,
    provider?: string, 
    responses?: number,
}

export type qualification = {
    id: string,
    name: string,
    fileUrl: string
}

export type portfolio = {
    id: string,
    title: string,
    imageUrl: string,
}

export interface User {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  imageUrl?: string;
  rating: number;
  verified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  joinDate: string;
  status: string;
  location?: string;
  bio?: string;
  isAuthenticated: boolean;
  loading;
}

export interface UserContextType extends User {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (info: Partial<User>) => void;
}
