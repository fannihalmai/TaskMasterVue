<template>
  <div class="signup">
    <h2>Signup</h2>
    <form @submit.prevent="signup">
      <div>
        <label for="firstname">Firstname:</label>
        <input type="text" id="firstname" v-model="firstName" required>
      </div>
      <div>
        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" v-model="lastName" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="email">Confirm email:</label>
        <input type="email" id="emailConfirm" v-model="emailConfirm" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <label for="password">Confirm password:</label>
        <input type="password" id="passwordConfirm" v-model="passwordConfirm" required>
      </div>
      <v-btn :disabled="!isInputMatching" type="submit">Signup</v-btn>
    </form>
    <p>Already have an account? <router-link to="/">Login</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      emailConfirm: '',
    };
  },
  computed: {
    isInputMatching() {
      return this.password === this.passwordConfirm && this.email === this.emailConfirm && this.email.length>0 && this.password.length>0;
    }
  },
  methods: {
    async signup() {
      const requestBody = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      };
      try {
      const response = await fetch(`${process.env.VUE_APP_BACKEND_API}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        if(response.status == 409){ // conflict as email in use
          alert('Sign up failed, it seems like this email address is already is use !');
        } else {
          alert('Sign up failed, make sure you have entered correct details');
        }
        throw new Error('Signup request failed');
      }
      alert('Signup successful, you can now login.');
      this.$router.push('/login');
      // TODO notify user signup successful
    } catch (error) {
      console.error('Signup error:', error.message);
    }

    },
  }
};
</script>

<style scoped>
.signup {
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
