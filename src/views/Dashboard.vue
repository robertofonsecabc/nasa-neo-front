<template>
  <div class="about">

    <v-card class="elevation-0 pa-3 mb-6">
      <v-card-text>
        <h1 class="mb-4">Dashboard</h1>
        <p>Olá {{username}}</p>
      </v-card-text>
    </v-card>

    <v-dialog
        v-model="dialogMessage"
        max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Ufa, tamo de boas!
        </v-card-title>
        <v-card-text class="pa-4">
          <p>Tudo de boas! Buscamos no sistema da NADA se existem asteróides potencialmente perigosos para este dia e não encontramos.</p>
          <p>Que sorte!</p>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card class="elevation-0 pa-3 mb-6">
      <v-card-text>
        <v-row>
          <v-col col="12" sm="12" md="6">
            <h2>Buscador do dia do fim do mundo!</h2>
            <h6 class="mb-5">Ps. Se acontecer por asteróides!</h6>
            <p>Selecione data para verificar se existe algum asteroide que ameaça colidir com a terra.</p>
          </v-col>
          <v-col col="12" md="6">
            <v-form>
              <v-dialog
                  ref="dialogSelectedDate"
                  v-model="dialogSelectedDate"
                  :return-value.sync="selectedDate"
                  width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="selectedDate"
                      label="Selecione a data"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="selectedDate"
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="dialogSelectedDate = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.dialogSelectedDate.save(selectedDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
              <v-btn block large color="error" @click="search" :loading="loading">Tem certeza que deseja buscar o fim do mundo?</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="elevation-0 pa-3">
      <v-card-text>
        <h2 class="mb-4">Resultados encontrados para {{ selectedDate | moment }}</h2>
        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Data
                </th>
                <th class="text-left">
                  Identificador
                </th>
                <th class="text-left">
                  Nome
                </th>
                <th class="text-left">
                  Km por hora
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in asteroidsList"
                  :key="item.id"
              >
                <td>{{ item.date }}</td>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.kmPerHour }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>

      </v-card-text>
    </v-card>

  </div>
</template>


<script>

import ApiService from "@/services/ApiService";
import moment from "moment";

export default {
  name: "Dashboard",
  data : ()=>({
    selectedDate : null,
    dialogSelectedDate : false,
    dialogMessage : false,
    loading : false,
    asteroidsList : [
      { id : 1 , name : "Asteroid de Exemplo" , date : "2510-10-12" , kmPerHour : 1000.33 }
    ]
  }),
  computed : {
    username(){
      return this.$store.getters.username
    }
  },
  methods : {
    search(){
      if( this.selectedDate != null ){
        this.loading = true
        ApiService.getPotencialAsteroid( this.selectedDate ).then(res=>{
          this.asteroidsList = res.data
        }).catch(e=>{
          console.log(e)
          this.asteroidsList = []
          this.dialogMessage = true
        }).finally(()=>{
          this.loading = false
        })

      }
    }
  },
  mounted() {
    if( this.selectedDate == null ){
      this.selectedDate = moment().format("YYYY-MM-DD")
    }
  }
}
</script>
