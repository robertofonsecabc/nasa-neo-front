<template>

    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg4>
        <v-card class="elevation-1 pa-3">
          <v-card-text>
            <div class="layout column align-center mb-5">
              <h3>Verificador de fim do mundo!</h3>
            </div>
            <v-tabs v-model="tab">
              <v-tab>Login</v-tab>
              <v-tab>Criar minha conta!</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item key="0">
                <login-form @success="redirect"></login-form>
              </v-tab-item>
              <v-tabs-item v-if="tab==1" key="1">
                <register-form @success="redirect"></register-form>
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
    tab : 0
  }),
  methods:{
    redirect(){
      console.log("recebeu o evento")
      this.$router.push("/dashboard")
    }
  }
}
</script>
