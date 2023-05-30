<script setup>
  import '../styleCss/styleGame.css'
</script>

<script >
import CombatComponent from './gameComponent/CombatComponent.vue';
import StatsComponent from './gameComponent/StatsComponent.vue';
import PersoComponent from './gameComponent/PersoComponent.vue';
import OptionPersoComponent from './gameComponent/OptionPersoComponent.vue';

//import {player,ennemieCarre} from '../class/personnage' 
import Personnage from '../class/personnage';
//import joueurDataServices from '../services/joueurDataServices' 
//import cryptoJs from 'crypto-js';
//import axios from 'axios'
//import { thekey } from '../class/myKey';

export default {
  //(props) pour recevoir les données envoyées depuis le composant parent
  props: ['personnage'],
  components: {
    CombatComponent,
    StatsComponent,
    PersoComponent,
    OptionPersoComponent,
    
  },
  data() {
    return {
      joueur: null,
      joueurDemo: new Personnage("Demo",'cercle'),
      adversaire: new Personnage("Ennemie",'cercle'),
      gameBool: false,
      demo:true,
      
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
    // updateJoueurClass(dataDB) {

    //   for (const key in dataDB) {
    //     if (Object.hasOwnProperty.call(dataDB, key)) {
    //       this.joueur[key] = dataDB[key];

    //     }
    //   }
    //   this.gameBool = true;
    // },
    // decryptData(ciphertext) {
    //   const key = import.meta.env.VITE_APP_KEY;
    //   const bytes = cryptoJs.AES.decrypt(ciphertext, key);
    //   return bytes.toString(cryptoJs.enc.Utf8);
    // },
    // decrypt(ciphertext, key) {
    //   const bytes = cryptoJs.AES.decrypt(ciphertext, key);
    //   return bytes.toString(cryptoJs.enc.Utf8);
    // },
  },
  mounted() {
    this.joueur = this.personnage;
    this.joueur.display();
    console.log('existe');
    // if (this.personnage) {
    //   this.joueur = this.personnage;
    //   console.log('existe');
    //   this.demo = false;
    // }
    
    // if (this.demo == false) {

    //   console.log("Game:",this.joueur)
    // }else{
    //   this.joueurDemo.initStat(Math.floor(Math.random() *  (10 - 1 + 1) + 1),5,5,5,5,5);
    //   //this.joueurDemo.getInfoDomaine();
    //   //console.log(this.joueurDemo.getInfoDomaine().domaine[this.joueurDemo.rang[0]].niveaux.length)
    //   this.joueurDemo.display();
    //   console.log("demo:",this.joueurDemo)
    // }
    
    //this.gameBool = false;
   
    
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
    

  }
}

</script>

<template>
  <div id="div-body">
    <div v-if="demo == false" class="container">
      <StatsComponent :joueur="joueur" />
      <PersoComponent :joueur="joueur" />
      <OptionPersoComponent :joueur="joueur" />
      <CombatComponent :joueur="joueur" :adversaireCarre="adversaire"/>
    </div>
    <div v-if="demo == true" class="container">
      <StatsComponent :joueur="joueurDemo"  />
      <PersoComponent :joueur="joueurDemo" />
      <OptionPersoComponent :joueur="joueurDemo" />
      <CombatComponent :joueur="joueurDemo" :adversaireCarre="adversaire"/>
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
