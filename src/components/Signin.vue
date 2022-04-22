<template>
    <div>
        <custom-dialog :isErr="false" :show="!!isLogin" routePath="/dashboard" btnName="Dashboard" title="Login successfully" @close="closeDialog">
            <p>{{ isLogin }}</p>
        </custom-dialog>
        <custom-dialog :show="!!isError" :isErr="true" title="Error" @close="closeDialog">
            <p>{{ isError }}</p>
        </custom-dialog>
        <!-- <custom-dialog v-else :isErr="false" :show="!!isLogin" routePath="/login" btnName="Login" title="Login failed" @close="closeDialog">
            <p>Make sure you register.</p>
            <p>Try to login again!</p>
        </custom-dialog> -->
        <container-card>
            <h2 class="textCenter">Login</h2>
            <div>
                <form @submit.prevent="submitForm">
                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="email" id="email" :class="{'invalidInput': !isEmailValid}" v-model.trim="email"/>
                        <p v-if="!isEmailValid">Please enter valid email.</p>
                    </div>
                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" id="password" :class="{'invalidInput': !isPasswordValid}" v-model.trim="password"/>
                        <p v-if="!isPasswordValid">Password length must be greater than or equal to 8.</p>
                    </div>
                    <custom-button>Login</custom-button>
                    <p v-if="anyError" class="invalidForm">Please fill the form properly then submit</p>
                    <p>Not register yet? Go to <router-link class="linkClass" to="/register">Register</router-link></p>
                </form>
            </div>
        </container-card>
    </div>
</template>

<script>
import CustomButton from './ui/CustomButton.vue';
import CustomDialog from './ui/CustomDialog.vue';

export default {
    components: {
        'custom-button': CustomButton,
        'custom-dialog': CustomDialog,
    },
    data(){
        return{
            email: '',
            password: '',
            anyError: false,
            isLogin: null,
            isError: null,
        };
    },
    methods: {
        async submitForm(){
            this.anyError = false;
            if(!this.isEmailValid || !this.isPasswordValid){
                this.anyError = true;
                return;
            }
            try{
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                });
                this.email = '';
                this.password = '';
                this.isLogin = 'Go to Dashboard';
            }
            catch(err){
                this.email = '';
                this.password = '';
                this.isError = err.message || 'Something went wrong!';
                console.log(this.isError);
            }
        },
        closeDialog(){
            this.isLogin = null;
            this.isError = null;
        },
    },
    computed: {
        isEmailValid(){
            const regx = new RegExp(/^[a-zA-Z0-9]{1,}[a-zA-Z0-9.-_]{1,}@[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}[.]{0,1}[a-zA-Z]{0,}$/);
            if(this.email === '' || !regx.test(this.email)){
                return false;
            }
            return true;
        },
        isPasswordValid(){
            if(this.password.length < 8){
                return false;
            }
            return true;
        },
        loginFailed(){
            return this.$store.getters['loginFailed'];
        },
    },
}
</script>