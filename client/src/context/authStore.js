import { create } from 'zustand';
import { authService } from '../services';

export const useAuthStore = create((set) => ({
    user: authService.getCurrentUser(),
    isAuthenticated: !!authService.getCurrentUser(),

    login: async (credentials) => {
        const user = await authService.login(credentials);
        set({ user, isAuthenticated: true });
        return user;
    },

    logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
    },

    setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
