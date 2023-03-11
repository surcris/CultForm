<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <form @submit.prevent="matchData">
            <div class="form-group" >
                <label for="exampleInputEmail1" class="col-md-12 text-center">Connexion</label>
                <label for="exampleInputEmail1" class="col-md-12 text-right">Entrer votre pseudo</label>
                <input type="text" @keyup.enter="matchData" v-model="pseudo" class="form-control " id="" placeholder="Pseudo">
                <small v-if="matchBool == false" id="emailHelp" class="form-text text-right text-danger">Vous n'etes pas
                    enregistrer</small>
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
import {firebaseKey} from '../../services/joueurDataServices'
import CryptoJS from 'crypto-js';
export default {
    props: {
        joueur: Object,
        thekey: Object,
    },
    components: {

    },
    //emits: ['firebase-key'],
    data() {
        return {
            player: [],
            articles: [],
            pseudo: "",
            matchBool: true,
            //goTo:false
        }
    },
    methods: {
        // signInButtonPressed() {
        //     console.log("Sign In Button Pressed");
            
        // },
        encryptData(data) {
            const key = import.meta.env.VITE_APP_KEY;
            return CryptoJS.AES.encrypt(data, key).toString();
        },
        decryptData(ciphertext) {
            const key = import.meta.env.VITE_APP_KEY;
            const bytes = CryptoJS.AES.decrypt(ciphertext, key);
            return bytes.toString(CryptoJS.enc.Utf8);
        },
        onPressEnter(e) {
            if (e.key !== "enter") {
                // guard against non-period presses
                return;
            }else{
                //this.matchData();
                console.log("appuié");
            }
            //onPressPeriod()
        },

        // redirectToGame() {
        //     //vérifie vos conditions et redirige
        //     if (this.goTo) {
        //         this.$router.push('/game');
        //     }
        // },
        test(){
            console.log("TEST");
        },
        onDataChange(lesPlayer) {
            let l_player = [];
            lesPlayer.forEach(unPlayer => {
                // let key = unArticle.key;
                let data = unPlayer.val();

                l_player.push({
                    key: unPlayer.key,
                    dataDB: data,

                })
            });
            this.player = l_player;
            //console.log(this.player)



        },
        matchData() {
            let l_key = '';
            let l_found = false;
            this.player.forEach(unPlayer => {

                if (this.pseudo == unPlayer.dataDB.nom) {
                    this.matchBool = true;

                    l_found = true;
                    this.joueur.nom = this.pseudo;

                    l_key = unPlayer.key
                    //console.log(this.thekey.key);
                    console.log("Match");
                    
                }
            });
            if (l_found) {
                //console.log(l_key);
                let l_crpKey = this.encryptData(l_key)
                localStorage.setItem('key', l_crpKey)
                // //Redirige vers la page game
                this.$router.push('/game');

            } else {
                this.matchBool = false;
                console.log("UnMatch");
            }

        },

    },
    mounted() {

        joueurDataServices.getAll().on('value', this.onDataChange);
        console.log('JE VIENS DE ME MONTER');

    },
    unmounted() {
        joueurDataServices.getAll().off('value', this.onDataChange);
        console.log('JE VIENS DE ME MONTER');
    }
}

</script>

<style scoped>
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
