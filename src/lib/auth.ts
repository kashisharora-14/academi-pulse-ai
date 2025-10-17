interface User {
  id: string;
  email: string;
  role: string;
}

const AUTH_STORAGE_KEY = 'nedp_auth';

export const authHelpers = {
  login: (email: string, role: string): User => {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      role,
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  },
  
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
  
  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },
  
  isAuthenticated: (): boolean => {
    return authHelpers.getCurrentUser() !== null;
  },
};
