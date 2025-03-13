import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        // user: JSON.parse(localStorage.getItem('user')) || {},
        // token: localStorage.getItem('token') || "",
        user: {},
        token: "",
        config: {},
    }),
    actions: {
        setUser(user) {
            this.user = user;
            // localStorage.setItem('user', JSON.stringify(user));
        },
        getUser() {
            return this.user;
        },
        setToken(token) {
            this.token = token;
            // localStorage.setItem('token', token);
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
        logout() {
            this.user = {};
            this.token = "";
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});