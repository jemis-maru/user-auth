<template>
    <div>
        <custom-dialog :isErr="false" :show="!!isRegister" routePath="/login" btnName="Login" title="Register successfully" @close="closeDialog">
            <p>{{ isRegister }}</p>
        </custom-dialog>
        <custom-dialog :show="!!isError" :isErr="true" title="Error" @close="closeDialog">
            <p>{{ isError }}</p>
        </custom-dialog>
        <container-card>
            <h2 class="textCenter">Register</h2>
            <div>
                <form @submit.prevent="submitForm">
                    <div class="form-control">
                        <label for="userName">Name</label>
                        <input type="text" id="userName" :class="{'invalidInput': !isUserNameValid}" v-model.trim="userName"/>
                        <p v-if="!isUserNameValid">Please enter valid name.</p>
                    </div>
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
                    <div class="form-control">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" :class="{'invalidInput': !isBothPasswordMatch}" v-model.trim="confirmPassword"/>
                        <p v-if="!isBothPasswordMatch">Password and Confirm Password doesn't matching.</p>
                    </div>
                    <custom-button>Sign up</custom-button>
                    <p v-if="anyError" class="invalidForm">Please fill the form properly then submit</p>
                    <p>Already Register? Go to <router-link class="linkClass" to="/login">Login</router-link></p>
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
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            anyError: false,
            isRegister: null,
            isError: null,
        };
    },
    methods: {
        async submitForm(){
            this.anyError = false;
            if(!this.isUserNameValid || !this.isEmailValid || !this.isPasswordValid || !this.isBothPasswordMatch){
                this.anyError = true;
                return;
            }
            try{
                await this.$store.dispatch('register', {
                    userName: this.userName,
                    email: this.email,
                    password: this.password,
                });
                this.userName = '';
                this.email = '';
                this.password = '';
                this.confirmPassword = '';
                this.isRegister = 'Go to login';
            }
            catch(err){
                this.userName = '';
                this.email = '';
                this.password = '';
                this.confirmPassword = '';
                this.isError = err.message || 'Something went wrong!';
                console.log(this.isError);
            }
        },
        closeDialog(){
            this.isRegister = null;
            this.isError = null;
        },
    },
    computed: {
        isUserNameValid(){
            const regx = new RegExp(/^[a-zA-Z]{1,}[_ ]{0,1}[a-zA-Z]{1,}[_ ]{0,1}[a-zA-Z]{1,}$/);
            if(this.userName === '' || !regx.test(this.userName)){
                return false;
            }
            return true;
        },
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
        isBothPasswordMatch(){
            if(this.password != this.confirmPassword){
                return false;
            }
            return true;
        },
    },
}
</script>