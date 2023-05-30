

<script>
//import joueurDataServices from '../../services/joueurDataServices'
//import {firebaseKey} from '../../services/joueurDataServices'
// import dotenv from "dotenv";
import CryptoJS from 'crypto-js';
import axios from 'axios'
import Forme from '../../class/forme';

//dotenv.config({ path: '../../../.env' });

export default {
    props: ['listJoueur','selectP'],
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
            comptForm:0,
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
        handleArrowLeftClick() {
            this.comptForm--;
            console.log(this.comptForm)
            if (this.comptForm < 0) {
                this.comptForm = this.listJoueur.length-1;
                this.createForm(this.listJoueur[this.comptForm].form)
                this.pseudo = this.listJoueur[this.comptForm].pseudo
            }else{
                this.createForm(this.listJoueur[this.comptForm].form)
                this.pseudo = this.listJoueur[this.comptForm].pseudo
            }
            
        },
        handleArrowRightClick() {
            this.comptForm++;
            console.log(this.comptForm)
            if (this.comptForm >= this.listJoueur.length) {
                this.comptForm = 0;
                this.createForm(this.listJoueur[this.comptForm].form)
                this.pseudo = this.listJoueur[this.comptForm].pseudo
            }else{
                this.createForm(this.listJoueur[this.comptForm].form)
                this.pseudo = this.listJoueur[this.comptForm].pseudo
            }
        },
        createForm(forme) {
            const canvas = document.getElementById('inscripCanvas');
            const ctx = canvas.getContext('2d');

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            this.myForm = new Forme(canvas,ctx)
            
            //console.log( canvasWidth,canvasHeight)
            // Effacer le contenu précédent du canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Dessiner la forme en fonction du paramètre fourni
            switch (forme) {
                case 'cercle':
                    const cercleSize = 100;
                    this.myForm.createCercleVide(cercleSize,'red')
                    
                    break;
                case 'carre':
                    const carreSize = 200;
                    this.myForm.createCarreVide(carreSize,'red')
                    
                    break;
                case 'triangle':
                    const triangleSize = 110;
                    this.myForm.createTriancleVide(triangleSize,'red')
                    
                    
                    break;
                default:
                    console.log('Forme non prise en charge');
            }

        },
        play() {
            let l_perso = null
            for (let index = 0; index < this.listJoueur.length; index++) {
                //console.log(this.listPerso[index].pseudo,":",pseudo);
                if (this.pseudo == this.listJoueur[index].pseudo) {
                    l_perso = this.listJoueur[index];

                }
            }
            if (l_perso) {
                const l_pe = JSON.stringify(l_perso)
                sessionStorage.setItem("uPlt", l_pe);
                this.$emit('sendPersonnage', l_perso);
                this.$router.push({ name: 'game' });
            } else {
                console.log("Erreur du bouton Play");
            }


        },
    },
    mounted() {
      
    },
    unmounted() {
        
    },
    watch:{
        'selectP':function(){
            
            this.createForm(this.listJoueur[this.selectP].form)
            this.pseudo = this.listJoueur[this.selectP].pseudo

        }
    }
}

</script>

<template>
    
    
    <div class="persoinfo">
        <div class="persoinfo-container">
            <p>{{ pseudo || "Selectionner un personnage" }}</p>
            <div>
                <i ref="arrowLeft" @click="handleArrowLeftClick" class="fa-solid fa-arrow-left"></i>
                <canvas id="inscripCanvas" width="400" height="400"></canvas>
                <i ref="arrowRight" @click="handleArrowRightClick" class="fa-solid fa-arrow-right"></i>
            </div>
            <button v-if="pseudo != ''" @click="play">PLAY</button>
            
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
}
.persoinfo-container div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
}
.persoinfo-container p{
    font-size: 25px;
    color: white;
    margin: 10px 0px 10px 0px;
}
.persoinfo-container button{
    font-family: 'Kodchasan';
    font-weight: 600;
    margin: 10px;
    font-size: 25px;
    border: white solid 3px;
    background-color: #2c0d2c;
    padding: 10px 15px;
    border-radius: 25px;
    color: white;
}
.persoinfo-container input{
    font-family: 'Kodchasan';
    font-weight: 600;
    margin-bottom: 0px ;
    font-size: 25px;
    width: auto;
    border: white solid 1px;
    background-color: #2c0d2c;
    padding: 10px 15px;
    text-align: center;
    border-radius: 5px;
    color: white;
}


.persoinfo-container canvas{
    background-color: #2e2e2e4f;
    border: 1px #00000063  solid;
    border-radius: 5px;
    width: 400px;
    height: 400px;
}
.persoinfo-container i {
    font-size: 35px;
    margin: 0 10px;
    color: #2c0d2c;
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
