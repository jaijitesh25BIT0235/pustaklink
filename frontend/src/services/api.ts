const API_BASE_URL = 'http://localhost:8000';

// Types based on the backend models
export interface User {
  id: number;
  email: string;
  full_name: string;
  college: string;
  created_at: string;
}

export interface BookInfo {
  title: string;
  authors: string[];
  publish_date?: string;
  publishers?: string[];
  number_of_pages?: number;
  isbn: string;
}

export interface Listing {
  id: number;
  isbn: string;
  price: number;
  condition: string;
  subject: string;
  semester: number;
  edition: number;
  description?: string;
  images?: string[];
  location: string;
  seller: User;
  created_at: string;
  is_active: boolean;
}

export interface CreateListingData {
  isbn: string;
  price: number;
  condition: string;
  subject: string;
  semester: number;
  edition: number;
  description?: string;
  images?: string[];
  location: string;
}

export interface LoginData {
  username: string; // email for backend
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  full_name: string;
  college: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    // Try to get token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private getFormHeaders(): HeadersInit {
    const headers: HeadersInit = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  async signup(data: SignupData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }

    return response.json();
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getFormHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const authResponse = await response.json();
    this.setToken(authResponse.access_token);
    return authResponse;
  }

  async getBookInfo(isbn: string): Promise<BookInfo> {
    const response = await fetch(`${API_BASE_URL}/isbn/${isbn}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      const error = await response.json();
      throw new Error(error.detail || 'Book not found');
    }

    return response.json();
  }

  async createListing(data: CreateListingData): Promise<Listing> {
    const response = await fetch(`${API_BASE_URL}/listing`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('You have exceeded the maximum of 5 listings per day');
      }
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create listing');
    }

    return response.json();
  }

  async getListings(params: {
    college?: string;
    subject?: string;
    semester?: number;
    price_min?: number;
    price_max?: number;
    condition?: string;
    edition?: number;
    sort?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Listing[]> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/listings?${searchParams}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch listings');
    }

    return response.json();
  }

  async getListing(listingId: number): Promise<Listing> {
    const response = await fetch(`${API_BASE_URL}/listing/${listingId}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Listing not found');
    }

    return response.json();
  }

  async reportListing(listingId: number, reason: string, description?: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/report`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        listing_id: listingId,
        reason,
        description,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to report listing');
    }

    return response.json();
  }

  logout() {
    this.clearToken();
  }
}

export const apiService = new ApiService();