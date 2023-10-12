

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
            const canvas = document.getElementById('inscripCanvas-'+canvasId) || document.getElementById('inscripCanvas');
            canvas.width = 300 ;
            canvas.height = 200 ;
            // canvas.style.width = canvas.width + 'px';
            // canvas.style.height =  canvas.height + 'px';
            // canvasEl.getContext('2d').scale(2, 2);
            const ctx = canvas.getContext('2d');

            const box = canvas.getBoundingClientRect();
            const canvasWidth = 304;
            const canvasHeight = 304;
            this.myForm = new Forme(canvas,ctx)
            
            //console.log( canvasWidth,canvasHeight)
            // Effacer le contenu précédent du canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log(canvas.width +" : "+ canvas.height)
            // Dessiner la forme en fonction du paramètre fourni
            switch (forme) {
                case 'cercle':
                    const cercleSize = 50;
                    this.myForm.createCercleVide(cercleSize,'red')
                    console.log('cercle')
                    break;
                case 'carre':
                    const carreSize = 100;
                    this.myForm.createCarreVide(carreSize,'red')
                    console.log('carre')
                    break;
                case 'triangle':
                    const triangleSize = 65;
                    this.myForm.createTriancleVide(triangleSize,'red')
                    console.log('triangle')
                    
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
        console.log("Lancement");
        // console.log(this.$refs['perso-vre'])
        this.createForm('cercle', 'vre');
        
    },
    unmounted() {
        
    },
    created(){
        // for (let index = 0; index < this.listJoueur.length; index++) {
        //     console.log("Lancement 2");
            
        // }
    
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
                    <div class="persoinfo-texte">
                        <p>{{ joueur.pseudo}}</p>
                        <p>{{ joueur.getDomaine()}} {{ joueur.niveau }}</p>
                    </div>
                    
                    <div>
                        <canvas :id="'inscripCanvas-'+joueur.pseudo" width="200" height="200"></canvas>
                    </div>
                    <div class="btn-play" @click="play(joueur.pseudo)"><i class="fa-solid fa-play"></i></div>
                </div>
            </div> 
        </div>

        <div class="persoinfo-all-mobile">
            <div class="persoinfo-container-mobile">
                <div class="persoinfo-container-bg-mobile">
                    <div class="container-canvas">
                        <canvas :id="'inscripCanvas'" ></canvas>
                    </div>
                    <div v-for=" joueur in listJoueur" class="persoinfo-select-mobile" >
                        <div class="persoinfo-selectsous-mobile" :ref="'perso-'+joueur.pseudo">
                            <div class="persoinfo-texte-mobile">
                                <p>{{ joueur.pseudo}}</p>
                                <p>{{ joueur.getDomaine()}} {{ joueur.niveau }}</p>
                            </div>
                            <div class="btn-play" @click="play(joueur.pseudo)"><i class="fa-solid fa-play"></i></div>

                        </div>
                        
                    </div>
                    
                    
                    
                </div>
            </div> 
        </div>

        <div @click="goToInscrip()" class="btn-nouveau">
            <p>Nouveau personnage</p>
        </div>
    </div>

    
    
    
        
</template>

<style scoped>
.persoinfo{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.persoinfo-all{
    width: auto;
    display: flex;
    justify-content: center;
    flex-direction: row;
}
.persoinfo-container{
    width: 20vw;
    min-width: 200px;
    margin: 0px 5px;
    padding: 2px;
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(1,255,152,1) 53%, rgb(1 255 152 / 0%) 78%, rgb(0 212 255 / 0%) 100%);
    
}
.persoinfo-container-bg{
    height: 60vh;
    background: linear-gradient(180deg, rgba(77,25,77,1) 53%, rgba(77,25,77,0.938813025210084) 78%, rgba(0,212,255,0) 100%);
    color: aliceblue;
    font-weight: 700;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.persoinfo-texte{
    display: flex;
    flex-direction: column;
    align-items: center;
}
canvas{
    width: 100%;
    height: 100%;
}
.btn-nouveau{
    width: 15vw;
    min-width: 130px;
    text-align: center;
    border: #01FF98 3px solid;
    border-radius: 5px;
    background-color: #2c0d2c;
    color: #01FF98;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 18px;
}

.persoinfo-all-mobile{
    display: none;
}
@media screen and (max-width: 1020px) {
    .persoinfo-all{
        display: none;
    }
    .persoinfo-all-mobile{
        display: flex;
    }
    .persoinfo-container-mobile{
        width: 80vw;
        max-width: 500px;
        min-width: 250px;
        border-radius: 5px;
        padding: 2px;
        background: linear-gradient(180deg, rgba(1,255,152,1) 53%, rgb(1 255 152 / 0%) 78%, rgb(0 212 255 / 0%) 100%);
    }
    .persoinfo-container-bg-mobile{
        

        background: linear-gradient(180deg, rgba(77,25,77,1) 53%, rgba(77,25,77,0.938813025210084) 78%, rgba(0,212,255,0) 100%);
    }
    .persoinfo-selectsous-mobile{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 5px 10px;
        padding: 0px 5px;
        border-radius: 5px;
        border: white solid 2px;
    }
    .persoinfo-texte-mobile p{
        margin: 0;
        color: aliceblue;
    }
    .container-canvas{
        
        display: flex;
        justify-content: center;
        width: 100%;
    }
    canvas{
        border: #161616 solid 2px;
        
        /* max-width: 300px;
        min-width: 200px;
        max-height: 300px;
        min-height: 200px; */
    }
}

@media screen and (max-width: 500px) {


}

</style>
