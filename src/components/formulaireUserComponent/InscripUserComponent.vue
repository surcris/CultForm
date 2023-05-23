
<script setup>
import imagePath from '../../assets/logo/Google__G__Logo.svg.png'
</script>

<script>
//import joueurDataServices from '../../services/joueurDataServices'
import CryptoJS from 'crypto-js';
import axios from 'axios';

export default {
    props: {
        
    },
    components: {

    },
    //emits: ['firebase-key'],
    data() {
        return {
            mail:"",
            passW:"",
            player: [],
            articles: [],
            pseudo: "",
            matchBool: true,
            //goTo:false
            personnage: null,
            

        }
    },
    methods: {
        encryptData(data) {
            const key = import.meta.env.VITE_APP_KEY;
            return CryptoJS.AES.encrypt(data, key).toString();
        },
        decrypt(ciphertext, key) {
            const bytes = CryptoJS.AES.decrypt(ciphertext, key);
            return bytes.toString(CryptoJS.enc.Utf8);
        },
        sendUser(){
            const apiUrl = import.meta.env.VITE_APP_URL + '/api/user';
            axios.put(apiUrl,{email:this.mail,password:this.passW});
        },
        async recieveData() {
            //let userData = [];
            this.matchBool = true;
            let l_key;
            const apiUrl = import.meta.env.VITE_APP_URL + '/api/data';
            let encryptedData = await axios.get(apiUrl);
            let decryptedData = this.decrypt(encryptedData.data, import.meta.env.VITE_APP_MYKEY);
            let userData = JSON.parse(decryptedData);

            for (const key in userData) {
                console.log(key);
                if (userData[key].nom === this.pseudo) {
                    console.log("Pseudo déjà utilisé");
                    this.matchBool = false;
                    break;
                }
            }
            

            if (this.matchBool) {
                this.joueur.resetPerso();
                this.joueur.nom = this.pseudo;
                this.createPlayer(this.joueur);

                encryptedData = await axios.get(apiUrl);
                decryptedData = this.decrypt(encryptedData.data, import.meta.env.VITE_APP_MYKEY);
                userData = JSON.parse(decryptedData);

                //console.log("================");
                for (const key in userData) {
                    //console.log(key);
                    if (userData[key].nom === this.pseudo) {
                        l_key = key;
                    }
                }
                console.log(l_key);
                const encryptedKey = this.encryptData(l_key);
                localStorage.setItem('key', encryptedKey);
                this.$router.push('/game');
            }
            

            
        },
        
        createPlayer(newPlayer) {
            //joueurDataServices.create(newPlayer)
            axios.put(import.meta.env.VITE_APP_URL + '/api/data/', newPlayer)
                .then(() => {
                    console.log('Article Crée avec Succès !');
                })
                .catch(error => {
                    console.log(error);
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
            <div class="form-input-div">
                <input type="text" name="nom"  class="form-control  my-2"  placeholder="Nom">
                <input type="text" name="prenom"  class="form-control  my-2"  placeholder="Prénom">
            </div>
            <input type="text" name="pseudo"  class="form-control  my-2"  placeholder="Pseudo">
            <input type="text" name="email"  class="form-control  my-2"  placeholder="Email" v-model="mail">
            <input type="text" name="date"  class="form-control  my-2"  placeholder="Date" onfocus="(this.type = 'date')">
            <input type="password" name="mdp" class="form-control  my-2"  placeholder="Mot de passe" v-model="passW">
            <input type="password" name="mdp" class="form-control  my-2"  placeholder="Mot de passe">
        </div>
        
        
        <div class="form-submit">
            <button @click="sendUser" type="submit" class="btn btn-primary my-2">Valider</button>
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
.form-input input[type="date"]{
    font-family: 'Kodchasan', sans-serif;
    color: white;
    font-weight: 800;
    font-size: 24px;
}
.form-input-div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.form-input-div input{
    width: 49%;
    
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
