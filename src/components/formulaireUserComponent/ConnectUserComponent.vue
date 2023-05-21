<script setup>
import imagePath from '../../assets/logo/Google__G__Logo.svg.png'
</script>
<script>

import CryptoJS from 'crypto-js';
import axios from 'axios'


export default {
    props: {
        
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
            google :{
                backgroundImage :imagePath,

            }
            //goTo:false
        }
    },
    methods: {
        encryptData(data) {
            const key = import.meta.env.VITE_APP_KEY;
            
            return CryptoJS.AES.encrypt(data, key).toString();
        },
        decrypt(ciphertext,key) {
            const bytes = CryptoJS.AES.decrypt(ciphertext, key);
            return bytes.toString(CryptoJS.enc.Utf8);
        },
        test(){
            console.log("TEST");
        },
        async matchData() {
            let l_key = '';
            let l_found = false;
            await axios.get(import.meta.env.VITE_APP_URL + '/api/data')
                .then(response => {
                    const decryptedData = this.decrypt(response.data, import.meta.env.VITE_APP_MYKEY);
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
    
    <form @submit.prevent="matchData">
        <div class="form-input" >
            <input type="text" name="email"  class="form-control  my-2"  placeholder="Email">
            <input type="password" name="mdp" class="form-control  my-2"  placeholder="Mot de passe">
        </div>
        <div class="form-check">
            <input type="checkbox" name="" id="">
            <label for="scales">Se souvenir de moi</label>
        </div>
        
        <div class="form-submit">
            <button  type="submit" class="btn btn-primary my-2">Valider</button>
        </div>
        <div class="form-line"></div>
    </form>
    <div class="log-api">
        <div class="log-api-google"  >
            <img src="../../assets/logo/Google__G__Logo.svg.png" alt="">
        </div>
        <div class="log-api-facebook">
            <img src="../../assets/logo/Facebook_logo_(square).png.webp" alt="">
        </div>
        <div class="log-api-twitter">
            <img src="../../assets/logo/Logo_of_Twitter,_Inc..svg.png" alt="">
        </div>
    </div>
    
</template>


<style scoped>
/* .ellipse{
    position: absolute;
    width: 303px;
    height: 303px;
    left: 246px;
    top: 489px;

    background: linear-gradient(180.76deg, rgba(77, 25, 77, 0.93) 0.63%, rgba(77, 25, 77, 0) 99.35%);
    filter: blur(2px);
    transform: rotate(-90deg);
} */
form{
    width: 100%;
}
.form-input{
    display: flex;
    flex-direction: column;
    
}
.form-input input{
    margin: 10px 0px;
    padding: 10px 0px;
    text-align: center;
    background-color: rgba(4, 45, 50, 0.8);
    border-radius: 5px;
    border: none;
    font-weight: 400;
    font-size: 24px;
    color: #fff;
}
.form-input input::placeholder{
    font-family: 'Kodchasan', sans-serif;
    opacity: 0.5;
    color: white;
    font-weight: 800;
    font-size: 24px;
}
.form-check{
    font-family: 'Kodchasan', sans-serif;
    display: flex;
    align-items: center;
    color: white;
}
.form-check input{
    height: 15px;
    width: 15px;
}
.form-submit{
    width: 100%;
    padding: 10px 0px;
    display: flex;
    justify-content: center
}
.form-submit button{
    cursor: pointer;
    background: linear-gradient(90deg, #4D194D 35.91%, #000000 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    width: 100%;
    height: 40px;
    color: white;
    border: none;
    font-family: 'Kodchasan', sans-serif;
    font-weight: 700;
    font-size: 16px;
}
/* .form-submit button:hover{
    cursor: pointer;
    background: linear-gradient(90deg, #01FF98 35.91%, #000000 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    width: 100%;
    height: 40px;
    color: white;
    border: none;
    font-family: 'Kodchasan', sans-serif;
    font-weight: 700;
    font-size: 16px;
    
} */

.form-line{
    border-bottom: #fff solid 1px;
}
.log-api{
    font-family: 'Kodchasan', sans-serif;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-content: center;
}
.log-api div{
    cursor: pointer;
    margin: 0px 10px;
    height: 40px;
    width: 40px;
    border-radius: 5px;
}
.log-api div img{
    height: 100%;
    width: 100%;
}

</style>
