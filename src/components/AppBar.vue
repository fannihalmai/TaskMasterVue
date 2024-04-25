<template>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
      >  
        <v-toolbar-title>TASK MASTER </v-toolbar-title>
  
        <v-spacer></v-spacer>

  
        <v-btn icon @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
  
      </v-app-bar>
    </v-card>
  </template>
  <script>
  export default {
    methods: {
      logout(){
        this.$store.dispatch("logout");
        this.$router.push("/");
     }
    }
  }
  </script>