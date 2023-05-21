

<script>
//import joueurDataServices from '../../services/joueurDataServices'
import Personnage from '../../class/personnage.js';
import CryptoJS from 'crypto-js';
import axios from 'axios';

export default {
    props: ['joueur'],
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
            personnage: new Personnage(''),
            

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
    
</template>


<style scoped>

</style>
