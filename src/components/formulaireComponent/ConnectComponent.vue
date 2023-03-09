<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" 
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <div class="login">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1" class="col-md-12 text-center">Connexion</label>
                <label for="exampleInputEmail1" class="col-md-12 text-right">Entrer votre pseudo</label>
                <input type="text" v-model="pseudo" class="form-control " id=""  placeholder="Pseudo">
                <small v-if="matchBool==false" id="emailHelp" class="form-text text-right text-danger">Vous n'etes pas enregistrer</small> 
                <!-- <div v-if="matchBool" class="invalid-feedback">
                    Please choose a other Pseudo.
                </div> -->
            </div>
            
            <div class="col-md-12 text-center">
                <!-- <router-link :to="redirectToGame">
                    
                </router-link> -->
                <button @click="matchData"  type="button" class="btn btn-primary my-2">Valider</button>
                
            </div>
           
            
            
        </form>
    </div>  
 </template>

<script>
import joueurDataServices from '../../services/joueurDataServices' 

export default {
    props:['joueur','formMode'],
    components: {

    },
    data() {
        return {
            player:[],
            articles:[],
            pseudo:"",
            matchBool:true,
            //goTo:false
        }
    },
    methods: {
        
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
        matchData(){
            
            this.player.forEach(unPlayer => {
                //console.log(unPlayer)
                if (this.pseudo == unPlayer.dataDB.nom) {
                    this.matchBool = true;

                    this.joueur.nom = this.pseudo;

                    //this.goTo = true;
                    //console.log("Match");
                    //Redirige vers la page game
                    this.$router.push('/game');
                } else {
                    this.matchBool = false;
                    console.log("UnMatch");
                }
            });
            
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
