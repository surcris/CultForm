<script>


import InscipComponent from './formulairePersonnageComponent/InscipComponent.vue';
import ConnectComponentVue from './formulairePersonnageComponent/ConnectComponent.vue';
import HeaderComponent from './HeaderComponent.vue';
import axios from 'axios'
import { player } from '../class/personnage';
import { thekey } from '../class/myKey';

export default {
  components: {
    InscipComponent,
    ConnectComponentVue,
    HeaderComponent
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
  async created(){
    //recupere les data de la page http://localhost:3001/api/data et les met dans userData 
    //this.userData = await axios.get(import.meta.env.VITE_APP_URL+'/api/data');
    //console.log(this.userData.data);
    this.newVisitor();
  },
  mounted(){
    
  }
  
}

</script>


<template>
  <div id="div-body">
    <HeaderComponent/>
    <div class="main">
      
        <ConnectComponentVue :joueur="joueur" :thekey="thekey" />
        <!--<div class="form-group text-center">
           <button @click="changeFormMode" class="btn btn-primary my-2">Inscription</button> 
          <small @click="changeFormMode" id="emailHelp" class="form-text text-right ">Inscription</small>
        </div>-->

        <!--<InscipComponent :joueur="joueur" />
        <div class="form-group text-center">
           <button @click="changeFormMode" class="btn btn-primary my-2">Connexion</button> 
          <small @click="changeFormMode" id="emailHelp" class="form-text text-right ">Connexion</small>
        </div>-->

     
    </div>
      
 
  </div>

</template>


<style scoped>
#div-body {
    background-color: #0B525B;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: 'Kodchasan';
}
.main{
    width: 100vw;
    flex: 1;
    display: flex;
    flex-direction: row;
}

@media screen and (max-width: 800px){
  .main{
    width: 100vw;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-direction: column-reverse;
    align-items: center;
  }
}
</style>
