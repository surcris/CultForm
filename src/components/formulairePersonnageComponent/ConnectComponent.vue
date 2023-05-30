

<script>
//import joueurDataServices from '../../services/joueurDataServices'
//import {firebaseKey} from '../../services/joueurDataServices'
// import dotenv from "dotenv";
import CryptoJS from 'crypto-js';
import axios from 'axios'

//dotenv.config({ path: '../../../.env' });

export default {
    // props: {
    //     joueur: Object,
    //     thekey: Object,
    // },
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
        getAllPersonnnage(){
            let key = this.decryptData(ciphertext)
            axios.get(import.meta.env.VITE_APP_URL,'/api/data/',key)
        }


    },
    mounted() {
      
    },
    unmounted() {
        
    }
}

</script>

<template>
    
    
    <div class="persoinfo">
        <div class="persoinfo-container">
            <canvas width="400" height="400"></canvas>
        </div>
        
    </div>

        
</template>

<style scoped>

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
    
    .persoinfo-container{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80%;
    }
    
   
    .persoinfo-container canvas{
        
        min-width: 300px;
        height: 300px;
        

    }
}

</style>
