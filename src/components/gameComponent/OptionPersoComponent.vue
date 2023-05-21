<template>
    <div class="map">
        <div class="Navbar">
            <!-- <div><p>Profil</p></div> -->
            
            <div @click="btnSendJoueur" class="profil"><button>Acceuil</button></div>
            <div class="profil"><p>Admin</p></div>
            
        </div>
        <div class="menuJeu">
            <i @click="btnInventaire" ><Icon icon="gg:toolbox" /></i>
            
            <i @click="btnMaps" ><Icon icon="material-symbols:map" /></i>
        </div>
        <div class="espacePlayer">
            <div v-if="displayInventaireBool"  class="inventaire">
                <div class="inventaire-titre">Inventaire</div>
                <div class="inventaire-contenu">
                    <div v-for="n in inventairePlace">
                        
                    </div>
                </div>
            </div>
            <div v-if="displayMapBool"  class="mapMonde">
                <div class="mapMonde-titre">Map</div>
                <div class="mapMonde-contenu"></div>
            </div>
        </div>
    </div>
</template>

<script>
//import joueurDataServices from '../../services/joueurDataServices' 
import { Icon } from '@iconify/vue';

export default{
    props: ['joueur','adversaireCarre'],
    components: {
       Icon,
    },
    data(){
        return{
            
            displayInventaireBool:false,
            displayMapBool:false,
            displaystats:'flex',
            displayInventaire:'none',
            displayMap:'none',

            inventairePlace:80,
            sendBool:false,
        }
        
    },
    methods:{
        btnSendJoueur(){
            // if (this.sendBool) {
            //     joueurDataServices.create(this.joueur)
            //     .then(()=>{
            //         this.sendBool=true;
            //         console.log('Article Crée avec Succès !');
            //     })
            //     .catch(error=>{
            //         console.log(error);
            //     });

            // }else{
            //     console.log('Article Déja créer !');
            // }
            this.$router.push({ name: 'accueil'});
        },
        btnInventaire(){
            
            this.displayInventaireBool=!this.displayInventaireBool;
            console.log("invent : "+this.displayInventaireBool+" map : "+this.displayMapBool)
            if (this.displayInventaireBool) {
                this.displayMapBool=false;
                
            }
            
        },
        btnMaps(){
            
            this.displayMapBool=!this.displayMapBool;
            console.log("invent : "+this.displayInventaireBool+" map : "+this.displayMapBool)
            if (this.displayMapBool ) {
                this.displayInventaireBool=false;
                
            }
            
        },
    },
    mounted(){
        // const canvasPlayer = document.getElementById("Canvas");
        // const ctxPlayer = canvasPlayer.getContext("2d");
        // this.joueur.canvasP = canvasPlayer;
        // this.joueur.ctxP = ctxPlayer;
        // this.cercle(this.joueur.canvasP,this.joueur.ctxP,50,this.joueur);
        // setInterval(() => {
        //     this.barreXp(this.joueur.canvasP,this.joueur.ctxP,this.joueur);
        // }, 100);

        
    }
}
</script>

<style>
.profil button{
    border: none;
    background-color: transparent;
    font-size: 20px;
    color: #23c483;
}

.profil:hover button{
    
    color: #fff;
    
}
</style>
