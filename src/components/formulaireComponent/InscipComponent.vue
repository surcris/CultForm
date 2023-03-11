<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" 
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <form @submit.prevent="matchData">
            <div class="form-group">
                <label for="exampleInputEmail1" class="col-md-12 text-center">Inscription</label>
                <label for="exampleInputEmail1" class="col-md-12 text-right">Créer un pseudo</label>
                <input @keyup.enter="matchData" type="text" v-model="pseudo" class="form-control " id=""  placeholder="Pseudo">
                <small v-if="matchBool==false" id="emailHelp" class="form-text text-right text-danger">Ce pseudo est déja pris</small> 
                <!-- <div v-if="matchBool" class="invalid-feedback">
                    Please choose a other Pseudo.
                </div> -->
            </div>
            
            <div class="col-md-12 text-center">
                <!-- <router-link :to="redirectToGame">
                </router-link> -->
                <button  type="submit" class="btn btn-primary my-2">Valider</button>
            </div>
            
        </form>
</template>

<script>
import joueurDataServices from '../../services/joueurDataServices' 
import Personnage from '../../class/personnage.js';
import CryptoJS from 'crypto-js';

export default {
    props:['joueur'],
    components: {

    },
    //emits: ['firebase-key'],
    data() {
        return {
            player:[],
            articles:[],
            pseudo:"",
            matchBool:true,
            //goTo:false
            personnage: new Personnage('')
            
        }
    },
    methods: {
        encryptData(data) {
            const key = import.meta.env.VITE_APP_KEY;
            return CryptoJS.AES.encrypt(data, key).toString();
        },
        // signInButtonPressed() {
        //     console.log("Sign In Button Pressed");
            
        // },
        
        // redirectToGame() {
        //     //vérifie vos conditions et redirige
        //     if (this.goTo) {
        //         this.$router.push('/game');
        //     }
        // },
        onDataChange(lesPlayer){
            let l_player = [];
            lesPlayer.forEach(unPlayer => {
                // let key = unArticle.key;
                let data = unPlayer.val();
                l_player.push({
                    key:unPlayer.key,
                    dataDB:data,
                    
                })
            });
            this.player = l_player;
            //console.log(this.player)

        },
        createPlayer(newPlayer){
            joueurDataServices.create(newPlayer)
            .then(()=>{
                console.log('Article Crée avec Succès !');
            })
            .catch(error=>{
                console.log(error);
            });
        },
        matchData(){
            let l_key='';
            let l_match = false;
            //console.log(this.pseudo)
            
            this.player.forEach(unPlayer => {
                //console.log(unPlayer)
                if (this.pseudo == unPlayer.dataDB.nom) {
                    this.matchBool = false;
                    l_match = true;
                    console.log("Pseudo déja utiliser");
                }
            });
            if (!l_match) {
                
                this.joueur.nom = this.pseudo;
                this.createPlayer(this.joueur);

                this.player.forEach(unPlayer => {
                    if (this.pseudo == unPlayer.dataDB.nom) {
                        l_key = unPlayer.key
                    }
                });
                
                //Redirige vers la page game
                console.log(l_key);
                let l_crpKey = this.encryptData(l_key);
                //console.log(l_crpKey);
                localStorage.setItem('key', l_crpKey)

                this.$router.push('/game');
            } 
        },

    },
    mounted(){
        
        joueurDataServices.getAll().on('value',this.onDataChange);
        console.log('JE VIENS DE ME MONTER');
        
    },
    unmounted(){
        joueurDataServices.getAll().off('value',this.onDataChange);
        console.log('JE VIENS DE ME MONTER');
    }
}

</script>

<style scoped>

.login{
    width: 360px;
    height: min-content;
    padding: 20px;
    border-radius: 12px;
    background-color: aliceblue;
}
.login label{
    font-size: large;
    font-weight: bold;
}
</style>
