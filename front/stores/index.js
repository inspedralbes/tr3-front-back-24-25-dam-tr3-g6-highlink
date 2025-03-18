import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        user: {},
        token: "",
        config: {},
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
        setConfig(config) {
            this.config = config;
        },
        getConfig() {
            return this.config;
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