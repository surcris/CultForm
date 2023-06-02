<script>


import InscipComponent from './formulairePersonnageComponent/InscipComponent.vue';
import ConnectComponentVue from './formulairePersonnageComponent/ConnectComponent.vue';
import HeaderComponent from './HeaderComponent.vue';
import axios from 'axios'
import CryptoJS from 'crypto-js';
import { player } from '../class/personnage';
import { thekey } from '../class/myKey';
import Personnage from '../class/personnage';


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
      etatAuth:false,
      listPerso:[],
      whoP:null,
    }
  },
 
  methods: {
    encryptData(data) {
      const key = import.meta.env.VITE_APP_KEY;

      return CryptoJS.AES.encrypt(data, key).toString();
    },
    decryptData(ciphertext) {
      const key = import.meta.env.VITE_APP_KEY;
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    changeEtatAuth() {
      this.etatAuth = !this.etatAuth;
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
    play(pseudo){
      let l_perso = null;
      
      for (let index = 0; index < this.listPerso.length; index++) {
        //console.log(this.listPerso[index].pseudo,":",pseudo);
        if (pseudo == this.listPerso[index].pseudo) {
          l_perso = this.listPerso[index];
          
        }
      }
      if (l_perso) {
        const l_pe = JSON.stringify(l_perso)
        sessionStorage.setItem("uPlt", l_pe);
        this.$emit('sendPersonnage', l_perso);
        this.$router.push({ name: 'game'});
      }else{
        console.log("Erreur du bouton Play");
      }
      
      
    },
    envoiPerso(personnage){

      this.$emit('sendPersonnage', personnage);
    },
    async getAllPersonnnage() {
      
      let key = this.decryptData(sessionStorage.getItem('akey'))
      await axios.get(import.meta.env.VITE_APP_URL+ '/api/perso/'+key)
        .then((response) => {
          const objet = JSON.parse(response.data);

          objet.forEach(element => {
            let l_perso = new Personnage('','','');
            // Copie des propriétés de element vers l_perso
            Object.assign(l_perso, element);
            
            this.listPerso.push(l_perso)

          });
         
        })
        .catch((error) => {
          //console.log(error.response.status);
          if(error.response.status == 404) console.log("Il n'y a pas de personnage a ce compte");
        })

    },
    setWhoP(pseudo){

      for (let index = 0; index < this.listPerso.length; index++) {
        if (this.listPerso[index].pseudo == pseudo) {
          this.whoP = index;

        }
        
        
      }
    }
  },
  created(){
    this.getAllPersonnnage();
    //recupere les data de la page http://localhost:3001/api/data et les met dans userData 
    //this.userData = await axios.get(import.meta.env.VITE_APP_URL+'/api/data');
    //console.log(this.userData.data);
    //this.newVisitor();
    
  },
  mounted(){

  }
  
}

</script>


<template>
    <div id="div-body">
      <HeaderComponent/>
      <div class="main">
        <div class="persolist">
          <div class="persolist-container">
              <div class="persolist-container-perso-nouveau" @click="changeEtatAuth">
                  <p>Nouveau Personnage +</p>
              </div>
              <div v-for="perso in listPerso" class="persolist-container-perso">
                  <div @click="setWhoP(perso.pseudo)" class="persolist-container-perso-detail">
                      <p>{{ perso.pseudo }}</p>
                      <p>{{ perso.niveau }}</p>
                  </div>
                  <div class="persolist-container-perso-play">
                      <div @click="play(perso.pseudo)"><i class="fa-solid fa-play"></i></div>
                    
                  </div>
              </div>
          </div>
      </div>

      <ConnectComponentVue :listJoueur="listPerso" :selectP="whoP" v-if="etatAuth == false"/>
      <InscipComponent @sendToApp="envoiPerso" v-if="etatAuth == true"/>
     
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
.persolist{
    height: 100%;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.persolist-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2c0d2c;
    border-radius: 5px;
    width: 90%;
    height: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
}
.persolist-container::-webkit-scrollbar {
    display: none;
}
.persolist-container-perso {
    padding: 5px 0px;
    margin: 5px 0px;
    background: #421442;
    border: 1px solid #ffffff47;
    border-radius: 5px;
    width: 95%;
    display: flex;
    justify-content: space-between;
}

.persolist-container-perso p , .persolist-container-perso-nouveau p{
    color: #fdfdfd;
    font-weight: 500;
    font-size: 20px;
    margin: 5px 5px ;
}
.persolist-container-perso p{
    color: #fdfdfd;
}
.persolist-container-perso-nouveau{
    cursor: pointer;
    margin: 5px 0px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #FFFFFF;
    border-radius: 5px;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.persolist-container-perso-detail{
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.persolist-container-perso-play{
    width: 20%;
    
}
.persolist-container-perso-play div{
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.persolist-container-perso-play i::before{
    height: auto;
    width: auto;
    font-size: 30px;
    
    padding: 7px 5px;
    padding-left: 7px;
    border-radius: 100%;
    padding-right: 2px;
    color: #130513;
    display: flex;
    justify-content: center;
    background-color: #421442;
    border: #16071612 1px solid;
    /* box-shadow: 0px 0px 3px 2px #611e61; */
    box-shadow:  5px 5px 25px #1f091f,
             -5px -5px 25px #651f65;
}

.persolist-container-perso-play i{
    height: 45px;
    width: 45px;
    padding: 2px 5px;

}
@media screen and (max-width: 800px) {
    .persolist{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .persolist-container{
       
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        
        border-radius: 5px;
        width: 400px;
        height: 80%;
        
    }
    .persolist-container-perso {
        margin: 5px 5px;
        width: 90%;
        
    }
    .persolist-container-perso-nouveau{
        margin: 5px 5px;
        width: auto;
    }
    

}
@media screen and (max-width: 500px) {
    .persolist-container{
        
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        
        border-radius: 5px;
        width: 80%;
        height: 90%;
        overflow:scroll;
    }
   
    
    .persolist-container-perso {
        margin: 5px 5px;
        width: 90%;
        
    }
   
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
