
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
            infoUser:{
                id:null,
                email:null,
                password:null,
                passWc:null,
                nom:null,
                prenom:null,
                pseudo:null,
                dateN:null,
            },
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
        verifInfoForm(){
            if (this.infoUser.nom != null && this.infoUser.prenom != null && this.infoUser.pseudo != null 
            && this.infoUser.dateN != null&& this.infoUser.email != null && this.infoUser.password != null && this.infoUser.passWc != null) {
                if (this.infoUser.password == this.infoUser.passWc) {

                    this.verifUser(this.infoUser)
                    
                }else{
                    console.log('Les mots de passe saisis ne sont pas identique')
                }
                
                
            }else{
                console.log('Veuillez remplire tous les champs')
            }

        },
        verifUser(p_info){
            const apiUrl = import.meta.env.VITE_APP_URL + '/api/user/addUserA';
            axios.put(apiUrl,p_info)
                .then(response => {
                    console.log(response.data.message);
                    p_info.id = response.data.uid;
                    sessionStorage.setItem("akey", response.data.uid);
                    this.sendUser(p_info);
                    this.$router.push('/authPersonnage');
                })
                .catch(error => {
                    // Gérer les erreurs ici
                    //console.log("error lors de la requete vers auth");
                    console.error(error.response.data.message);
                });
        },
        sendUser(p_info){
            const apiUrl = import.meta.env.VITE_APP_URL + '/api/user/addUserR';
            axios.put(apiUrl,p_info)
                .then(response => {
                    console.log(response.data.message);
                    
                })
                .catch(error => {
                    // Gérer les erreurs ici
                    console.log("error lors de la requete vers realtime");
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
            <div class="form-input-div">
                <input type="text" name="nom"  class="form-control  my-2"  placeholder="Nom" v-model="infoUser.nom">
                <input type="text" name="prenom"  class="form-control  my-2"  placeholder="Prénom" v-model="infoUser.prenom">
            </div>
            <input type="text" name="pseudo"  class="form-control  my-2"  placeholder="Pseudo" v-model="infoUser.pseudo">
            <input type="text" name="email"  class="form-control  my-2"  placeholder="Email" v-model="infoUser.email">
            <input type="text" name="date"  class="form-control  my-2"  placeholder="Date" onfocus="(this.type = 'date')" v-model="infoUser.dateN">
            <input type="password" name="mdp" class="form-control  my-2"  placeholder="Mot de passe" v-model="infoUser.password">
            <input type="password" name="cmdp" class="form-control  my-2"  placeholder="Mot de passe" v-model="infoUser.passWc">
        </div>
        
        
        <div class="form-submit">
            <button @click="verifInfoForm" type="submit" class="btn btn-primary my-2">Valider</button>
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
    margin: 5px 0px;
    padding: 10px 0px;
    text-align: center;
    background-color: rgba(4, 45, 50, 0.8);
    border-radius: 5px;
    border: none;
    font-weight: 400;
    font-size: 1rem;
    color: #fff;
}

.form-input input::placeholder{
    font-family: 'Kodchasan', sans-serif;
    opacity: 0.5;
    color: white;
    font-weight: 800;
    font-size: 1rem;
}
.form-input input[type="date"]{
    font-family: 'Kodchasan', sans-serif;
    color: white;
    font-weight: 800;
    font-size: 1.5rem;
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
    font-size: 1.2rem;
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
