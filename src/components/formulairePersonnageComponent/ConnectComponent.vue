

<script>
//import joueurDataServices from '../../services/joueurDataServices'
//import {firebaseKey} from '../../services/joueurDataServices'
// import dotenv from "dotenv";
import CryptoJS from 'crypto-js';
import axios from 'axios'
import Forme from '../../class/forme';

//dotenv.config({ path: '../../../.env' });

export default {
    props: ['listJoueur'],
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
        goToInscrip(){
            
            this.$emit('changeAuth');
        },
        createForm(forme, canvasId) {
            const canvas = document.getElementById('inscripCanvas-'+canvasId);
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
        play(pseudo) {
            let l_perso = null;
            for (let index = 0; index < this.listJoueur.length; index++) {
                //console.log(this.listJoueur[index].pseudo,":",pseudo);
                if (pseudo == this.listJoueur[index].pseudo) {
                    l_perso = this.listJoueur[index];

                }
            }
            if (l_perso) {
                const l_pe = JSON.stringify(l_perso)
                sessionStorage.setItem("uPlt", l_pe);
                //this.$emit('sendPersonnage', l_perso);
                this.$router.push({ name: 'game' });
            } else {
                console.log("Erreur du bouton Play");
            }


        },
    },
    mounted() {

        for (let index = 0; index < this.listJoueur.length; index++) {
            this.createForm(this.listJoueur[index].form, this.listJoueur[index].pseudo);
        }
        
    },
    unmounted() {
        
    },
    created(){
        
    
    },
    watch:{
       
    }
}

</script>

<template>
    
    
    <div class="persoinfo">
        <div class="persoinfo-all">
            <div v-for=" joueur in listJoueur" class="persoinfo-container">
                <div class="persoinfo-container-bg">
                    <p>{{ joueur.pseudo}}</p>
                    <p>{{ joueur.getDomaine()}} {{ joueur.niveau }}</p>
                    <div>
                        <canvas :id="'inscripCanvas-'+joueur.pseudo" width="300" height="300"></canvas>
                    </div>
                    <div class="btn-play" @click="play(joueur.pseudo)"><i class="fa-solid fa-play"></i></div>
                </div>
            </div> 
        </div>
        <div @click="goToInscrip()" class="btn-nouveau">
            <p >Nouveau personnage</p>
        </div>
    </div>
    
        
</template>

<style scoped>

.persoinfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.persoinfo-all{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.persoinfo-container{
    background: radial-gradient(circle at 100% 100%, #0B525B 0, #0B525B 3px, transparent 3px) 0% 0%/8px 8px no-repeat,
            radial-gradient(circle at 0 100%, #0B525B 0, #0B525B 3px, transparent 3px) 100% 0%/8px 8px no-repeat,
            radial-gradient(circle at 100% 0, #0B525B 0, #0B525B 3px, transparent 3px) 0% 100%/8px 8px no-repeat,
            radial-gradient(circle at 0 0, #0B525B 0, #0B525B 3px, transparent 3px) 100% 100%/8px 8px no-repeat,
            linear-gradient(#2c0d2c, #0B525B) 50% 50%/calc(100% - 10px) calc(100% - 16px) no-repeat,
            linear-gradient(#2c0d2c, #0B525B) 50% 50%/calc(100% - 16px) calc(100% - 10px) no-repeat,
            linear-gradient(0deg, transparent 0%, #01FF98 100%);
    border-radius: 8px;
    padding: 5px;
    box-sizing: border-box;
    width: 30vh;
    height: 70%;
}
.persoinfo-container-bg{
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #2c0d2c 60.42%, rgba(11, 82, 91, 0) 100%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.persoinfo-container-bg div:nth-child(1){
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
}
.btn-play{
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: #01FF98 solid 4px;
    border-radius: 50px;
    width: 60px;
    height: 60px;
}
.btn-play i::before{
    height: auto;
    width: auto;
    font-size: 35px;
    
    padding: 7px 5px;
    padding-left: 7px;
    border-radius: 100%;
    padding-right: 2px;
    
    display: flex;
    justify-content: center;
    color: #01FF98;
}
.persoinfo-container-bg p{
    font-size: 25px;
    color: white;
    margin: 10px 0px 10px 0px;
}
.persoinfo-container-bg button{
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
.persoinfo-container-bg input{
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


.persoinfo-container-bg canvas{

    border-radius: 5px;
    
}
.persoinfo-container-bg i {
    font-size: 35px;
    margin: 0 10px;
    color: #2c0d2c;
}
.btn-nouveau{
    width: 15vw;
    text-align: center;
    border: #01FF98 3px solid;
    border-radius: 5px;
    background-color: #2c0d2c;
    color: #01FF98;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 18px;
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


.persoinfo-container-bg canvas{
    
    min-width: 300px;
    height: 300px;
    

}
}

</style>
