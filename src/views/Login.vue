<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Signup</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch((error) => {
          alert('Login failed, make sure you have entered correct details or create an account!');
          console.error('Login error', error);
        });
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 200px auto;
}
form {
  margin-top: 20px;
}
div {
  margin-bottom: 10px;
}
input {
  width: 100%;
  padding: 8px;
  background-color: #f4f4f4; /* Grey background color */
  border: 1px solid #ddd; /* Grey border */
}
button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
