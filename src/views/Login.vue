<template>

    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg4>
        <v-card class="elevation-1 pa-3">
          <v-card-text>
            <div class="layout column align-center">
              Login
            </div>
            <login-form @success="redirect" ></login-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  name: "Login",
  components: {LoginForm},
  data : ()=>({
  }),
  methods:{
    redirect(){
      console.log("recebeu o evento")
      this.$router.push("/dashboard")
    }
  }
}
</script>
