<script setup>
  import '../styleCss/styleGame.css'
</script>

<script >
import CombatComponent from './gameComponent/CombatComponent.vue';
import StatsComponent from './gameComponent/StatsComponent.vue';
import PersoComponent from './gameComponent/PersoComponent.vue';
import OptionPersoComponent from './gameComponent/OptionPersoComponent.vue';

import {player,ennemieCarre} from '../class/personnage' 
//import joueurDataServices from '../services/joueurDataServices' 
import cryptoJs from 'crypto-js';
import axios from 'axios'
import { thekey } from '../class/myKey';

export default {
  components: {
    CombatComponent,
    StatsComponent,
    PersoComponent,
    OptionPersoComponent,
    
  },
  data() {
    return {
      joueur: player,
      adversaireCarre: ennemieCarre,
      idDb: "",
      playerData: [],
      gameBool: false,
      playerKey: [],
      myKey: 0,

    }
  },
  computed: {

  },
  methods: {

    // onDataChange(lesPlayer) {
    //   //joueurDataServices.getOne(this.myKey).once('value')
    //   //je cherche la table avec la un key puis je MAJ le joueur avec les valeur de la table 
    //   joueurDataServices.getOne(this.myKey).once('value')
    //     .then((snapshot) => {
    //       const joueur = snapshot.val();
    //       //console.log("DDA ",joueur);
    //       this.updateJoueurClass(joueur);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });

    // },
    updateJoueurClass(dataDB) {

      for (const key in dataDB) {
        if (Object.hasOwnProperty.call(dataDB, key)) {
          this.joueur[key] = dataDB[key];

        }
      }
      this.gameBool = true;
    },
    decryptData(ciphertext) {
      const key = import.meta.env.VITE_APP_KEY;
      const bytes = cryptoJs.AES.decrypt(ciphertext, key);
      return bytes.toString(cryptoJs.enc.Utf8);
    },
    decrypt(ciphertext, key) {
      const bytes = cryptoJs.AES.decrypt(ciphertext, key);
      return bytes.toString(cryptoJs.enc.Utf8);
    },
  },
  async mounted() {
    this.gameBool = true;
    if(this.decryptData(localStorage.getItem('key'))){
      this.myKey = this.decryptData(localStorage.getItem('key'));
    }else{
      
      this.myKey = 0;
      console.log('r')
    }
    
    // await axios.get(import.meta.env.VITE_APP_URL + '/api/data/' + this.myKey)
    //   .then(response => {
    //     const decryptedData = this.decrypt(response.data, import.meta.env.VITE_APP_KEY);
    //     const joueur = JSON.parse(decryptedData);
    //     this.updateJoueurClass(joueur);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

  },
  unmounted() {

  },
  created() {
    console.log('r')

  }
}

</script>

<template>
  <div id="div-body">
    <div v-if="gameBool" class="container">
      <StatsComponent :myKey="myKey" :joueur="joueur" :adversaireCarre="adversaireCarre"/>
      <PersoComponent :myKey="myKey" :joueur="joueur" :adversaireCarre="adversaireCarre"/>
      <OptionPersoComponent :myKey="myKey" :joueur="joueur" :adversaireCarre="adversaireCarre"/>
      <CombatComponent :myKey="myKey" :joueur="joueur" :adversaireCarre="adversaireCarre"/>
    </div>
  </div>
</template>

<style scoped>
#div-body {
  background: linear-gradient(0deg, rgba(77, 25, 77, 1) 0%,
      rgba(58, 0, 64, 0.9192051820728291) 46%, rgba(0, 100, 102, 1) 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

}

</style>
