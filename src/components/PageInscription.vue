<script>


import InscipComponent from './formulaireComponent/InscipComponent.vue';
import ConnectComponentVue from './formulaireComponent/ConnectComponent.vue';

import { player } from '../class/personnage';
import { thekey } from '../class/myKey';

export default {
  components: {
    InscipComponent,
    ConnectComponentVue,
  },
  data() {
    return {
      firebaseKey: null,
      joueur: player,
      formMode: true,
      thekey:thekey,
    }
  },
 
  methods: {
    changeFormMode() {
      this.formMode = !this.formMode;
    },
    signInButtonPressed(e) {
      console.log("Sign In Button Pressed");
      e.preventDefault();
    },
    newVisitor(){
      // Vérifie si un cookie avec l'identifiant existe déjà
      if (document.cookie.indexOf('visitor_id=') === -1) {
        // Si le cookie n'existe pas, c'est un nouveau visiteur
        // On incrémente le compteur de visiteurs
        // ...

        // On crée un nouveau cookie avec un identifiant unique
        const visitorId = this.generateUniqueVisitorId();
        const expirationDate = new Date(Date.now() + 30 * 60 * 1000); // expire dans 1 an
        document.cookie = `visitor_id=${visitorId}; expires=${expirationDate.toUTCString()}; path=/`;
      }
    },
    generateUniqueVisitorId() {
      let visitorId = localStorage.getItem("visitorId");
      if (!visitorId) {
        visitorId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem("visitorId", visitorId);
      }
      return visitorId;
    },
    // onFirebaseKey(key) {
    //   this.firebaseKey = key;
    // },
    // getKey() {
    //   console.log(this.firebaseKey)
    // }
  },
  created(){
    this.newVisitor();
  }
}

</script>


<template>
  <div class="login">
    
      <div v-if="formMode">
        <ConnectComponentVue :joueur="joueur" :thekey="thekey" />
        <div class="form-group text-center">
          <!-- <button @click="changeFormMode" class="btn btn-primary my-2">Inscription</button> -->
          <small @click="changeFormMode" id="emailHelp" class="form-text text-right ">Inscription</small>
        </div>
      </div>
      <div v-else>
        <InscipComponent :joueur="joueur"  />
        <div class="form-group text-center">
          <!-- <button @click="changeFormMode" class="btn btn-primary my-2">Connexion</button> -->
          <small @click="changeFormMode" id="emailHelp" class="form-text text-right ">Connexion</small>
        </div>
      
      </div>
    
  </div>
  <!-- <div class="form-group text-center">
    <button @click="getKey" class="btn btn-primary my-2">Key</button>
  </div> -->

  <!-- <InscipComponent :joueur="joueur" /> -->
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(0deg, rgba(77, 25, 77, 1) 0%,
      rgba(58, 0, 64, 0.9192051820728291) 46%, rgba(0, 100, 102, 1) 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

}

.login {
    width: 360px;
    height: min-content;
    padding: 20px;
    border-radius: 12px;
    background-color: aliceblue;
}

.login label {
    font-size: large;
    font-weight: bold;
}
</style>
