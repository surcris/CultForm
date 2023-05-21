

<script>
//import joueurDataServices from '../../services/joueurDataServices'
//import {firebaseKey} from '../../services/joueurDataServices'
// import dotenv from "dotenv";
import CryptoJS from 'crypto-js';
import axios from 'axios'

//dotenv.config({ path: '../../../.env' });

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
            userData:{},
            //goTo:false
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
        decrypt(ciphertext,key) {
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

        async matchData() {
            let l_key = '';
            let l_found = false;
            await axios.get(import.meta.env.VITE_APP_URL + '/api/data')
                .then(response => {
                    const decryptedData = this.decrypt(response.data, import.meta.env.VITE_APP_KEY);
                    this.userData = JSON.parse(decryptedData);

                    for (const key in this.userData) {
                        if (this.pseudo == this.userData[key].nom) {
                            this.matchBool = true;

                            l_found = true;
                            this.joueur.nom = this.pseudo;

                            l_key = key
                            console.log("SA MATCH");
                        }
                    }
                    if (l_found) {
                        //console.log(l_key);
                        let l_crpKey = this.encryptData(l_key)

                        localStorage.setItem('key', l_crpKey)
                        //Redirige vers la page game
                        this.$router.push('/game');

                    } else {
                        this.matchBool = false;
                        console.log("UnMatch");
                    }
                })
                .catch(error => {
                    // Gérer les erreurs ici
                    console.log("error GET 1");
                    console.error(error);
                });
            

        },

    },
    mounted() {
      
    },
    unmounted() {
        
    }
}

</script>

<template>
    
    <div class="persolist">
        <div class="persolist-container">
            <div class="persolist-container-perso-nouveau">
                <p>Nouveau Personnage +</p>
            </div>
            <div class="persolist-container-perso">
                <div class="persolist-container-perso-detail">
                    <p>Bremith</p>
                    <p>16</p>
                </div>
                <div class="persolist-container-perso-play">
                    <div><i class="fa-solid fa-play"></i></div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="persoinfo">
        <div class="persoinfo-container">
            <canvas></canvas>
        </div>
        
    </div>

        
</template>

<style scoped>
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
.persoinfo{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
}
.persoinfo-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
}

.persoinfo-container canvas{
    background-color: #2e2e2e4f;
    border: 1px #00000063  solid;
    border-radius: 5px;
    width: 400px;
    height: 400px;
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
    .persoinfo{
        height: auto;
    }
    .persoinfo-container{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 90%;
        
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
    .persoinfo-container{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80%;
    }
    
    .persolist-container-perso {
        margin: 5px 5px;
        width: 90%;
        
    }
    .persoinfo-container canvas{
        
        min-width: 300px;
        height: 300px;
        

    }
}

@media screen and (max-width: 500px){
    
}
</style>
