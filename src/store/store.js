import { createStore } from "vuex";
import auth from './auth/auth.js';

const store = createStore({
    modules: {
        authModule: auth,
    },
});

export default store;