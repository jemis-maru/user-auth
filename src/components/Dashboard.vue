<template>
    <div>
        <container-card>
            <div>
                <h2 class="textCenter">Welcome {{ userDetails.userName }}</h2>
                <div>
                    <p>Your details:</p>
                    <ul>
                        <li>Your name: {{ userDetails.userName }}</li>
                        <li>Email: {{ userDetails.email }}</li>
                        <li>Password: {{ userDetails.password }}</li>
                    </ul>
                </div>
                <div>
                    <p>Want to logout?</p>
                    <custom-button @click="logout">Logout</custom-button>
                </div>
            </div>
        </container-card>
    </div>
</template>

<script>
import CustomButton from './ui/CustomButton.vue';

export default {
    components: {
        'custom-button': CustomButton,
    },
    methods: {
        logout(){
            this.$store.dispatch('logout');
            this.$router.replace('/login');
        },
    },
    computed: {
        userDetails(){
            return this.$store.getters['userDetails'];
        },
    },
}
</script>