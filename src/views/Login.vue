<template>
    <v-layout align-center justify-center class="mt-10 pt-10">
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="elevation-0 pa-3">
          <v-card-text>
            <div class="layout column align-center mb-5">
              <h3 @click="toLogin('oi')" >Verificador de fim do mundo!</h3>
            </div>
            <v-tabs v-model="tab">
              <v-tab>Login</v-tab>
              <v-tab>Criar minha conta!</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item key="0">
                <login-form :username="username" @success="redirect"></login-form>
              </v-tab-item>
              <v-tabs-item v-if="tab==1" key="1">
                <register-form @success="toLogin"></register-form>
              </v-tabs-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

</template>

<script>
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
export default {
  name: "Login",
  components: {LoginForm, RegisterForm},
  data : ()=>({
    tab : 0,
    username : null
  }),
  methods:{
    redirect(){
      console.log("recebeu o evento")
      this.$router.push("/dashboard")
    },
    toLogin(username){
      console.log('Registered', username)
      this.tab=0
      this.username = username
    }
  }
}
</script>
