<script>


import InscipComponent from './formulaireComponent/InscipComponent.vue';
import ConnectComponentVue from './formulaireComponent/ConnectComponent.vue';
import {player} from '../class/personnage';

export default {
  components: {
    InscipComponent,
    ConnectComponentVue,
  },
  data() {
    return {
        joueur: player,
        formMode:true,
    }
  },
  methods: {
    changeFormMode() {
      this.formMode = !this.formMode;
    },
  }
}

</script>


<template>
  <div v-if="formMode">
    <ConnectComponentVue :joueur="joueur" :formMode="formMode" />
    <div class="form-group text-center">
      <button @click="changeFormMode"  class="btn btn-primary my-2">Inscription</button>
    </div>
  </div>
  <div v-else>
    <InscipComponent :joueur="joueur" :formMode="formMode"/>
    <div class="form-group text-center">
      <button @click="changeFormMode"  class="btn btn-primary my-2">Connexion</button>
    </div>
  </div>
  
    <!-- <InscipComponent :joueur="joueur" /> -->

</template>

<style>

body {
    margin: 0;
    padding: 0;
    background: linear-gradient(0deg, rgba(77,25,77,1) 0%,
     rgba(58,0,64,0.9192051820728291) 46%, rgba(0,100,102,1) 100%);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

}


</style>
