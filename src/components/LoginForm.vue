<template>
  <v-form>
    <v-text-field
        v-model="credential.username"
        label="Login"
        hint="Digite seu e-mail de acesso"
    ></v-text-field>
    <v-text-field
        v-model="credential.password"
        :append-icon="credential.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        label="Digite sua senha"
        hint="Ao menos 8 caracteres"
        counter
        @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-btn block color="primary" @click="authorize" :loading="loading">Login</v-btn>
  </v-form>
</template>

<script>
import ApiService from "@/services/ApiService";
import LoginService from "@/services/LoginService";

export default {
  name: "LoginForm",
  data: function (){
    return {
      credential : {
        username : "",
        password : "",
      },
      showPassword: false,
      rules:{
        required: value => !!value || 'Campo requerido.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      loading : false,
    }
  },
  computed: {
  },
  methods: {
    authorize(){
      this.loading = true
      ApiService.login(this.credential).then(res=>{
        console.log("emitir evento: success")
        LoginService.login( res.data )

        this.$emit("success")
      }).catch(e=>{
        console.log("erro", e)
        this.$emit("error")
        alert('Erro no login')
      }).finally(()=>{
        this.loading = false
      })
    },
  }
}
</script>

<style scoped>

</style>
