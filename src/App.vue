<template>
  <custom-dialog :show="isSessionExpired" :isErr="true" title="Session Expired!" @close="closeDialog">
      <p>Login again!</p>
  </custom-dialog>
  <router-view></router-view>
</template>

<script>
import CustomDialog from './components/ui/CustomDialog.vue';

export default {
  name: 'App',
  components: {
    'custom-dialog': CustomDialog,
  },
  data(){
    return{
      isSessionExpired: false,
    };
  },
  methods: {
    closeDialog(){
        this.isSessionExpired = false;
    },
  },
  computed: {
    didAutoLogout(){
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curVal, oldVal){
      if(curVal && curVal != oldVal){
        this.$router.replace('/login');
        this.isSessionExpired = true;
      }
    },
  },
  created(){
    this.$store.dispatch('autoLogin');
  },
}
</script>

<style>
.textCenter{
  text-align: center;
}

form {
  margin: 1rem;
  padding: 1rem;
}

.invalidForm, .form-control p {
  color: #ff0000;
}

.form-control p {
  margin: 0;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  background-color: #f5f3f3;
  outline: none;
}

.invalidInput{
  border: 1px solid #ff0000;
}

.linkClass {
  text-decoration: none;
  color: #2727a7;
}
</style>
