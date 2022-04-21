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
                console.log(responseData);
            }
            
            console.log(responseData);

            localStorage.setItem('token', responseData.idToken);
            localStorage.setItem('userId', responseData.localId);

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

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
            });
        },
    },
    getters: {
    },
};