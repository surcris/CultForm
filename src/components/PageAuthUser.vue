<script>
import InscripComponentVue from './formulaireUserComponent/InscripUserComponent.vue';
import ConnectComponentVue from './formulaireUserComponent/ConnectUserComponent.vue';
import HeaderComponent from './HeaderComponent.vue';
import axios from 'axios'
import { player } from '../class/personnage';
import { thekey } from '../class/myKey';

export default {
  props: ['mode'],
  components: {
    InscripComponentVue,
    ConnectComponentVue,
    HeaderComponent,
  },
  data() {
    return {

      formMode: this.mode,
    }
  },

  methods: {
    changeFormMode() {
      //console.log(this.formMode)
      //this.formMode = !this.formMode;
      if (this.formMode == "connexion") {
          this.formMode = "inscription";
      }else{
        this.formMode = "connexion";
      }
      
    },
    newVisitor() {
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

  },
  async created() {
    //recupere les data de la page http://localhost:3001/api/data et les met dans userData 
    //this.userData = await axios.get(import.meta.env.VITE_APP_URL+'/api/data');
    //console.log(this.userData.data);
    //this.newVisitor();
  },
  mounted() {
    
  }

}

</script>


<template>
 
  <div id="div-body">
    <HeaderComponent :headermode="1"/>
    <div class="login">
      
      <div v-if="formMode == 'connexion' ">
        <div><h1 class="titre">Connexion </h1></div>
        
        <ConnectComponentVue />
        <div class="redirect">
          <p> Créer un compte ?
              <strong @click="changeFormMode" style="cursor: pointer;color: #01FF98;
              font-family: 'Kodchasan', sans-serif;font-style:normal;font-weight: 800;font-size: 23px;">
              <router-link :to="{ name: 'authentificationUser', params: { mode: 'inscription' } }">Inscription</router-link></strong>
          </p>
          <p><a href="#">Impossible de se connecter ?</a> </p>
        </div>
       
      </div>
      <div v-else-if="formMode == 'inscription'">
        <div><h1 class="titre">Inscription</h1></div>
        
        <InscripComponentVue />
        <div class="redirect">
          <p>Vous avez déjà un compte ?
              <strong @click="changeFormMode" style="cursor: pointer;color: #01FF98;font-family: 'Kodchasan', sans-serif;font-style:normal;font-weight: 800;font-size: 23px;">
                <router-link :to="{ name: 'authentificationUser', params: { mode: 'connexion' } }">Connexion</router-link></strong>
          </p>
        </div>
        

      </div>

    </div>
  </div>
</template>

<style >

.titre{
  font-family: 'Kodchasan';
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  text-align: center;
  margin-bottom: 2px;
  color: white;
}
#div-body {
  
  margin: 0;
  padding: 0;
  

}
</style>
<style scoped>

#div-body {
  
  background-color: #0B525B;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
}


.login {
  flex: 1;
  width: 360px;
  height: min-content;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.login label {
  font-size: large;
  font-weight: bold;
}

.redirect{
    text-align: center;
    font-family: 'Kodchasan';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
}
.redirect p:last-child{
    margin-top: 0;
}
.redirect p a{ 
    color: #fff;
    text-decoration: none;
}
.redirect p strong a{ 
    color: #01FF98;
    text-decoration: none;
}

</style>