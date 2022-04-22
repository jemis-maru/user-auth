export default {
    state(){
        return{
            userId: null,
            token: null,
        };
    },
    mutations: {
        setUser(state, payload){
            state.token = payload.token;
            state.userId = payload.userId;
            console.log(state.token);
            console.log(state.userId);
        },
    },
    actions: {
        async register(context, payload){
            let serverUrl = process.env.VUE_APP_SIGNUP_URL;
            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                }),
            });

            const responseData = await response.json();
            
            if(!response.ok){
                console.log(responseData.error.message);
                let errMsg = responseData.error.message.replace(/_/gi, " ");
                const error = new Error(errMsg || 'Authentication failed!');
                throw error;
            }
            
            console.log(responseData);

            const response1 = await fetch(process.env.VUE_APP_SERVER_URL + `users/${responseData.localId}.json?auth=${responseData.idToken}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: payload.userName,
                    email: payload.email,
                }),
              });
      
            const responseData1 = await response1.json();
    
            console.log(responseData1);
        },
        async login(context, payload){
            let serverUrl = process.env.VUE_APP_LOGIN_URL;
            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                }),
            });

            const responseData = await response.json();
            
            if(!response.ok){
                console.log(responseData.error.message);
                let errMsg = responseData.error.message.replace(/_/gi, " ");
                const error = new Error(errMsg || 'Authentication failed!');
                throw error;
            }
            
            console.log(responseData);
           
            localStorage.setItem('token', responseData.idToken);
            localStorage.setItem('userId', responseData.localId);

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
            });
        },
        autoLogin(context){
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if(token && userId){
                context.commit('setUser', {
                    token: token,
                    userId: userId,
                });
            }
        },
        logout(context){
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            context.commit('setUser', {
                token: null,
                userId: null,
            });
        },
    },
    getters: {
        isAuth(state){
            console.log(!!state.token);
            return !!state.token;
        },
        userId(state){
            return state.userId;
        },
    },
};