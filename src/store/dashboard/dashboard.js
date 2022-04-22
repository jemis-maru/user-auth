export default {
    namespaced: true,
    state(){
        return{
            userInfo: {},
        };
    },
    mutations: {
        setUserInfo(state, payload){
            state.userInfo = payload;
        },
    },
    actions: {
        async fetchUserData(context){
            const userId = context.rootGetters.userId;
            console.log(userId);
            const response = await fetch(process.env.VUE_APP_SERVER_URL + `users/${userId}.json`);
            const responseData = await response.json();
            if(!response.ok){
                console.log(responseData);
            }
            console.log(responseData);
            let userData = {};
            for(let user in responseData){
                console.log(responseData[user]);
                userData = responseData[user];
            }
            context.commit('setUserInfo', userData);
        }
    },
    getters: {
        userDetails(state){
            return state.userInfo;
        },
    },
};