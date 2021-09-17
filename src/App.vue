<template>

  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat
    >
      <v-tabs
          centered
          class="ml-n9"
          color="grey darken-1"
      >
        <v-tab to="/">
          Home
        </v-tab>
        <v-tab to="/dashboard" v-if="isAuthenticated">
          Dashboard
        </v-tab>
        <v-tab to="/login" v-else>
          Login
        </v-tab>
        <v-tab to="/logout" v-if="isAuthenticated">
          Sair
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3 mt-4">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>

</template>

<script>

import LoginService from "@/services/LoginService";

export default {
  name: "App",
  data : ()=>({
    toggle : false,
  }),
  computed : {
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    },
    username(){
      return this.$store.getters.username
    }
  },
  mounted() {
    LoginService.checkAuthentication()
  }
}
</script>
