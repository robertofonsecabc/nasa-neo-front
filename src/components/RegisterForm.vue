<template>
  <v-form>
    <v-text-field
        v-model="credential.username"
        label="Login"
        hint="Digite seu e-mail"
    ></v-text-field>
    <v-text-field
        v-model="credential.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        label="Digite sua senha"
        hint="Ao menos 8 caracteres"
        counter
        @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-text-field
        v-model="credential.passwordConfirmation"
        :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPasswordConfirmation ? 'text' : 'password'"
        label="Confirme sua senha"
        hint="Ao menos 8 caracteres"
        counter
        @click:append="showPasswordConfirmation = !showPasswordConfirmation"
    ></v-text-field>
    <v-btn block color="primary" @click="authorize" :loading="loading">Registrar</v-btn>
  </v-form>
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  name: "RegisterForm",
  data: function (){
    return {
      loading : false,
      showPassword: false,
      showPasswordConfirmation: false,
      rules:{
        required: value => !!value || 'Campo requerido.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      credential : {
        username : "",
        password : "",
        passwordConfirmation : ""
      }
    }
  },
  computed: {
  },
  methods: {
    authorize(){
      this.loading = true
      ApiService.register(this.credential).then(()=>{
        console.log("emitir evento: success")
        this.$emit("success", this.credential.username )
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
