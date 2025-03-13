import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        user: {},
        config: {},
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        getUser() {
            return this.user;
        },
        setConfig(config) {
            this.config = config;
        },
        getConfig() {
            return this.config;
        }
    }
});