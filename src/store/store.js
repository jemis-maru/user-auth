import { createStore } from "vuex";
import auth from './auth/auth.js';
import dashboard from "./dashboard/dashboard.js";

const store = createStore({
    modules: {
        authModule: auth,
        dashboardModule: dashboard,
    },
});

export default store;