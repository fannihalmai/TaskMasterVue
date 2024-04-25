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
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Signup</button>
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
      password: ''
    };
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
      const response = await fetch('http://localhost:3000/users', {
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
      this.$router.push('/');
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
