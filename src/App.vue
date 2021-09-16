<template>
  <v-app>
    <v-container fluid>

      <!-- Barra superior -->
      <v-toolbar v-if="isAuthenticated" flat>
        <v-toolbar-title>
          <v-btn icon elevation="0" small @click="toggle=!toggle">
            <v-icon>mdi-menu-open</v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu class="toolbar-menu-item" offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" small v-bind="attrs" v-on="on" >
              <v-icon small>mdi-widgets</v-icon>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="400" tile>
            <v-card-subtitle>Olá, {{ username }}</v-card-subtitle>
            <v-list dense>
              <v-list-item-group>
                <v-list-item to="/logout">
                  <v-list-item-icon>
                    <v-icon>mdi-logout-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Sair</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar>


      <!-- Navegação -->
      <!-- <Menu v-if="isAuthenticated"></Menu> -->

      <div>
        <router-link to="/login">Login</router-link>
        <router-link to="/logout">Logout</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/">Home</router-link>
      </div>

      <v-main>
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>

import LoginService from "@/services/LoginService";

export default {
  name: "App",
  data : ()=>({
    toggle : false
  }),
  computed : {
    isAuthenticated(){
      return true //!this.$store.getters.isAuthenticated
    },
    username(){
      return "maria@maria.com" //this.$store.getters.username
    }
  },
  methods : {
    /**
     * Não precisamos mais usar aqui porque verificamos antes do dashboard
     */
    checkAuthentication(){
      if( !LoginService.checkAuthentication() ){
        this.$router.push("/login")
      }
    }
  },
  mounted() {
    // this.checkAuthentication()
  }
}
</script>
