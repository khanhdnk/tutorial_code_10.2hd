// store/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: {
            id: '',
            username: '',
            email: '',
            // Add other user information here
        },
    }),
    actions: {
        login(userData) {
            this.isAuthenticated = true;
            this.user = { ...userData };
        },
        logout() {
            this.isAuthenticated = false;
            this.user = {
                id: '',
                username: '',
                email: '',
                // Reset other user information here
            };
        },
        //update user's data
        updateUser(userData) {
            this.user = { ...this.user, ...userData};
        },
    },
    persist: {
        enabled: true,
    },
});
