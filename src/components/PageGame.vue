<script >
import '../styleCss/styleGame.css'
import CombatComponent from './gameComponent/CombatComponent.vue';
import StatsComponent from './gameComponent/StatsComponent.vue';
import PersoComponent from './gameComponent/PersoComponent.vue';
import OptionPersoComponent from './gameComponent/OptionPersoComponent.vue';
import PageInscriptionVue from './PageInscription.vue';
import {player,ennemieCarre} from '../class/personnage' 
import joueurDataServices from '../services/joueurDataServices' 
import { thekey } from '../class/myKey';

export default {
  components: {
    CombatComponent,
    StatsComponent,
    PersoComponent,
    OptionPersoComponent,
    PageInscriptionVue,
  },
  data() {
    return {
        joueur: player,
        adversaireCarre: ennemieCarre,
        idDb:"",
        playerData:[],
        gameBool:false,
        playerKey:[],
        myKey:localStorage.getItem('key'),
        
    }
  },
  computed: {
    
  },
  methods: {
    
    onDataChange(lesPlayer) {

      //je cherche la table avec la un key puis je MAJ le joueur avec les valeur de la table 
      joueurDataServices.getOne(this.myKey).once('value')
      .then((snapshot) => {
        const joueur = snapshot.val();
        //console.log("DDA ",joueur);
        this.updateJoueurClass(joueur);
      })
      .catch((error) => {
        console.error(error);
      });
      
      // let l_player = [];
      // lesPlayer.forEach(unPlayer => {
      //   // let key = unArticle.key;
      //   let data = unPlayer.val();
      //   l_player.push({
      //     key: unPlayer.key,
      //     dataDb: data,

      //   })
      // });
      // this.playerData = l_player;
      //console.log(this.playerData)
      
      // this.playerData.forEach(unPlayer => {
      //   if (this.joueur.nom == unPlayer.dataDb.nom) {
      //     //console.log(unPlayer.dataDb)
      //     this.updateJoueurClass(unPlayer.dataDb);
      //     this.idDb=unPlayer.key;
      //     //console.log("Joueur Trouver");
      //   } else {
      //     //console.log("Joueur Inconnu");
      //   }
      // });
    },
    updateJoueurClass(dataDB){
      
      for (const key in dataDB) {
        if (Object.hasOwnProperty.call(dataDB, key)) {
          this.joueur[key] = dataDB[key];

        }
      }
      this.gameBool=true;
    }
  },
  mounted() {
    joueurDataServices.getOne(this.myKey).on('value', this.onDataChange);
    //console.log(this.myKey);

    // joueurDataServices.getAll().child(this.myKey).once('value')
    //   .then((snapshot) => {
    //     const joueur = snapshot.val();
    //     console.log(joueur);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

  },
  unmounted() {
    joueurDataServices.getOne(this.myKey).off('value', this.onDataChange);
    //joueurDataServices.getAll().off('value', this.onDataChange);
  },
  created(){
    // joueurDataServices.getAll().get()
    //   .then(snapshot => {
    //     if (snapshot.exists()) {
    //       const data = snapshot.val();
    //       //console.log(data); // Affiche les données récupérées

    //     } else {
    //       console.log("Aucune donnée trouvée à cette référence");
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    
  }
}

</script>

<template>
  <div v-if="gameBool" class="container">
    <StatsComponent :myKey="myKey" :joueur="joueur" :adversaireCarre="adversaireCarre"/>
    <PersoComponent :myKey="myKey" :joueur="joueur" :adversaireCarre="adversaireCarre"/>
    <OptionPersoComponent :myKey="myKey" :joueur="joueur" :adversaireCarre="adversaireCarre"/>
    <CombatComponent :myKey="myKey" :joueur="joueur" :adversaireCarre="adversaireCarre"/>
  </div>
</template>

<style scoped>



</style>
