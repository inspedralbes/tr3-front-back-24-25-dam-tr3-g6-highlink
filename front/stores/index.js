import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        user: {},
        token: "",
        stats: "stopped"
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        getUser() {
            return this.user;
        },
        setToken(token) {
            this.token = token;
        },
        getToken() {
            return this.token;
        },
        setStats(stats) {
            this.stats = stats;
        },
        getStats() {
            return this.stats;
        },
        logout() {
            this.user = {};
            this.token = "";
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});